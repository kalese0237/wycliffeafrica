import { ResetPasswordForm } from "@/components/organisms/portal";
import { PortalAuthTemplate } from "@/components/templates";

export const metadata = { title: "Choose a New Password | Wycliffe Africa" };

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token = "" } = await searchParams;
  return (
    <PortalAuthTemplate>
      <ResetPasswordForm token={token} />
    </PortalAuthTemplate>
  );
}
