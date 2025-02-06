"use client";

import getUserById, { GetUserByIdResponse } from "@/api/user/getUserById";
import PageHeader from "@/app/_components/page-header/page-header";
import client from "@/app/_lib/apolloClient";
import { formatValue } from "@/app/_lib/formatValue";
import { useSuspenseQuery } from "@apollo/client";
import { Container, DataList, Spinner } from "@radix-ui/themes";
import { useParams } from "next/navigation";
import { Suspense } from "react";

export default function Page() {
  const { id } = useParams();
  const { data } = useSuspenseQuery<GetUserByIdResponse>(getUserById, {
    variables: { id },
    client,
    fetchPolicy: "network-only",
  });

  return (
    <Container className="wrapper small">
      <PageHeader title="User Details"></PageHeader>

      <Suspense fallback={<Spinner size="3" m="auto" />}>
        <DataList.Root mt="3">
          <DataList.Item align="center">
            <DataList.Label>Name</DataList.Label>
            <DataList.Value>{formatValue(data.userById.name)}</DataList.Value>
          </DataList.Item>
          <DataList.Item align="center">
            <DataList.Label>Email</DataList.Label>
            <DataList.Value>{formatValue(data.userById.email)}</DataList.Value>
          </DataList.Item>
          <DataList.Item align="center">
            <DataList.Label>Position</DataList.Label>
            <DataList.Value>
              {formatValue(data.userById.position)}
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>
      </Suspense>
    </Container>
  );
}
