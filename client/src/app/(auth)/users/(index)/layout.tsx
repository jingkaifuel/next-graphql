import { PropsWithChildren } from "react";
import { Container } from "@radix-ui/themes";
import PageHeader from "@/app/_components/page-header/page-header";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Container className="wrapper">
      <PageHeader title="Users" showBack={false}></PageHeader>
      {children}
    </Container>
  );
}
