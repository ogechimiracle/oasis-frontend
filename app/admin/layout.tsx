
import AdminNav from "@/components/admin/adminNav";
import TopBar from "@/components/admin/topBar";

import RoleGuard from "@/context/roleGuard";
import { Metadata } from "next";
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
      <RoleGuard allowedRoles={["ADMIN"]}>
        <div className="min-h-screen w-full flex flex-col lg:flex-row">

            <div className="lg:max-w-[22%] w-full bg-gray-100 lg:fixed top-0 lg:left-0 h-full">
              <AdminNav/>
            </div>

            <div className="w-full lg:ml-[20em] py-5 lg:px-12 px-5">
                <TopBar/>
                <div className="mt-8 w-full">
                  {children}
                </div>
            </div>
          
        </div>
        <Toaster/>
      </RoleGuard>
  );
}
