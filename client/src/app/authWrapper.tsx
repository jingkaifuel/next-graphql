"use client";

import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

export default function AuthWrapper({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    switch (pathname) {
      case "/":
        if (token) router.replace("/claims");
        break;
      default:
        if (!token) router.push("/");
    }
  }, [pathname, router]);

  return <>{children}</>;
}
