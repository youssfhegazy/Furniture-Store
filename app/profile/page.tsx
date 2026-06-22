import type { Metadata } from "next";

import { TopBar } from "@/components/site/top-bar";
import { Navbar } from "@/components/site/navbar";
import { ProfileView } from "@/components/site/profile-view";
import { Footer } from "@/components/site/footer";

export const metadata: Metadata = {
  title: "My Account — FurniFlex",
};

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const initialTab = tab === "favourites" ? "favourites" : "profile";

  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        <ProfileView initialTab={initialTab} />
      </main>
      <Footer />
    </>
  );
}
