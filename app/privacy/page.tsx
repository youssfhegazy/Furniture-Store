import type { Metadata } from "next";

import { TopBar } from "@/components/site/top-bar";
import { Navbar } from "@/components/site/navbar";
import { PageHero } from "@/components/site/page-hero";
import { ContentPage } from "@/components/site/content-page";
import { Footer } from "@/components/site/footer";

export const metadata: Metadata = {
  title: "Privacy Policy — FurniFlex",
  description: "How FurniFlex collects, uses and protects your data.",
};

export default function PrivacyPage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        <PageHero title="Privacy Policy" />
        <ContentPage
          updated="June 21, 2026"
          intro="Your privacy matters to us. This policy explains what information we collect, why we collect it, and the choices you have."
          sections={[
            {
              heading: "Information we collect",
              bullets: [
                "Account details such as your name, email and phone number.",
                "Order and delivery information needed to fulfil purchases.",
                "Usage data like pages viewed, used to improve the store experience.",
              ],
            },
            {
              heading: "How we use your information",
              paragraphs: [
                "We use your data to process orders, provide customer support, send order updates, and — only with your consent — share occasional product news. We never sell your personal information.",
              ],
            },
            {
              heading: "Cookies",
              paragraphs: [
                "We use essential cookies to keep your cart and session working, and optional analytics cookies you can decline. You can manage cookies in your browser at any time.",
              ],
            },
            {
              heading: "Your rights",
              paragraphs: [
                "You can request access to, correction of, or deletion of your personal data by contacting support@furniflex.com. We respond to verified requests within 30 days.",
              ],
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
