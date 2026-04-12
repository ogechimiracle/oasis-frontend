import PublicGuard from "@/context/publicGuard";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";


interface AuthLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Integrated Oasis",
  description: "Learn your tech Skills with at Integrated OASIS",
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 lg:px-0 px-5 py-2 lg:py-0">
      <div className="w-full lg:w-200 bg-white shadow-md rounded-xl py-3 lg:py-0">
        <PublicGuard>
           {children}
        </PublicGuard>
        <Toaster/>
      </div>
    </div>
  );
}
