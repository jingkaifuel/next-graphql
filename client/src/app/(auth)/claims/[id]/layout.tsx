"use client";

import PageHeader from "@/app/_components/page-header/page-header";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button, Container, Text } from "@radix-ui/themes";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PropsWithChildren } from "react";

export default function ClaimDetail({ children }: PropsWithChildren) {
  const { id } = useParams();

  return (
    <Container className="wrapper small">
      <PageHeader title="Claim Details">
        <Link href={`/claims/edit/${id}`}>
          <Button size="2">
            <Pencil2Icon />
            <Text>Edit</Text>
          </Button>
        </Link>
      </PageHeader>

      {children}
    </Container>
  );
}
