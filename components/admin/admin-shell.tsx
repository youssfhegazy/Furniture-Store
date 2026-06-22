"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

import { useAuth } from "@/lib/auth-context";
import { isAdminEmail, isDemoAdminEmail } from "@/lib/admin";
import { setAdminReadOnly } from "@/lib/admin-client";
import { FullPageSpinner } from "@/components/ui/spinner";

import { Sidebar, MobileSidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { AdminGate } from "./admin-gate";

/** Client wrapper that owns the mobile drawer state shared by topbar + sidebar. */
export function AdminShell({ children }: { children: React.ReactNode }) {
  const { user, hydrated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const isAdmin = isAdminEmail(user?.email);
  const readOnly = isDemoAdminEmail(user?.email);

  // Demo admin can browse but not mutate (enforced in lib/admin-client).
  useEffect(() => {
    setAdminReadOnly(readOnly);
    return () => setAdminReadOnly(false);
  }, [readOnly]);

  if (!hydrated) return <FullPageSpinner label="Loading…" />;
  if (!isAdmin) return <AdminGate />;

  return (
    <div className="flex min-h-screen bg-stone-50 text-stone-900">
      <Sidebar />
      <MobileSidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onMenu={() => setMenuOpen(true)} />
        {readOnly && (
          <div className="flex items-center justify-center gap-2 bg-amber-100 px-4 py-2 text-center text-xs font-medium text-amber-800">
            <Eye className="h-3.5 w-3.5" />
            Demo mode — you&apos;re exploring as a read-only admin. Changes are disabled.
          </div>
        )}
        <main className="flex-1 px-4 py-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
