"use client";

import { SessionProvider } from "next-auth/react";

/** Client wrapper so server components (the root layout) can mount NextAuth's session context. */
export function AuthSessionProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
