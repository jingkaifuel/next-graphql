import { PropsWithChildren } from "react";
import { Button, Container, Text } from "@radix-ui/themes";
import { PlusIcon } from "@radix-ui/react-icons";
import PageHeader from "@/app/_components/page-header/page-header";
import Link from "next/link";

export default function Claims({ children }: PropsWithChildren) {
  return (
    <Container className="wrapper">
      <PageHeader title="Claims" showBack={false}>
        <Link href="/claims/add">
          <Button size="2">
            <PlusIcon />
            <Text>Add Claim</Text>
          </Button>
        </Link>
      </PageHeader>

      {children}
    </Container>
  );
}
