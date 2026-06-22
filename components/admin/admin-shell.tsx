"use client";

import { useState } from "react";

import { Sidebar, MobileSidebar } from "./sidebar";
import { Topbar } from "./topbar";

/** Client wrapper that owns the mobile drawer state shared by topbar + sidebar. */
export function AdminShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-stone-50 text-stone-900">
      <Sidebar />
      <MobileSidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onMenu={() => setMenuOpen(true)} />
        <main className="flex-1 px-4 py-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
