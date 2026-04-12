
import type { Metadata } from "next";
import { Poppins, Geist } from "next/font/google";
import { AuthProvider } from "@/context/authContext";
import "./globals.css";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100","200","300","400", "500", "600", "700","800", "900"],
});

export const metadata: Metadata = {
  title: "Integrated Oasis",
  description: "Learn your tech Skills with at Integrated OASIS",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={` ${poppins.variable} antialiased`}>
        <AuthProvider>
        {children}
        </AuthProvider>
      </body>
    </html>
  );
}
