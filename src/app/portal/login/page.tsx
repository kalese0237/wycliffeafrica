import * as React from "react";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/organisms/portal";
import { PortalAuthTemplate } from "@/components/templates";
import { getPortalUser } from "@/lib/portal/auth";

export const metadata = {
  title: "Missionary Portal | Wycliffe Africa",
};

export default async function PortalLoginPage() {
  if (await getPortalUser()) redirect("/portal");

  return (
    <PortalAuthTemplate>
      <LoginForm />
    </PortalAuthTemplate>
  );
}
