import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import GlobalContextProvider from "@/context/GlobalContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anonymous",
  description: "The anonymous app for strangers for sharing of Ideas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <GlobalContextProvider>
        <body>
          <Toaster />
          {children}
        </body>
      </GlobalContextProvider>
    </html>
  );
}
