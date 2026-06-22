"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Sofa,
  Tags,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  X,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

type NavItem = { label: string; href: string; icon: LucideIcon; badge?: number };

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Sofa },
  { label: "Categories", href: "/admin/categories", icon: Tags },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart, badge: 6 },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

function Logo() {
  return (
    <Link href="/admin" className="flex items-center gap-2.5 text-white">
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-amber-500 text-lg font-bold text-stone-900">
        F
      </span>
      <span className="text-lg font-semibold tracking-tight">
        FurniFlex<span className="text-amber-500">.</span>
        <span className="ml-1 text-xs font-normal text-stone-400">Admin</span>
      </span>
    </Link>
  );
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-1 flex-col gap-1 px-3">
      {navItems.map((item) => {
        const active =
          item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-amber-500/10 text-amber-400"
                : "text-stone-400 hover:bg-white/5 hover:text-stone-100"
            )}
          >
            <Icon className={cn("h-5 w-5 shrink-0", active && "text-amber-400")} />
            <span className="flex-1">{item.label}</span>
            {item.badge ? (
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-amber-500 px-1 text-[11px] font-semibold text-stone-900">
                {item.badge}
              </span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarBody({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col gap-6 py-6">
      <div className="px-6">
        <Logo />
      </div>
      <NavLinks onNavigate={onNavigate} />
      <div className="mt-auto px-3">
        <div className="rounded-xl bg-white/5 p-4">
          <p className="text-sm font-medium text-stone-100">Need help?</p>
          <p className="mt-1 text-xs text-stone-400">Check our docs & API guide.</p>
          <Link
            href="/"
            className="mt-3 inline-block text-xs font-semibold text-amber-400 hover:text-amber-300"
          >
            View storefront →
          </Link>
        </div>
        <button className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-stone-400 transition-colors hover:bg-white/5 hover:text-stone-100">
          <LogOut className="h-5 w-5" />
          Log out
        </button>
      </div>
    </div>
  );
}

/** Desktop sticky sidebar. */
export function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 bg-stone-900 lg:block">
      <SidebarBody />
    </aside>
  );
}

/** Mobile slide-over sidebar, controlled by the topbar's menu button. */
export function MobileSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div className={cn("lg:hidden", open ? "" : "pointer-events-none")}>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-stone-900/50 transition-opacity",
          open ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-stone-900 transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <button
          aria-label="Close menu"
          onClick={onClose}
          className="absolute right-3 top-5 grid h-9 w-9 place-items-center rounded-lg text-stone-400 hover:bg-white/5 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
        <SidebarBody onNavigate={onClose} />
      </aside>
    </div>
  );
}
