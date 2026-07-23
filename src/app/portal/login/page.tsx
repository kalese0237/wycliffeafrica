import * as React from "react";
import { redirect } from "next/navigation";
import { HandHeart, Newspaper, ShieldCheck } from "lucide-react";
import { PageTemplate } from "@/components/templates";
import { LoginForm } from "@/components/organisms/portal";
import { getPortalUser } from "@/lib/portal/auth";

export const metadata = {
  title: "Missionary Portal | Wycliffe Africa",
};

const FEATURES = [
  {
    icon: <Newspaper size={18} />,
    title: "Share field updates",
    body: "Tell supporters what God is doing in your language community.",
  },
  {
    icon: <HandHeart size={18} />,
    title: "Raise prayer requests",
    body: "Invite the wider family to pray with you — publicly or anonymized.",
  },
  {
    icon: <ShieldCheck size={18} />,
    title: "Reviewed before publishing",
    body: "Everything you submit is checked by the office before it goes live.",
  },
];

export default async function PortalLoginPage() {
  if (await getPortalUser()) redirect("/portal");

  return (
    <PageTemplate heroTitle="Missionary Portal">
      <section className="mx-auto max-w-[var(--container-max)] px-5 py-16 sm:px-12">
        <div className="mx-auto grid max-w-[960px] grid-cols-1 items-start gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <h2 className="mb-3 font-display text-2xl font-semibold leading-tight text-strong">
              A direct line from the field to your supporters
            </h2>
            <p className="mb-8 max-w-[58ch] font-body text-md leading-relaxed text-muted">
              The portal is where serving missionaries share news and prayer needs. Submissions are
              reviewed by the office, then published to your profile and the prayer page.
            </p>
            <ul className="space-y-5">
              {FEATURES.map((f) => (
                <li key={f.title} className="flex items-start gap-3.5">
                  <span className="mt-0.5 inline-flex h-9 w-9 flex-none items-center justify-center rounded-full bg-primary-tint text-primary">
                    {f.icon}
                  </span>
                  <div>
                    <div className="font-ui text-sm font-semibold text-body">{f.title}</div>
                    <p className="font-body text-sm leading-relaxed text-muted">{f.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <LoginForm />
        </div>
      </section>
    </PageTemplate>
  );
}
