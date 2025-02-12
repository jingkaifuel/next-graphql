"use client";

import getClaimTypes, {
  GetClaimTypesResponse,
} from "@/api/claimType/getClaimTypes";
import PageHeader from "@/app/_components/page-header/page-header";
import client from "@/app/_lib/apolloClient";
import { formatValue } from "@/app/_lib/formatValue";
import { useSuspenseQuery } from "@apollo/client";
import { Pencil2Icon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import {
  Button,
  Container,
  Flex,
  IconButton,
  Table,
  Text,
} from "@radix-ui/themes";
import DeleteDialog from "./deleteDialog";
import getClaimStatus, {
  GetClaimStatusesResponse,
} from "@/api/claimStatus/getClaimStatus";
import ClaimTypeDialog from "./claimTypeDialog";
import ClaimStatusDialog from "./claimStatusDialog";
import Link from "next/link";

export default function Page() {
  // Queries
  const { data: claimTypeData, refetch: refetchClaimType } =
    useSuspenseQuery<GetClaimTypesResponse>(getClaimTypes, {
      client,
    });
  const { data: claimStatusData, refetch: refetchClaimStatus } =
    useSuspenseQuery<GetClaimStatusesResponse>(getClaimStatus, {
      client,
    });

  return (
    <Container>
      <PageHeader title="Claim Type" hideBack={true}>
        <ClaimTypeDialog onComplete={refetchClaimType}>
          <Button size="2">
            <PlusIcon />
            <Text>Add Claim Type</Text>
          </Button>
        </ClaimTypeDialog>
      </PageHeader>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell width="140px">
              Claim Type
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell width="120px">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell align="center" width="72px">
              Action
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {claimTypeData?.claimTypes.map((type) => (
            <Table.Row key={type._id}>
              <Table.Cell>
                <Link href={`/manage/claim-type/${type._id}`}>{type.name}</Link>
              </Table.Cell>
              <Table.Cell style={{ textWrap: "wrap" }}>
                {formatValue(type.description)}
              </Table.Cell>
              <Table.Cell>
                {type.isActive ? "Active" : "Deactivated"}
              </Table.Cell>
              <Table.Cell>
                <Flex justify="center" gap="3">
                  <ClaimTypeDialog data={type}>
                    <IconButton radius="full" size="2" variant="ghost">
                      <Pencil2Icon />
                    </IconButton>
                  </ClaimTypeDialog>

                  <DeleteDialog
                    type="claimType"
                    data={type}
                    onComplete={refetchClaimType}
                  >
                    <IconButton
                      radius="full"
                      size="2"
                      variant="ghost"
                      disabled={!type.isActive}
                      color="red"
                    >
                      <TrashIcon />
                    </IconButton>
                  </DeleteDialog>
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <Container mt="6" />

      <PageHeader title="Claim Status" isSecondary={true}>
        <ClaimStatusDialog onComplete={refetchClaimStatus}>
          <Button size="2">
            <PlusIcon />
            <Text>Add Claim Status</Text>
          </Button>
        </ClaimStatusDialog>
      </PageHeader>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell width="140px">
              Claim Type
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell width="120px">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell align="center" width="72px">
              Action
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {claimStatusData?.claimStatuses.map((status) => (
            <Table.Row key={status._id}>
              <Table.Cell>{status.name}</Table.Cell>
              <Table.Cell>{formatValue(status.description)}</Table.Cell>
              <Table.Cell>
                {status.isActive ? "Active" : "Deactivated"}
              </Table.Cell>
              <Table.Cell>
                <Flex justify="center" gap="3">
                  <ClaimStatusDialog data={status}>
                    <IconButton radius="full" size="2" variant="ghost">
                      <Pencil2Icon />
                    </IconButton>
                  </ClaimStatusDialog>

                  <DeleteDialog
                    type="claimType"
                    data={status}
                    onComplete={refetchClaimStatus}
                  >
                    <IconButton
                      radius="full"
                      size="2"
                      variant="ghost"
                      disabled={!status.isActive}
                      color="red"
                    >
                      <TrashIcon />
                    </IconButton>
                  </DeleteDialog>
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Container>
  );
}
