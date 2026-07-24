/**
 * Idempotently upgrades Directus for the production missionary portal.
 *
 * DIRECTUS_URL=... DIRECTUS_ADMIN_TOKEN=... node scripts/setup-missionary-portal.mjs
 */

const DIRECTUS_URL = process.env.DIRECTUS_URL?.replace(/\/$/, "");
const ADMIN_TOKEN = process.env.DIRECTUS_ADMIN_TOKEN;
const PORTAL_MEDIA_FOLDER_ID = "97a3a171-f18d-49a6-964a-932f026c1894";

if (!DIRECTUS_URL || !ADMIN_TOKEN) {
  console.error("Set DIRECTUS_URL and DIRECTUS_ADMIN_TOKEN.");
  process.exit(1);
}

async function api(path, { method = "GET", body, ok404 = false } = {}) {
  const response = await fetch(`${DIRECTUS_URL}${path}`, {
    method,
    signal: AbortSignal.timeout(15_000),
    headers: {
      Authorization: `Bearer ${ADMIN_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (ok404 && response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`${method} ${path} → ${response.status}: ${(await response.text()).slice(0, 500)}`);
  }
  if (response.status === 204) return null;
  return (await response.json()).data;
}

async function ensureField(collection, definition) {
  const current = (await api(`/fields/${collection}`)).find((field) => field.field === definition.field);
  if (current) {
    await api(`/fields/${collection}/${definition.field}`, { method: "PATCH", body: definition });
    return;
  }
  await api(`/fields/${collection}`, { method: "POST", body: definition });
}

async function ensureRelation(collection, field, relatedCollection, onDelete = "SET NULL") {
  const current = (await api("/relations?limit=-1")).find(
    (relation) => relation.collection === collection && relation.field === field,
  );
  if (current) return;
  await api("/relations", {
    method: "POST",
    body: {
      collection,
      field,
      related_collection: relatedCollection,
      schema: { on_delete: onDelete },
      meta: { one_deselect_action: "nullify" },
    },
  });
}

async function findOne(path) {
  return (await api(`${path}${path.includes("?") ? "&" : "?"}limit=1`))[0] ?? null;
}

async function ensurePermission(policy, collection, action, definition) {
  const params = new URLSearchParams({
    "filter[policy][_eq]": policy,
    "filter[collection][_eq]": collection,
    "filter[action][_eq]": action,
  });
  const current = await findOne(`/permissions?${params}`);
  const body = { policy, collection, action, ...definition };
  if (current) {
    await api(`/permissions/${current.id}`, { method: "PATCH", body });
  } else {
    await api("/permissions", { method: "POST", body });
  }
}

async function removePermission(policy, collection, action) {
  const params = new URLSearchParams({
    "filter[policy][_eq]": policy,
    "filter[collection][_eq]": collection,
    "filter[action][_eq]": action,
  });
  const current = await findOne(`/permissions?${params}`);
  if (current) await api(`/permissions/${current.id}`, { method: "DELETE" });
}

async function ensurePolicy(name, input) {
  const current = await findOne(`/policies?filter[name][_eq]=${encodeURIComponent(name)}`);
  if (current) {
    await api(`/policies/${current.id}`, { method: "PATCH", body: input });
    return current.id;
  }
  return (await api("/policies", { method: "POST", body: { name, ...input } })).id;
}

async function ensureRole(name, input) {
  const current = await findOne(`/roles?filter[name][_eq]=${encodeURIComponent(name)}`);
  if (current) return current.id;
  return (await api("/roles", { method: "POST", body: { name, ...input } })).id;
}

async function ensureAccess(role, policy) {
  const current = await findOne(`/access?filter[role][_eq]=${role}&filter[policy][_eq]=${policy}`);
  if (!current) await api("/access", { method: "POST", body: { role, policy } });
}

async function ensureReviewPreset(role, collection, bookmark) {
  const current = await findOne(
    `/presets?filter[role][_eq]=${role}&filter[collection][_eq]=${collection}&filter[bookmark][_eq]=${encodeURIComponent(bookmark)}`,
  );
  const body = {
    role,
    collection,
    bookmark,
    layout: "tabular",
    filter: { status: { _eq: "draft" } },
    sort: ["-date_created"],
    limit: 25,
  };
  if (current) await api(`/presets/${current.id}`, { method: "PATCH", body });
  else await api("/presets", { method: "POST", body });
}

async function ensureMediaFolder() {
  const folders = await api("/folders?limit=-1");
  if (!folders.some((folder) => folder.id === PORTAL_MEDIA_FOLDER_ID)) {
    await api("/folders", {
      method: "POST",
      body: { id: PORTAL_MEDIA_FOLDER_ID, name: "Missionary portal media" },
    });
  }
}

async function main() {
  await ensureMediaFolder();
  await ensureField("field_updates", {
    field: "reviewNotes",
    type: "text",
    schema: {},
    meta: { interface: "input-multiline", note: "Private feedback visible to the missionary" },
  });
  await ensureField("field_updates", {
    field: "reviewedAt",
    type: "timestamp",
    schema: {},
    meta: { interface: "datetime", readonly: true },
  });
  await ensureField("field_updates", {
    field: "reviewedBy",
    type: "uuid",
    schema: {},
    meta: { interface: "select-dropdown-m2o", readonly: true },
  });
  await ensureField("field_updates", {
    field: "date_updated",
    type: "timestamp",
    schema: {},
    meta: { special: ["date-updated"], hidden: true, readonly: true },
  });

  await ensureField("field_updates", {
    field: "status",
    type: "string",
    schema: { default_value: "draft" },
    meta: {
      interface: "select-dropdown",
      options: { choices: [
        { text: "Draft (in review)", value: "draft" },
        { text: "Published", value: "published" },
        { text: "Changes requested", value: "rejected" },
        { text: "Archived", value: "archived" },
      ] },
    },
  });
  await ensureField("field_updates", {
    field: "type",
    type: "string",
    schema: { default_value: "prayer" },
    meta: {
      interface: "select-dropdown",
      options: { choices: [{ text: "Prayer request", value: "prayer" }] },
      note: "Prayer requests only; field updates are stored in news",
    },
  });
  await ensureField("field_updates", {
    field: "image",
    type: "uuid",
    schema: {},
    meta: { interface: "file-image", note: "Optional field-update photo" },
  });
  await ensureField("missionaries", {
    field: "image",
    type: "uuid",
    schema: {},
    meta: { interface: "file-image", note: "Missionary profile photo" },
  });
  await ensureField("news", {
    field: "missionaryId",
    type: "string",
    schema: {},
    meta: { interface: "select-dropdown-m2o", note: "Missionary who submitted this update" },
  });
  await ensureField("news", {
    field: "image",
    type: "uuid",
    schema: {},
    meta: { interface: "file-image", note: "Optional news image" },
  });
  await ensureField("news", {
    field: "reviewedBy",
    type: "uuid",
    schema: {},
    meta: { interface: "select-dropdown-m2o", readonly: true },
  });
  await ensureField("news", {
    field: "reviewedAt",
    type: "timestamp",
    schema: {},
    meta: { interface: "datetime", readonly: true },
  });

  await ensureRelation("missionaries", "user", "directus_users");
  await ensureRelation("field_updates", "missionaryId", "missionaries", "RESTRICT");
  await ensureRelation("field_updates", "reviewedBy", "directus_users");
  await ensureRelation("field_updates", "image", "directus_files");
  await ensureRelation("missionaries", "image", "directus_files");
  await ensureRelation("news", "missionaryId", "missionaries", "RESTRICT");
  await ensureRelation("news", "reviewedBy", "directus_users");
  await ensureRelation("news", "image", "directus_files");

  const missionaryPolicy = await ensurePolicy("Missionary portal", {
    icon: "person",
    admin_access: false,
    app_access: false,
  });
  const ownsProfile = { missionaryId: { user: { _eq: "$CURRENT_USER" } } };
  await ensurePermission(missionaryPolicy, "field_updates", "read", {
    fields: ["id", "status", "type", "missionaryId", "title", "body", "date", "sensitive", "image", "reviewNotes", "reviewedAt", "date_created", "date_updated"],
    permissions: ownsProfile,
  });
  await removePermission(missionaryPolicy, "field_updates", "create");
  await removePermission(missionaryPolicy, "field_updates", "update");
  await removePermission(missionaryPolicy, "field_updates", "delete");
  await ensurePermission(missionaryPolicy, "news", "read", {
    fields: [
      "id", "status", "category", "slug", "title", "excerpt", "body", "missionaryId",
      "date", "image", "reviewNotes", "reviewedAt", "date_created", "date_updated",
    ],
    permissions: ownsProfile,
  });
  await removePermission(missionaryPolicy, "news", "create");
  await removePermission(missionaryPolicy, "news", "update");
  await removePermission(missionaryPolicy, "news", "delete");

  const sitePolicy = await ensurePolicy("Site (read-only)", {
    icon: "public",
    admin_access: false,
    app_access: false,
  });
  await ensurePermission(sitePolicy, "field_updates", "read", {
    fields: ["id", "status", "type", "missionaryId", "title", "body", "date", "sensitive", "image", "date_created"],
    permissions: {
      _and: [
        { status: { _eq: "published" } },
        { type: { _eq: "prayer" } },
      ],
    },
  });
  const fieldUpdateTypeFilter = { type: { _eq: "prayer" } };
  const editable = {
    _and: [
      fieldUpdateTypeFilter,
      { status: { _in: ["draft", "rejected"] } },
    ],
  };
  await ensurePermission(sitePolicy, "field_updates", "create", {
    fields: ["type", "title", "body", "sensitive", "missionaryId", "date", "image"],
    validation: fieldUpdateTypeFilter,
    presets: { type: "prayer", status: "draft" },
  });
  await ensurePermission(sitePolicy, "field_updates", "update", {
    fields: ["type", "title", "body", "sensitive", "image", "status"],
    permissions: editable,
    validation: { status: { _eq: "draft" } },
  });
  await ensurePermission(sitePolicy, "field_updates", "delete", {
    fields: ["id"],
    permissions: editable,
  });
  const publicNewsFields = [
    "id", "status", "category", "slug", "title", "excerpt", "body", "author",
    "missionaryId", "place", "journey", "tagLabel", "date", "image",
  ];
  const editableNews = {
    _and: [
      { category: { _eq: "update" } },
      { status: { _in: ["draft", "rejected"] } },
    ],
  };
  await ensurePermission(sitePolicy, "news", "read", {
    fields: publicNewsFields,
    permissions: { status: { _eq: "published" } },
  });
  await ensurePermission(sitePolicy, "news", "create", {
    fields: ["category", "slug", "title", "excerpt", "body", "missionaryId", "date", "image"],
    validation: { category: { _eq: "update" } },
    presets: { category: "update", status: "draft" },
  });
  await ensurePermission(sitePolicy, "news", "update", {
    fields: ["title", "excerpt", "body", "image", "status"],
    permissions: editableNews,
    validation: { status: { _eq: "draft" } },
  });
  await ensurePermission(sitePolicy, "news", "delete", {
    fields: ["id"],
    permissions: editableNews,
  });
  await ensurePermission(sitePolicy, "directus_files", "create", {
    fields: ["*"],
    permissions: null,
    presets: { folder: PORTAL_MEDIA_FOLDER_ID },
  });
  await ensurePermission(sitePolicy, "directus_files", "read", {
    fields: ["id", "type", "filename_download", "filesize", "width", "height"],
    permissions: { folder: { _eq: PORTAL_MEDIA_FOLDER_ID } },
  });
  await ensurePermission(sitePolicy, "directus_files", "delete", {
    fields: ["id"],
    permissions: {
      _and: [
        { folder: { _eq: PORTAL_MEDIA_FOLDER_ID } },
        { uploaded_by: { _eq: "$CURRENT_USER" } },
      ],
    },
  });
  await ensurePermission(sitePolicy, "directus_users", "read", {
    fields: ["id"],
    permissions: {
      _or: [
        { role: { name: { _eq: "Portal Reviewer" } } },
        { policies: { policy: { name: { _eq: "Portal review" } } } },
        { role: { policies: { policy: { name: { _eq: "Portal review" } } } } },
      ],
    },
  });
  await ensurePermission(sitePolicy, "directus_notifications", "create", {
    fields: ["recipient", "subject", "message", "collection", "item"],
    permissions: null,
  });
  const siteRole = await ensureRole("Website", { icon: "public" });
  await ensureAccess(siteRole, sitePolicy);

  const reviewerPolicy = await ensurePolicy("Portal review", {
    icon: "fact_check",
    admin_access: false,
    app_access: true,
  });
  const reviewerRole = await ensureRole("Portal Reviewer", { icon: "fact_check" });
  await ensureAccess(reviewerRole, reviewerPolicy);
  await ensureReviewPreset(reviewerRole, "field_updates", "Missionary prayer requests awaiting review");
  await ensureReviewPreset(reviewerRole, "news", "Missionary news updates awaiting review");
  await ensurePermission(reviewerPolicy, "field_updates", "read", {
    fields: ["*"],
    permissions: fieldUpdateTypeFilter,
  });
  await ensurePermission(reviewerPolicy, "field_updates", "update", {
    fields: ["status", "type", "title", "body", "date", "sensitive", "image", "reviewNotes"],
    permissions: fieldUpdateTypeFilter,
    presets: { reviewedBy: "$CURRENT_USER", reviewedAt: "$NOW" },
  });
  await ensurePermission(reviewerPolicy, "news", "read", {
    fields: ["*"],
    permissions: { category: { _eq: "update" } },
  });
  await ensurePermission(reviewerPolicy, "news", "update", {
    fields: ["status", "title", "excerpt", "body", "date", "image", "reviewNotes"],
    permissions: { category: { _eq: "update" } },
    presets: { reviewedBy: "$CURRENT_USER", reviewedAt: "$NOW" },
  });
  await ensurePermission(reviewerPolicy, "missionaries", "read", { fields: ["*"], permissions: {} });
  await ensurePermission(reviewerPolicy, "directus_files", "read", {
    fields: ["*"],
    permissions: { folder: { _eq: PORTAL_MEDIA_FOLDER_ID } },
  });
  await ensurePermission(reviewerPolicy, "directus_users", "read", {
    fields: ["id", "email", "first_name", "last_name"],
    permissions: { id: { _eq: "$CURRENT_USER" } },
  });

  console.log("✓ missionary portal schema, relationships, and policies are configured");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
