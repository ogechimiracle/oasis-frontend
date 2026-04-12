"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./authContext";
import Loading from "@/components/ui/loading";



export default function PublicGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  const redirectByRole = (roles: string[]) => {
    if (roles.includes("ADMIN")) return router.replace("/admin");
    if (roles.includes("STAFF")) return router.replace("/staff");
    if (roles.includes("STUDENT")) return router.replace("/");
    router.replace("/");
  };

  useEffect(() => {
    if (loading) return;

    if (user) {
      redirectByRole(user.roles);
    }
  }, [user, loading]);

  if (loading) return <Loading/>;

  if (user) return null;

  return <>{children}</>;
}