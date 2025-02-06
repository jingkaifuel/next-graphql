"use client";

import getClaimById, { GetClaimByIdResponse } from "@/api/claims/getClaimById";
import client from "@/app/_lib/apolloClient";
import formatDate from "@/app/_lib/formatDate";
import { formatValue } from "@/app/_lib/formatValue";
import { useSuspenseQuery } from "@apollo/client";
import { DataList } from "@radix-ui/themes";
import { useParams } from "next/navigation";

export default function ClaimDetail() {
  const { id } = useParams();

  const { data } = useSuspenseQuery<GetClaimByIdResponse>(getClaimById, {
    client,
    variables: { id },
    fetchPolicy: "network-only",
  });

  return (
    <DataList.Root mt="3">
      <DataList.Item align="center">
        <DataList.Label>Status</DataList.Label>
        <DataList.Value>
          {formatValue(data?.claimById.status?.name || "Pending")}
        </DataList.Value>
      </DataList.Item>

      <DataList.Item align="center">
        <DataList.Label>Claim Type</DataList.Label>
        <DataList.Value>
          {formatValue(data?.claimById.claimType.name)}
        </DataList.Value>
      </DataList.Item>
      <DataList.Item align="center">
        <DataList.Label>Description</DataList.Label>
        <DataList.Value>
          {formatValue(data?.claimById.description)}
        </DataList.Value>
      </DataList.Item>
      <DataList.Item align="center">
        <DataList.Label>Created At</DataList.Label>
        <DataList.Value>{formatDate(data?.claimById.createdAt)}</DataList.Value>
      </DataList.Item>
      <DataList.Item align="center">
        <DataList.Label>Amount</DataList.Label>
        <DataList.Value>
          {formatValue(data?.claimById.amount.toFixed(2))}
        </DataList.Value>
      </DataList.Item>
      <DataList.Item align="center">
        <DataList.Label>Approved by</DataList.Label>
        <DataList.Value>
          {formatValue(data?.claimById.approvedBy?.username)}
        </DataList.Value>
      </DataList.Item>
      <DataList.Item align="center">
        <DataList.Label>Remark</DataList.Label>
        <DataList.Value>{formatValue(data?.claimById.remark)}</DataList.Value>
      </DataList.Item>
    </DataList.Root>
  );
}
