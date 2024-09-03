import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import Header from "./components/Header";
import { Toaster } from "@/components/ui/toaster"
import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RiverFlow - StackOverflow Clone",
  description: "RiverFlow - StackOverflow Clone, Everything you need to build your own StackOverflow clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en" className="dark">
        <body className={cn(inter.className, "dark:bg-black dark:text-white")}>
          <Header />
          {children}
          <Toaster />
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
