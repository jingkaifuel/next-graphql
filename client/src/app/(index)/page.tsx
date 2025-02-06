"use client";

import { redirect } from "next/navigation";
import useAuthStore from "../_store/authStore";

export default function Page() {
  const { token } = useAuthStore();

  if (token) return redirect("/claims");
  else return redirect("/login");
}
