import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { EdgeStoreProvider } from "@/lib/edgestore";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Summerize - AI-Powered pdf Summarizer",
  description: "Save hours of reading with Summerize, the AI-powered PDF summarizer that extracts key points and insights from your documents in seconds.",
  keywords: [
    "AI",
    "PDF",
    "summarizer",
    "summarize",
    "text",
    "extraction",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${nunitoSans.variable} font-sans antialiased`}
      >
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
           <EdgeStoreProvider> {children}</EdgeStoreProvider>
          </main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
    </ClerkProvider>
  );
}
