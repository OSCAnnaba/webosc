import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Reddit_Mono } from "next/font/google";
const font = Reddit_Mono({ subsets: ["latin"] });
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { checkEmailValidation } from "@/lib/authorization";
import EmailBanner from "@/components/EmailBanner";

export const metadata: Metadata = {
  title: `WebOSC - Platform${process.env.NODE_ENV === "development" ? " - Development" : ""}`,
  icons: {
    icon: "/logo-white.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = cookies().get("token")?.value;
  return (
    <html lang="en">
      <body className={font.className}>
        <Toaster position="top-right" />

        <main className="flex flex-col min-h-screen bg-gray-900 text-white selection:bg-slate-300 selection:text-gray-800">
          {token && !checkEmailValidation() && <EmailBanner />}
          {children}
        </main>
      </body>
    </html>
  );
}
