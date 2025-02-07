"use client";

import { Suspense, useMemo, useState } from "react";
import {
  Button,
  Container,
  Flex,
  Spinner,
  Table,
  Text,
} from "@radix-ui/themes";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useSuspenseQuery } from "@apollo/client";
import { useRouter } from "next/navigation";

import getClaims, { GetClaimsResponse } from "@/api/claims/getClaims";
import PageHeader from "@/app/_components/page-header/page-header";
import Searchbar from "@/app/_components/searchnar/searchbar";
import client from "@/app/_lib/apolloClient";
import { formatValue } from "@/app/_lib/formatValue";
import Pagination from "@/app/_components/pagination/pagination";
import formatDate from "@/app/_lib/formatDate";

export default function Claims() {
  // Query
  const { data } = useSuspenseQuery<GetClaimsResponse>(getClaims, {
    client,
    fetchPolicy: "network-only",
  });

  // Hooks
  const router = useRouter();

  // Filtering
  const [search, setSearch] = useState("");
  const filteredData = useMemo(() => {
    if (!search) return data.claims;
    const searchStr = search.toLowerCase();
    return data.claims.filter((claim) => {
      return (
        claim.claimType.name.toLowerCase().includes(searchStr) ||
        claim.description.toLowerCase().includes(searchStr) ||
        claim.remark?.toLowerCase().includes(searchStr) ||
        claim.status?.name.toLowerCase().includes(searchStr)
      );
    });
  }, [search, data]);

  // Pagination
  const maxCount = 10;
  const [page, setPage] = useState(0);
  const claimsList = useMemo(() => {
    return filteredData.slice(page * 10, (page + 1) * 10);
  }, [page, filteredData]);

  // Functions
  const handlePagination = (i: number) => {
    setPage(i);
  };

  return (
    <Container className="wrapper">
      <PageHeader title="Claims" showBack={false} />
      <Flex justify="between" mb="5">
        <Searchbar placeholder="Search claims..." onChange={setSearch} />

        <Link href="/claims/add">
          <Button size="2">
            <PlusIcon />
            <Text>Add Claim</Text>
          </Button>
        </Link>
      </Flex>

      <Suspense fallback={<Spinner size="3" m="auto" />}>
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Claim Type</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Created At</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Updated At</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Approved By</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {claimsList.map((claim) => (
              <Table.Row
                key={claim._id}
                onClick={() => router.push(`/claims/${claim._id}`)}
              >
                <Table.Cell>{claim.claimType.name}</Table.Cell>
                <Table.Cell>{formatValue(claim.description)}</Table.Cell>
                <Table.Cell>{formatDate(claim.createdAt)}</Table.Cell>
                <Table.Cell>{formatDate(claim.updatedAt)}</Table.Cell>
                <Table.Cell>
                  {formatValue(claim.approvedBy?.username)}
                </Table.Cell>
                <Table.Cell>{formatValue(claim.status?.name)}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
        <Pagination
          count={(data?.claims.length ?? 0) / maxCount}
          onPagination={handlePagination}
        />
      </Suspense>
    </Container>
  );
}
