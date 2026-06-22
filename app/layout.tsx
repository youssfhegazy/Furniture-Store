import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { AuthProvider } from "@/lib/auth-context";
import { FavoritesProvider } from "@/lib/favorites-context";
import { ToastProvider } from "@/components/ui/toast";
import { AuthSessionProvider } from "@/components/session-provider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FurniFlex — Modern Interior Design Studio",
  description:
    "Choosing the right furniture for your home online will add elegance and functionality to your interior while also being cost effective and long lasting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full`}>
      <body className="min-h-full bg-white text-ink antialiased">
        <ToastProvider>
          <AuthSessionProvider>
            <AuthProvider>
              <FavoritesProvider>
                <CartProvider>{children}</CartProvider>
              </FavoritesProvider>
            </AuthProvider>
          </AuthSessionProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
