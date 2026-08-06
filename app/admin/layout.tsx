import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { getSession } from "@/lib/utils/auth";

export const metadata = {
  title: { template: "%s | Outlxx Admin", default: "Outlxx Admin" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  // Defense in depth: proxy.ts guards /admin at the edge of the request,
  // but the layout re-verifies the session server-side so admin pages can
  // never render without a valid admin JWT.
  const session = await getSession();
  if (!session || session.role !== "admin") {
    redirect("/account/sign-in?redirect=/admin");
  }

  return (
    <AdminShell adminEmail={session.email} adminName={session.firstName}>
      {children}
    </AdminShell>
  );
}
