import { RequestPasswordResetForm } from "@/components/organisms/portal";
import { PortalAuthTemplate } from "@/components/templates";

export const metadata = { title: "Reset Portal Password | Wycliffe Africa" };

export default function ForgotPasswordPage() {
  return (
    <PortalAuthTemplate>
      <RequestPasswordResetForm />
    </PortalAuthTemplate>
  );
}
