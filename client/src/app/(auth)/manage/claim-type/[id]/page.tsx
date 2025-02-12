"use client";

import getClaimLimitsByType, {
  GetClaimLimitsByTypeResponse,
} from "@/api/claimLimit/getClaimLimitsByType";
import getClaimTypeById, {
  GetClaimTypeByIdResponse,
} from "@/api/claimType/getClaimTypeById";
import PageHeader from "@/app/_components/page-header/page-header";
import client from "@/app/_lib/apolloClient";
import { formatValue } from "@/app/_lib/formatValue";
import { useQuery } from "@apollo/client";
import { Container, DataList, Table } from "@radix-ui/themes";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Page() {
  // Hooks
  const { id } = useParams();

  // Queries
  const { data: claimTypeData } = useQuery<GetClaimTypeByIdResponse>(
    getClaimTypeById,
    {
      variables: { id },
      client,
    }
  );
  const { data: claimLimitData } = useQuery<GetClaimLimitsByTypeResponse>(
    getClaimLimitsByType,
    {
      variables: { type: id },
      client,
    }
  );

  return (
    <Container>
      <PageHeader title="Claim Type" />
      <DataList.Root mt="3">
        <DataList.Item align="center">
          <DataList.Label>Claim Type</DataList.Label>
          <DataList.Value>
            {formatValue(claimTypeData?.claimTypeById.name || "Pending")}
          </DataList.Value>
        </DataList.Item>

        <DataList.Item align="center">
          <DataList.Label>Description</DataList.Label>
          <DataList.Value>
            {formatValue(claimTypeData?.claimTypeById.description)}
          </DataList.Value>
        </DataList.Item>
        <DataList.Item align="center">
          <DataList.Label>Status</DataList.Label>
          <DataList.Value>
            {claimTypeData?.claimTypeById.isActive ? "Active" : "Deactivated"}
          </DataList.Value>
        </DataList.Item>
      </DataList.Root>

      <Container mt="6" />

      <PageHeader title="Claim Limits" isSecondary={true} />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>User</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Maximum Amount (RM)</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Balance (RM) </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Approvers</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {claimLimitData?.claimLimitsByType.map((limit) => (
            <Table.Row key={limit._id}>
              <Table.Cell>
                <Link href={`/users/${limit.user._id}`}>{limit.user.name}</Link>
              </Table.Cell>
              <Table.Cell>{formatValue(limit.maxAmount.toFixed(2))}</Table.Cell>
              <Table.Cell>{formatValue(limit.balance.toFixed(2))}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Container>
  );
}
