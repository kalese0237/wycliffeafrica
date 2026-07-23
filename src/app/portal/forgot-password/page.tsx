import { PageTemplate } from "@/components/templates";
import { RequestPasswordResetForm } from "@/components/organisms/portal";

export const metadata = { title: "Reset Portal Password | Wycliffe Africa" };

export default function ForgotPasswordPage() {
  return (
    <PageTemplate heroTitle="Missionary Portal">
      <section className="mx-auto max-w-[520px] px-5 py-16 sm:px-12">
        <RequestPasswordResetForm />
      </section>
    </PageTemplate>
  );
}
