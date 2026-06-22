"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, ChevronDown, Menu, Search, Settings, User, LogOut } from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/components/ui/toast";
import { formatMoney } from "@/lib/admin-data";
import type { ApiProduct } from "@/lib/admin-client";

const notifications = [
  { title: "New order ORD-1042", meta: "Layla Hassan · 2 min ago", tone: "bg-emerald-500" },
  { title: "Low stock: Velvet Wing Chair", meta: "Only 4 left · 1 hr ago", tone: "bg-amber-500" },
  { title: "Order ORD-1040 moved to production", meta: "Nour Mansour · 3 hr ago", tone: "bg-violet-500" },
];

/** Product search with a live results dropdown; Enter opens the filtered list. */
function AdminSearch() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const [q, setQ] = useState("");
  const [results, setResults] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // Debounced live search against the products API.
  useEffect(() => {
    const term = q.trim();
    if (term.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/products?q=${encodeURIComponent(term)}&limit=6`);
        const body = await res.json();
        setResults(body.data ?? []);
        setOpen(true);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [q]);

  function goToList(term: string) {
    const t = term.trim();
    if (!t) return;
    setOpen(false);
    router.push(`/admin/products?q=${encodeURIComponent(t)}`);
  }

  return (
    <div ref={ref} className="relative hidden flex-1 sm:block">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          goToList(q);
        }}
      >
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => results.length && setOpen(true)}
          placeholder="Search products…"
          className="h-10 w-full max-w-md rounded-full border border-stone-200 bg-stone-50 pl-10 pr-9 text-sm text-stone-700 placeholder:text-stone-400 focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/30"
        />
        {loading && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400">
            <Spinner size="sm" />
          </span>
        )}
      </form>

      {open && q.trim().length >= 2 && (
        <div className="absolute left-0 right-0 z-40 mt-2 max-w-md overflow-hidden rounded-xl border border-stone-200 bg-white shadow-xl">
          {results.length === 0 && !loading ? (
            <p className="px-4 py-6 text-center text-sm text-stone-400">
              No products match “{q.trim()}”.
            </p>
          ) : (
            <ul className="max-h-80 overflow-y-auto py-1">
              {results.map((p) => (
                <li key={p.slug}>
                  <button
                    type="button"
                    onClick={() => goToList(p.name)}
                    className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-stone-50"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-9 w-9 shrink-0 rounded-md object-cover ring-1 ring-stone-200"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-stone-800">{p.name}</span>
                      <span className="block text-xs text-stone-400">{p.category}</span>
                    </span>
                    <span className="shrink-0 text-sm font-semibold text-stone-700">
                      {formatMoney(p.price)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
          <button
            type="button"
            onClick={() => goToList(q)}
            className="w-full border-t border-stone-100 px-4 py-2.5 text-center text-sm font-medium text-amber-600 hover:bg-stone-50"
          >
            See all results for “{q.trim()}”
          </button>
        </div>
      )}
    </div>
  );
}

export function Topbar({ onMenu }: { onMenu: () => void }) {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [bellOpen, setBellOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const displayName = user?.name || "Admin User";
  const displayEmail = user?.email || "admin@furniflex.com";

  // Close dropdowns on outside click.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setBellOpen(false);
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function handleLogout() {
    setProfileOpen(false);
    signOut();
    toast.info("Signed out");
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-stone-200 bg-white/80 px-4 backdrop-blur-md lg:px-6">
      <button
        aria-label="Open menu"
        onClick={onMenu}
        className="grid h-10 w-10 place-items-center rounded-lg text-stone-600 hover:bg-stone-100 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Search */}
      <AdminSearch />
      <div className="flex-1 sm:hidden" />

      <div ref={ref} className="flex items-center gap-1.5">
        <Link
          href="/admin/products"
          aria-label="Search"
          className="grid h-10 w-10 place-items-center rounded-lg text-stone-600 hover:bg-stone-100 sm:hidden"
        >
          <Search className="h-5 w-5" />
        </Link>

        {/* Notifications */}
        <div className="relative">
          <button
            aria-label="Notifications"
            onClick={() => {
              setBellOpen((v) => !v);
              setProfileOpen(false);
            }}
            className="relative grid h-10 w-10 place-items-center rounded-lg text-stone-600 hover:bg-stone-100"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-amber-500 ring-2 ring-white" />
          </button>
          {bellOpen && (
            <div className="absolute right-0 mt-2 w-80 overflow-hidden rounded-xl border border-stone-200 bg-white shadow-xl">
              <div className="flex items-center justify-between border-b border-stone-100 px-4 py-3">
                <span className="text-sm font-semibold text-stone-900">Notifications</span>
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                  3 new
                </span>
              </div>
              <ul className="max-h-80 overflow-y-auto">
                {notifications.map((n) => (
                  <li
                    key={n.title}
                    className="flex gap-3 border-b border-stone-50 px-4 py-3 hover:bg-stone-50"
                  >
                    <span className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", n.tone)} />
                    <div>
                      <p className="text-sm font-medium text-stone-800">{n.title}</p>
                      <p className="text-xs text-stone-400">{n.meta}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <button className="w-full px-4 py-3 text-center text-sm font-medium text-amber-600 hover:bg-stone-50">
                View all notifications
              </button>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => {
              setProfileOpen((v) => !v);
              setBellOpen(false);
            }}
            className="flex items-center gap-2 rounded-lg p-1 pl-1.5 hover:bg-stone-100"
          >
            {user?.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.avatar}
                alt={displayName}
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <Avatar name={displayName} className="h-8 w-8 text-sm" />
            )}
            <span className="hidden text-left sm:block">
              <span className="block text-sm font-semibold leading-tight text-stone-800">
                {displayName}
              </span>
              <span className="block text-xs text-stone-400">Store Manager</span>
            </span>
            <ChevronDown className="hidden h-4 w-4 text-stone-400 sm:block" />
          </button>
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-stone-200 bg-white shadow-xl">
              <div className="border-b border-stone-100 px-4 py-3">
                <p className="truncate text-sm font-semibold text-stone-900">{displayName}</p>
                <p className="truncate text-xs text-stone-400">{displayEmail}</p>
              </div>
              <div className="py-1">
                {/* <DropItem
                  icon={User}
                  label="My Profile"
                  href="/profile"
                  onClick={() => setProfileOpen(false)}
                /> */}
                <DropItem
                  icon={Settings}
                  label="Settings"
                  href="/admin/settings"
                  onClick={() => setProfileOpen(false)}
                />
              </div>
              <div className="border-t border-stone-100 py-1">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50"
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function DropItem({
  icon: Icon,
  label,
  href,
  onClick,
}: {
  icon: typeof User;
  label: string;
  href: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-2.5 px-4 py-2 text-sm text-stone-700 hover:bg-stone-50"
    >
      <Icon className="h-4 w-4 text-stone-400" />
      {label}
    </Link>
  );
}
