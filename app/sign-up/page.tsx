import type { Metadata } from "next";
import { Suspense } from "react";

import { TopBar } from "@/components/site/top-bar";
import { Navbar } from "@/components/site/navbar";
import { SignUpForm } from "@/components/site/auth-forms";
import { Footer } from "@/components/site/footer";

export const metadata: Metadata = {
  title: "Sign Up — FurniFlex",
};

export default function SignUpPage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        {/* Suspense boundary for useSearchParams (?next=) in the client form. */}
        <Suspense fallback={null}>
          <SignUpForm />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
