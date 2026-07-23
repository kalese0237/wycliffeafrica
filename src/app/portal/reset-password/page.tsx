import { PageTemplate } from "@/components/templates";
import { ResetPasswordForm } from "@/components/organisms/portal";

export const metadata = { title: "Choose a New Password — Wycliffe Africa" };

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token = "" } = await searchParams;
  return (
    <PageTemplate heroTitle="Missionary Portal">
      <section className="mx-auto max-w-[520px] px-5 py-16 sm:px-12">
        <ResetPasswordForm token={token} />
      </section>
    </PageTemplate>
  );
}
