import type { Metadata } from "next";

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
        <SignUpForm />
      </main>
      <Footer />
    </>
  );
}
