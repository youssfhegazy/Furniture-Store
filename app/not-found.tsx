import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { TopBar } from "@/components/site/top-bar";

export default function NotFound() {
  return (
    <>
      <TopBar />
      <main className="container-x flex min-h-[80vh] flex-col items-center justify-center py-16 text-center">
        {/* 404 with furniture */}
        <div className="relative flex select-none items-center justify-center">
          <span className="text-[8rem] font-extrabold leading-none tracking-tighter text-ink/20 sm:text-[12rem]">
            404
          </span>
        </div>

        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
          PAGE NOT FOUND
        </h1>
        <p className="mt-3 text-ink-soft">
          Sorry, we can not find the page you are looking for.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 font-semibold text-gold transition-colors hover:text-gold-dark"
        >
          <ArrowLeft className="h-5 w-5" /> BACK TO HOME
        </Link>
      </main>
    </>
  );
}
