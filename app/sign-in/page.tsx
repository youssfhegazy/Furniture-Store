import type { Metadata } from "next";

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
        <SignInForm />
      </main>
      <Footer />
    </>
  );
}
