import PageHeader from "@/app/_components/page-header/page-header";
import { Container } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

export default function ClaimDetail({ children }: PropsWithChildren) {
  return (
    <Container className="wrapper small">
      <PageHeader title="Edit Claim" />

      {children}
    </Container>
  );
}
