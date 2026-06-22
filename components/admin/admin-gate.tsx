"use client";

import Link from "next/link";
import { ArrowRight, LayoutDashboard, ShieldCheck } from "lucide-react";

import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";

/**
 * Shown when a non-admin lands on /admin. Lets portfolio visitors jump into a
 * read-only demo in one click, or sign in with a real admin email.
 */
export function AdminGate() {
  const { enterDemoAdmin } = useAuth();

  return (
    <div className="grid min-h-screen place-items-center bg-stone-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-sm">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-amber-100 text-amber-600">
          <ShieldCheck className="h-6 w-6" />
        </span>
        <h1 className="mt-4 text-xl font-semibold text-stone-900">Admin Dashboard</h1>
        <p className="mt-2 text-sm text-stone-500">
          This area is restricted to administrators. Explore it instantly with a
          read-only demo account, or sign in with an admin email.
        </p>

        <Button onClick={enterDemoAdmin} size="lg" className="mt-6 w-full">
          <LayoutDashboard className="h-4 w-4" /> Explore as demo admin
        </Button>

        <Link
          href="/sign-in?next=/admin"
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-amber-600 hover:underline"
        >
          Sign in with an admin account <ArrowRight className="h-4 w-4" />
        </Link>

        <Link href="/" className="mt-5 block text-xs text-stone-400 hover:text-stone-600">
          ← Back to store
        </Link>
      </div>
    </div>
  );
}
