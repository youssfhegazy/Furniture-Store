"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, LayoutDashboard, LogOut, Menu, Search, ShoppingBag, User, X } from "lucide-react";

import { navLinks } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import { useFavorites } from "@/lib/favorites-context";
import { useAuth } from "@/lib/auth-context";
import { SearchOverlay } from "@/components/site/search-overlay";
import { cn } from "@/lib/utils";

function IconBadgeLink({
  href,
  label,
  count,
  children,
  className,
  onClick,
}: {
  href: string;
  label: string;
  count: number;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      onClick={onClick}
      className={cn(
        "relative grid h-10 w-10 place-items-center rounded-full text-white/90 transition-colors hover:bg-white/10 hover:text-white",
        className
      )}
    >
      {children}
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-[11px] font-semibold text-white">
          {count}
        </span>
      )}
    </Link>
  );
}

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-white">
      <span className="grid h-9 w-9 place-items-center rounded-md bg-gold text-lg font-bold">
        F
      </span>
      <span className="text-xl font-semibold tracking-tight">
        FurniFlex<span className="text-gold">.</span>
      </span>
    </Link>
  );
}

function Avatar({ size = "h-7 w-7" }: { size?: string }) {
  const { user } = useAuth();
  if (!user) return null;
  return user.avatar ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={user.avatar}
      alt={user.name}
      className={cn(size, "rounded-full object-cover ring-2 ring-gold")}
    />
  ) : (
    <span
      className={cn(
        size,
        "grid place-items-center rounded-full bg-gold text-xs font-semibold text-white ring-2 ring-white/30"
      )}
    >
      {user.name.charAt(0).toUpperCase()}
    </span>
  );
}

/** Avatar button with a dropdown (Profile / Dashboard / Sign out). */
function AccountMenu() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  if (!user) return null;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={user.name}
        aria-haspopup="menu"
        aria-expanded={open}
        className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-white/10"
      >
        <Avatar />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            role="menu"
            className="absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-xl border border-stone-100 bg-white py-1.5 shadow-xl"
          >
            <div className="flex items-center gap-3 px-4 py-2.5">
              <Avatar size="h-9 w-9" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-stone-900">{user.name}</p>
                <p className="truncate text-xs text-stone-500">{user.email}</p>
              </div>
            </div>
            <div className="my-1 h-px bg-stone-100" />
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50"
              role="menuitem"
            >
              <User className="h-4 w-4 text-stone-400" /> My Profile
            </Link>
            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50"
              role="menuitem"
            >
              <LayoutDashboard className="h-4 w-4 text-stone-400" /> Dashboard
            </Link>
            <div className="my-1 h-px bg-stone-100" />
            <button
              onClick={() => {
                signOut();
                setOpen(false);
              }}
              className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50"
              role="menuitem"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SearchButton({
  mobile = false,
  onClick,
}: {
  mobile?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      aria-label="Search"
      onClick={onClick}
      className={
        mobile
          ? "grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white"
          : "grid h-10 w-10 place-items-center rounded-full text-white/90 transition-colors hover:bg-white/10 hover:text-white"
      }
    >
      <Search className="h-5 w-5" />
    </button>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const { count } = useCart();
  const { count: favCount } = useFavorites();
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-teal/95 backdrop-blur supports-[backdrop-filter]:bg-teal/80">
      <nav className="container-x flex h-16 items-center justify-between gap-6 lg:h-20">
        <Logo />

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative py-1 text-sm text-white/80 transition-colors hover:text-white",
                    active && "text-white"
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-0 h-0.5 w-full rounded-full bg-gold"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop icons + account */}
        <div className="hidden items-center gap-1 lg:flex">
          <SearchButton onClick={() => setSearchOpen(true)} />
          <IconBadgeLink
            href={user ? "/profile?tab=favourites" : "/sign-in"}
            label="Wishlist"
            count={user ? favCount : 0}
          >
            <Heart className="h-5 w-5" />
          </IconBadgeLink>
          <IconBadgeLink href="/cart" label="Cart" count={count}>
            <ShoppingBag className="h-5 w-5" />
          </IconBadgeLink>

          {user ? (
            <div className="ml-1">
              <AccountMenu />
            </div>
          ) : (
            <div className="ml-2 flex items-center gap-2">
              <Link
                href="/sign-in"
                className="rounded-full px-4 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
              >
                Login
              </Link>
              <Link
                href="/sign-up"
                className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gold/90"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full text-white transition-colors hover:bg-white/10 lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/10 bg-teal lg:hidden"
          >
            <ul className="container-x flex flex-col py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-base text-white/85 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              {/* Account row */}
              {user ? (
                <li className="mt-3 border-t border-white/10 pt-4">
                  <Link
                    href="/profile"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3"
                  >
                    <Avatar size="h-9 w-9" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">{user.name}</p>
                      <p className="truncate text-xs text-white/60">{user.email}</p>
                    </div>
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setOpen(false);
                    }}
                    className="mt-3 flex w-full items-center gap-2 rounded-lg bg-white/10 px-4 py-2.5 text-sm font-medium text-white"
                  >
                    <LogOut className="h-4 w-4" /> Sign out
                  </button>
                </li>
              ) : (
                <li className="mt-3 grid grid-cols-2 gap-2 border-t border-white/10 pt-4">
                  <Link
                    href="/sign-in"
                    onClick={() => setOpen(false)}
                    className="rounded-lg border border-white/20 px-4 py-2.5 text-center text-sm font-medium text-white"
                  >
                    Login
                  </Link>
                  <Link
                    href="/sign-up"
                    onClick={() => setOpen(false)}
                    className="rounded-lg bg-gold px-4 py-2.5 text-center text-sm font-semibold text-white"
                  >
                    Register
                  </Link>
                </li>
              )}

              {/* Quick icons */}
              <li className="mt-3 flex items-center gap-2 border-t border-white/10 pt-4">
                <SearchButton
                  mobile
                  onClick={() => {
                    setOpen(false);
                    setSearchOpen(true);
                  }}
                />
                <IconBadgeLink
                  href={user ? "/profile?tab=favourites" : "/sign-in"}
                  label="Wishlist"
                  count={user ? favCount : 0}
                  className="bg-white/10"
                  onClick={() => setOpen(false)}
                >
                  <Heart className="h-5 w-5" />
                </IconBadgeLink>
                <IconBadgeLink
                  href="/cart"
                  label="Cart"
                  count={count}
                  className="bg-white/10"
                  onClick={() => setOpen(false)}
                >
                  <ShoppingBag className="h-5 w-5" />
                </IconBadgeLink>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
