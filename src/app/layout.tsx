import type { Metadata } from "next";
import "./globals.css";
import AppProviders from "../providers";

import { ClerkProvider } from "@clerk/nextjs";
import { montserrat400 } from "../fonts/montserrat";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "ScrapeYard",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <ClerkProvider afterSignOutUrl={"/sign-in"}
      appearance={{
        elements: {
          formButtonPrimary: "bg-primary hover:bg-primary/90 text-sm !shadow-none",
          formButtonSecondary: "bg-secondary hover:bg-secondary/90 text-sm !shadow-none",
          card: "bg-slate-100"
        }
      }}
    >
      <html lang="en">
        <body className={cn(montserrat400.className)}>
          <AppProviders>
            {children}
            <Toaster richColors />
          </AppProviders>
        </body>
      </html>
    </ClerkProvider>
  );
}
