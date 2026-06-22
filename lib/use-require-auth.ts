"use client";

import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/components/ui/toast";

/**
 * Returns a guard you call before a login-only action (favourites, checkout).
 * If the visitor is signed in it returns `true`; otherwise it shows a toast and
 * sends them to /sign-in with a `next` param so they return here after login.
 *
 *   const requireAuth = useRequireAuth();
 *   const onSave = () => { if (!requireAuth("Sign in to save favourites.")) return; ... };
 */
export function useRequireAuth() {
  const { user, hydrated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  return (description = "Please sign in to continue.", next = pathname) => {
    if (!hydrated) return false; // auth state unknown yet — block until ready
    if (user) return true;
    toast.info("Sign in required", { description });
    router.push(`/sign-in?next=${encodeURIComponent(next)}`);
    return false;
  };
}
