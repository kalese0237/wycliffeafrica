import { redirect } from "next/navigation";
import { PortalDashboardTemplate } from "@/components/templates";
import { supportsRichNewsFields } from "@/lib/directus/queries";
import { getMySubmissions, getPortalUser } from "@/lib/portal/auth";

export const metadata = {
  title: "Missionary Portal | Wycliffe Africa",
};

export default async function PortalDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const user = await getPortalUser();
  if (!user) redirect("/portal/login");

  const missionary = user.missionary;
  const richFieldsSupported = missionary ? await supportsRichNewsFields() : false;
  const submissions = missionary
    ? await getMySubmissions(missionary.id, richFieldsSupported)
    : [];
  const requestedType = (await searchParams).type;

  return (
    <PortalDashboardTemplate
      missionary={missionary}
      displayName={missionary?.name ?? user.firstName}
      submissions={submissions}
      initialType={requestedType === "prayer" ? "prayer" : "update"}
      richFieldsSupported={richFieldsSupported}
    />
  );
}
