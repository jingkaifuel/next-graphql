"use client";

import { Table, Text } from "@radix-ui/themes";
import { useSuspenseQuery } from "@apollo/client";

import { useRouter } from "next/navigation";
import getClaims, { GetClaimsResponse } from "@/api/claims/getClaims";
import client from "../../../_lib/apolloClient";
import { formatValue } from "../../../_lib/formatValue";
import formatDate from "../../../_lib/formatDate";
import Pagination from "../../../_components/pagination/pagination";
import { useMemo, useState } from "react";

export default function Claims() {
  // Query
  const { data } = useSuspenseQuery<GetClaimsResponse>(getClaims, {
    client,
    fetchPolicy: "network-only",
  });

  // Hooks
  const router = useRouter();

  // Pagination
  const maxCount = 10;
  const [page, setPage] = useState(0);
  const claimsList = useMemo(() => {
    return data?.claims.slice(page * 10, (page + 1) * 10);
  }, [page, data]);

  // Functions
  const handlePagination = (i: number) => {
    setPage(i);
  };

  if (!data?.claims.length) return <Text>No data</Text>;

  return (
    <>
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
              <Table.Cell>{formatValue(claim.approvedBy?.username)}</Table.Cell>
              <Table.Cell>{formatValue(claim.status?.name)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        count={(data?.claims.length ?? 0) / maxCount}
        onPagination={handlePagination}
      />
    </>
  );
}
