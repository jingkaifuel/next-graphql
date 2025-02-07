"use client";

import useAuthStore from "@/app/_store/authStore";
import { notFound } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

export default function Layout({ children }: PropsWithChildren) {
  const { user } = useAuthStore();

  useEffect(() => {
    if (user && user?.position != "admin") notFound();
  }, [user]);

  if (!user) return null;

  return children;
}
