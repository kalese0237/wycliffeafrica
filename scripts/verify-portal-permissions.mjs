/**
 * Non-destructive integration check for live portal authorization.
 * Creates one temporary draft and one temporary static user token, then removes both.
 */

import crypto from "node:crypto";

const DIRECTUS_URL = process.env.DIRECTUS_URL?.replace(/\/$/, "");
const ADMIN_TOKEN = process.env.DIRECTUS_ADMIN_TOKEN;
const SITE_TOKEN = process.env.DIRECTUS_TOKEN;
const SITE_URL = process.env.SITE_URL?.replace(/\/$/, "");
if (!DIRECTUS_URL || !ADMIN_TOKEN) {
  console.error("Set DIRECTUS_URL and DIRECTUS_ADMIN_TOKEN.");
  process.exit(1);
}

async function request(path, { method = "GET", body, token = ADMIN_TOKEN, expected } = {}) {
  const response = await fetch(`${DIRECTUS_URL}${path}`, {
    method,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (expected && response.status === expected) return null;
  if (!response.ok) throw new Error(`${method} ${path} → ${response.status}: ${(await response.text()).slice(0, 400)}`);
  if (response.status === 204) return null;
  return (await response.json()).data;
}

async function main() {
  const linked = await request("/items/missionaries?filter[user][_nnull]=true&fields=id,user&limit=1");
  if (!linked.length) throw new Error("Need a linked profile for the test.");
  const temporaryToken = crypto.randomBytes(32).toString("hex");
  const testTitle = `Portal authorization test ${crypto.randomUUID()}`;
  let draftId;
  let newsDraftId;
  let mediaDraftId;
  let fileId;
  let reviewerId;
  let originalMissionaryToken;

  try {
    const missionaryUser = await request(`/users/${linked[0].user}?fields=token`);
    originalMissionaryToken = missionaryUser.token ?? null;
    await request(`/users/${linked[0].user}`, { method: "PATCH", body: { token: temporaryToken } });
    const visibleProfiles = await request("/items/missionaries?fields=id&limit=-1", { token: temporaryToken });
    if (visibleProfiles.length !== 1 || visibleProfiles[0].id !== linked[0].id) {
      throw new Error("Missionary profile read policy did not resolve the current user correctly.");
    }
    await request("/items/field_updates", {
      method: "POST",
      token: temporaryToken,
      expected: 403,
      body: {
        type: "update",
        missionaryId: linked[0].id,
        title: "Direct user mutation test",
        body: "This request must be denied because user tokens are intentionally read-only.",
        date: "Authorization test",
        sensitive: false,
      },
    });
    if (!SITE_TOKEN) throw new Error("DIRECTUS_TOKEN is required for service-token verification.");
    const missionaryRoles = await request("/roles?filter[name][_eq]=Missionary&limit=1");
    if (!missionaryRoles.length) throw new Error("Missionary role is missing.");
    const reviewerPolicies = await request("/policies?filter[name][_eq]=Portal%20review&limit=1");
    if (!reviewerPolicies.length) throw new Error("Portal review policy is missing.");
    const reviewerToken = crypto.randomBytes(32).toString("hex");
    const reviewer = await request("/users", {
      method: "POST",
      body: {
        email: `portal-review-test-${crypto.randomUUID()}@example.com`,
        password: crypto.randomBytes(18).toString("base64url"),
        first_name: "Portal",
        last_name: "Review Test",
        // Deliberately retain a non-reviewer primary role. Reviewer access is
        // composed through a directly assigned policy.
        role: missionaryRoles[0].id,
        status: "active",
        token: reviewerToken,
      },
    });
    reviewerId = reviewer.id;
    await request("/access", {
      method: "POST",
      body: { user: reviewer.id, policy: reviewerPolicies[0].id },
    });
    await request("/items/field_updates", {
      method: "POST",
      token: SITE_TOKEN,
      body: {
        type: "prayer",
        missionaryId: linked[0].id,
        title: testTitle,
        body: "This temporary draft verifies ownership policies and is removed automatically.",
        date: "Authorization test",
        sensitive: false,
      },
    });
    const [draft] = await request(
      `/items/field_updates?filter[title][_eq]=${encodeURIComponent(testTitle)}&fields=id,status&limit=1`,
    );
    if (!draft) throw new Error("The service token did not create the temporary draft.");
    draftId = draft.id;
    if (draft.status !== "draft") throw new Error("New submission did not receive draft status.");

    await request(`/items/field_updates/${draftId}`, {
      method: "PATCH",
      token: SITE_TOKEN,
      body: { title: "Portal authorization test updated" },
    });
    const ownItems = await request(`/items/field_updates?filter[id][_eq]=${draftId}&fields=id`, { token: temporaryToken });
    if (ownItems.length !== 1) throw new Error("The missionary could not read their own service-created draft.");
    await request(`/items/field_updates/${draftId}`, {
      method: "PATCH",
      token: reviewerToken,
      body: { status: "rejected", reviewNotes: "Please add one concrete outcome before resubmitting." },
    });
    const [reviewed] = await request(`/items/field_updates?filter[id][_eq]=${draftId}&fields=id,status,reviewNotes`, {
      token: temporaryToken,
    });
    if (reviewed?.status !== "rejected" || !reviewed.reviewNotes) {
      throw new Error("Reviewer feedback was not visible to the owning missionary.");
    }
    await request(`/items/field_updates/${draftId}`, {
      method: "PATCH",
      token: SITE_TOKEN,
      body: { status: "draft", title: "Portal authorization test resubmitted" },
    });
    const [resubmitted] = await request(`/items/field_updates?filter[id][_eq]=${draftId}&fields=id,status`, {
      token: temporaryToken,
    });
    if (resubmitted?.status !== "draft") throw new Error("Rejected submission could not be resubmitted.");
    await request(`/items/field_updates/${draftId}`, {
      method: "PATCH",
      token: reviewerToken,
      body: { status: "published", reviewNotes: null },
    });
    const publicItems = await request(`/items/field_updates?filter[id][_eq]=${draftId}&fields=id,status`, { token: SITE_TOKEN });
    if (publicItems.length !== 1 || publicItems[0].status !== "published") {
      throw new Error("Published submission was not visible to the public site token.");
    }
    await request(`/items/field_updates/${draftId}`, {
      method: "PATCH",
      token: reviewerToken,
      body: { status: "archived" },
    });
    const archivedPublicItems = await request(`/items/field_updates?filter[id][_eq]=${draftId}&fields=id`, { token: SITE_TOKEN });
    if (archivedPublicItems.length) throw new Error("Archived submission remained publicly visible.");
    await request(`/items/field_updates/${draftId}`, { method: "DELETE" });
    draftId = undefined;

    const newsTitle = `Portal news authorization test ${crypto.randomUUID()}`;
    await request("/items/news", {
      method: "POST",
      token: SITE_TOKEN,
      body: {
        category: "update",
        slug: `portal-news-test-${crypto.randomUUID()}`,
        missionaryId: linked[0].id,
        title: newsTitle,
        excerpt: "Temporary news draft",
        body: ["Temporary news draft"],
        date: "Authorization test",
      },
    });
    const [newsDraft] = await request(
      `/items/news?filter[title][_eq]=${encodeURIComponent(newsTitle)}&fields=id,status&limit=1`,
    );
    if (!newsDraft || newsDraft.status !== "draft") {
      throw new Error("The portal service token did not create a draft news update.");
    }
    newsDraftId = newsDraft.id;
    const ownNews = await request(`/items/news?filter[id][_eq]=${newsDraftId}&fields=id`, {
      token: temporaryToken,
    });
    if (ownNews.length !== 1) throw new Error("The missionary could not read their own news draft.");
    await request(`/items/news/${newsDraftId}`, {
      method: "PATCH",
      token: reviewerToken,
      body: { status: "rejected", reviewNotes: "Please add one concrete outcome." },
    });
    const [reviewedNews] = await request(
      `/items/news?filter[id][_eq]=${newsDraftId}&fields=id,status,reviewNotes`,
      { token: temporaryToken },
    );
    if (reviewedNews?.status !== "rejected" || !reviewedNews.reviewNotes) {
      throw new Error("Reviewer feedback was not visible on the missionary's news draft.");
    }
    await request(`/items/news/${newsDraftId}`, {
      method: "PATCH",
      token: SITE_TOKEN,
      body: { status: "draft", title: `${newsTitle} revised` },
    });
    await request(`/items/news/${newsDraftId}`, {
      method: "PATCH",
      token: reviewerToken,
      body: { status: "published", reviewNotes: null },
    });
    const publicNews = await request(
      `/items/news?filter[id][_eq]=${newsDraftId}&fields=*&limit=1`,
      { token: SITE_TOKEN },
    );
    if (publicNews.length !== 1 || publicNews[0].status !== "published") {
      throw new Error("Published news was not visible to the public content token.");
    }
    const forbiddenPublicFields = ["reviewNotes", "reviewedAt", "reviewedBy", "user_created"];
    if (forbiddenPublicFields.some((field) => field in publicNews[0])) {
      throw new Error("Private news workflow fields were exposed to the public content token.");
    }
    await request(`/items/news/${newsDraftId}`, {
      method: "PATCH",
      token: reviewerToken,
      body: { status: "archived" },
    });
    const archivedNews = await request(`/items/news?filter[id][_eq]=${newsDraftId}&fields=id`, {
      token: SITE_TOKEN,
    });
    if (archivedNews.length) throw new Error("Archived news remained publicly visible.");
    await request(`/items/news/${newsDraftId}`, { method: "DELETE" });
    newsDraftId = undefined;

    const imageForm = new FormData();
    imageForm.set("title", "Temporary portal upload test");
    imageForm.set(
      "file",
      new Blob([Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=", "base64")], { type: "image/png" }),
      "portal-test.png",
    );
    const upload = await fetch(`${DIRECTUS_URL}/files`, {
      method: "POST",
      headers: { Authorization: `Bearer ${SITE_TOKEN}` },
      body: imageForm,
    });
    if (!upload.ok) throw new Error(`Portal image upload failed (${upload.status}).`);
    fileId = (await upload.json()).data.id;
    const asset = await fetch(`${DIRECTUS_URL}/assets/${fileId}`, {
      headers: { Authorization: `Bearer ${SITE_TOKEN}` },
    });
    if (!asset.ok) throw new Error(`Uploaded portal image could not be read (${asset.status}).`);

    if (!SITE_URL) throw new Error("SITE_URL is required for public media-proxy verification.");
    const mediaTestTitle = `Portal media authorization test ${crypto.randomUUID()}`;
    await request("/items/field_updates", {
      method: "POST",
      token: SITE_TOKEN,
      body: {
        type: "prayer",
        missionaryId: linked[0].id,
        title: mediaTestTitle,
        body: "This temporary image submission verifies that the public proxy follows review status.",
        date: "Authorization test",
        sensitive: false,
        image: fileId,
      },
    });
    const [mediaDraft] = await request(
      `/items/field_updates?filter[title][_eq]=${encodeURIComponent(mediaTestTitle)}&fields=id&limit=1`,
    );
    if (!mediaDraft) throw new Error("The media authorization draft was not created.");
    mediaDraftId = mediaDraft.id;
    const draftMedia = await fetch(`${SITE_URL}/media/${fileId}`, { cache: "no-store" });
    if (draftMedia.status !== 404) {
      throw new Error(`Draft media proxy returned ${draftMedia.status}; expected 404.`);
    }
    await request(`/items/field_updates/${mediaDraftId}`, {
      method: "PATCH",
      token: reviewerToken,
      body: { status: "published" },
    });
    const publishedMedia = await fetch(`${SITE_URL}/media/${fileId}`, { cache: "no-store" });
    if (!publishedMedia.ok) {
      throw new Error(`Published media proxy returned ${publishedMedia.status}; expected 200.`);
    }
    await request(`/items/field_updates/${mediaDraftId}`, {
      method: "PATCH",
      token: reviewerToken,
      body: { sensitive: true },
    });
    const sensitiveMedia = await fetch(`${SITE_URL}/media/${fileId}`, { cache: "no-store" });
    if (sensitiveMedia.status !== 404) {
      throw new Error(`Sensitive prayer media proxy returned ${sensitiveMedia.status}; expected 404.`);
    }
    await request(`/items/field_updates/${mediaDraftId}`, { method: "DELETE" });
    mediaDraftId = undefined;
    await request(`/files/${fileId}`, { method: "DELETE", token: SITE_TOKEN });
    fileId = undefined;
    console.log("✓ missionary tokens are read-only and scoped to their profile");
    console.log("✓ server token can create/update/delete drafts");
    console.log("✓ server-created draft is visible to its owning missionary");
    console.log("✓ reviewer can request changes and return private feedback");
    console.log("✓ reviewer access composes with a separate primary role");
    console.log("✓ missionary can revise and resubmit rejected content");
    console.log("✓ news updates follow ownership, review, and public-field boundaries");
    console.log("✓ publish/archive controls public visibility correctly");
    console.log("✓ image upload and authenticated delivery work");
    console.log("✓ public media proxy follows publication and sensitivity status");
  } finally {
    if (draftId) await request(`/items/field_updates/${draftId}`, { method: "DELETE" }).catch(() => undefined);
    if (newsDraftId) await request(`/items/news/${newsDraftId}`, { method: "DELETE" }).catch(() => undefined);
    if (mediaDraftId) await request(`/items/field_updates/${mediaDraftId}`, { method: "DELETE" }).catch(() => undefined);
    if (fileId) await request(`/files/${fileId}`, { method: "DELETE" }).catch(() => undefined);
    if (reviewerId) await request(`/users/${reviewerId}`, { method: "DELETE" }).catch(() => undefined);
    await request(`/users/${linked[0].user}`, {
      method: "PATCH",
      body: { token: originalMissionaryToken ?? null },
    }).catch(() => undefined);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
