import { PropsWithChildren } from "react";
import SiteHeader from "../_components/site-header/site-header";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <>
      <SiteHeader />
      {children}
    </>
  );
}
