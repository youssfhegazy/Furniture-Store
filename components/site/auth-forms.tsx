"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

/**
 * Post-auth destination from the `?next=` param (e.g. /sign-in?next=/cart/checkout),
 * defaulting to /profile. Only same-origin relative paths are allowed, to avoid
 * open-redirects.
 */
function useNextDestination() {
  const next = useSearchParams().get("next");
  return next && next.startsWith("/") && !next.startsWith("//") ? next : "/profile";
}

const inputCls =
  "w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-soft focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.65l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.11a6.6 6.6 0 0 1 0-4.22V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z"
      />
    </svg>
  );
}

/** Google OAuth button + "or" divider, shared by both auth forms. */
function GoogleAuth({ label }: { label: string }) {
  const { signInWithGoogle } = useAuth();
  const next = useNextDestination();
  return (
    <>
      <button
        type="button"
        onClick={() => signInWithGoogle(next)}
        className="mt-6 flex w-full items-center justify-center gap-3 rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm font-medium text-ink transition-colors hover:bg-muted/50"
      >
        <GoogleIcon />
        {label}
      </button>
      <div className="my-6 flex items-center gap-3 text-xs text-ink-soft">
        <span className="h-px flex-1 bg-ink/10" />
        or
        <span className="h-px flex-1 bg-ink/10" />
      </div>
    </>
  );
}

function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <section className="container-x py-12 lg:py-20">
      <div className="mx-auto w-full max-w-md rounded-3xl border border-ink/10 bg-white p-8 shadow-sm sm:p-10">
        <div className="mb-2 flex justify-center">
          <span className="text-2xl font-semibold text-ink">
            FurniFlex<span className="text-gold">.</span>
          </span>
        </div>
        <h1 className="text-center text-2xl font-semibold text-ink">{title}</h1>
        <p className="mt-2 text-center text-sm text-ink-soft">{subtitle}</p>
        {children}
        <p className="mt-6 text-center text-sm text-ink-soft">{footer}</p>
      </div>
    </section>
  );
}

export function SignInForm() {
  const router = useRouter();
  const { toast } = useToast();
  const { user, hydrated, signIn } = useAuth();
  const next = useNextDestination();

  useEffect(() => {
    if (hydrated && user) router.replace(next);
  }, [hydrated, user, router, next]);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const result = signIn({
      email: String(form.get("email")),
      password: String(form.get("password")),
    });
    if (result.ok) {
      toast.success("Welcome back!", { description: "You're now signed in." });
      router.push(next);
    } else {
      toast.error("Sign in failed", { description: result.error || "Unable to sign in." });
    }
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to your FurniFlex account."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link
            href={`/sign-up${next !== "/profile" ? `?next=${encodeURIComponent(next)}` : ""}`}
            className="font-medium text-gold hover:underline"
          >
            Sign up
          </Link>
        </>
      }
    >
      <GoogleAuth label="Sign in with Google" />
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm text-ink-soft">Email</label>
          <input name="email" type="email" required placeholder="you@example.com" className={inputCls} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-ink-soft">Password</label>
          <input name="password" type="password" required placeholder="••••••••" className={inputCls} />
        </div>
        <Button type="submit" size="lg" className="w-full">
          Sign In <ArrowRight className="h-4 w-4" />
        </Button>
      </form>
    </AuthShell>
  );
}

export function SignUpForm() {
  const router = useRouter();
  const { toast } = useToast();
  const { user, hydrated, signUp } = useAuth();
  const next = useNextDestination();

  useEffect(() => {
    if (hydrated && user) router.replace(next);
  }, [hydrated, user, router, next]);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const password = String(form.get("password"));
    if (password !== String(form.get("confirm"))) {
      toast.error("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password too short", { description: "Use at least 6 characters." });
      return;
    }
    const result = signUp({
      name: String(form.get("name")),
      email: String(form.get("email")),
      password,
    });
    if (result.ok) {
      toast.success("Account created", { description: "Welcome to FurniFlex!" });
      router.push(next);
    } else {
      toast.error("Sign up failed", { description: result.error || "Unable to create account." });
    }
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="Join FurniFlex to start shopping."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href={`/sign-in${next !== "/profile" ? `?next=${encodeURIComponent(next)}` : ""}`}
            className="font-medium text-gold hover:underline"
          >
            Sign in
          </Link>
        </>
      }
    >
      <GoogleAuth label="Sign up with Google" />
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm text-ink-soft">Full name</label>
          <input name="name" required placeholder="Jane Doe" className={inputCls} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-ink-soft">Email</label>
          <input name="email" type="email" required placeholder="you@example.com" className={inputCls} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm text-ink-soft">Password</label>
            <input name="password" type="password" required placeholder="••••••••" className={inputCls} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-ink-soft">Confirm</label>
            <input name="confirm" type="password" required placeholder="••••••••" className={inputCls} />
          </div>
        </div>
        <Button type="submit" size="lg" className="w-full">
          Create Account <ArrowRight className="h-4 w-4" />
        </Button>
      </form>
    </AuthShell>
  );
}
