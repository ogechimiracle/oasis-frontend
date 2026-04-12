"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./authContext";
import Loading from "@/components/ui/loading";



interface RoleGuardProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

export default function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    // not logged in
    if (!user) {
      router.push("/auth");
      return;
    }

    // check if user has allowed role
    const hasAccess = user.roles.some((role:any) =>
      allowedRoles.includes(role)
    );

    if (!hasAccess) {
      redirectByRole(user.roles);
    }
  }, [user, loading]);

  const redirectByRole = (roles: string[]) => {
    if (roles.includes("ADMIN")) return router.push("/admin");
    if (roles.includes("STAFF")) return router.push("/staff");
    if (roles.includes("STUDENT")) return router.push("/");
    router.push("/");
  };

  if (loading) return <Loading/>;

  if (!user) return null;

  const hasAccess = user.roles.some((role) =>
    allowedRoles.includes(role)
  );

  if (!hasAccess) return null;

  return <>{children}</>;
}