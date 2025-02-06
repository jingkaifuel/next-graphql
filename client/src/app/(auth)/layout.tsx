"use client";

import { PropsWithChildren, useEffect } from "react";
import SiteHeader from "../_components/site-header/site-header";
import { usePathname } from "next/navigation";
import useAuthStore from "../_store/authStore";

export default function AuthLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const { reset } = useAuthStore();

  useEffect(() => {
    const token = window.sessionStorage.getItem("token");
    if (!token) {
      reset();
      window.location.href = "/";
    }
  }, [pathname]);

  return (
    <>
      <SiteHeader />
      {children}
    </>
  );
}
