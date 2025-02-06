import PageHeader from "@/app/_components/page-header/page-header";
import { Container } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

export default function Template({ children }: PropsWithChildren) {
  return (
    <Container className="wrapper small">
      <PageHeader title="Add Claim" />
      {children}
    </Container>
  );
}
