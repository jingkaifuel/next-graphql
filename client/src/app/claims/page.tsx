"use client";

import cx from "classnames";
import {
  Button,
  Container,
  Flex,
  Heading,
  Link,
  Spinner,
  Table,
  Text,
} from "@radix-ui/themes";
import { useQuery } from "@apollo/client";

import getClaims, { GetClaimsResponse } from "@/api/getClaims";
import client from "@/lib/apolloClient";
import formatDate from "@/lib/formatDate";
import { formatValue } from "@/lib/formatValue";
import { PlusIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

export default function Claims() {
  // Query
  const { data, loading } = useQuery<GetClaimsResponse>(getClaims, {
    client,
    fetchPolicy: "network-only",
  });

  // Hooks
  const router = useRouter();

  // ------ Functions ------
  const handleAddClaim = () => {
    router.push("/claims/add");
  };

  const handleLogout = () => {
    sessionStorage.clear();
  };

  return (
    <Container className={cx("wrapper")}>
      <Flex justify="between" mb="4">
        <Heading as="h1" size="8">
          Claims
        </Heading>

        <Button size="2" onClick={handleAddClaim}>
          <PlusIcon />
          <Text>Add Claim</Text>
        </Button>
      </Flex>

      {loading ? (
        <Spinner size="3" m="auto" />
      ) : (
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
            {data?.getClaims.map((claim) => {
              return (
                <Table.Row key={claim._id}>
                  <Table.RowHeaderCell>
                    {claim.claimType.name}
                  </Table.RowHeaderCell>
                  <Table.Cell>{formatValue(claim.description)}</Table.Cell>
                  <Table.Cell>{formatDate(claim.createdAt)}</Table.Cell>
                  <Table.Cell>{formatDate(claim.updatedAt)}</Table.Cell>
                  <Table.Cell>
                    {formatValue(claim.approvedBy?.username)}
                  </Table.Cell>
                  <Table.Cell>{formatValue(claim.status?.name)}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Root>
      )}

      <Flex mt="auto" justify="end" align="end">
        <Link onClick={handleLogout} href="/">
          Log out
        </Link>
      </Flex>
    </Container>
  );
}
