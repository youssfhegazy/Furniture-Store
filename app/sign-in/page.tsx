import type { Metadata } from "next";
import { Suspense } from "react";

import { TopBar } from "@/components/site/top-bar";
import { Navbar } from "@/components/site/navbar";
import { SignInForm } from "@/components/site/auth-forms";
import { Footer } from "@/components/site/footer";

export const metadata: Metadata = {
  title: "Sign In — FurniFlex",
};

export default function SignInPage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        {/* Suspense boundary for useSearchParams (?next=) in the client form. */}
        <Suspense fallback={null}>
          <SignInForm />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
