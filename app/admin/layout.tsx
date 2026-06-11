import type { ReactNode } from "react";
import AdminShell from "@/components/admin/AdminShell";

export const metadata = { title: { template: "%s | Outluxx Admin", default: "Outluxx Admin" } };

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
