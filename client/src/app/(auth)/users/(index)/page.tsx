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
import { useSuspenseQuery } from "@apollo/client";

import getUsers, { GetUsersResponse } from "@/api/user/getUsers";
import PageHeader from "@/app/_components/page-header/page-header";
import Searchbar from "@/app/_components/searchnar/searchbar";
import client from "@/app/_lib/apolloClient";
import { formatValue } from "@/app/_lib/formatValue";
import Pagination from "@/app/_components/pagination/pagination";
import { POSITIONS_MAP } from "@/app/_lib/constants";
import Link from "next/link";

export default function Claims() {
  // Query
  const { data } = useSuspenseQuery<GetUsersResponse>(getUsers, {
    client,
    fetchPolicy: "network-only",
  });

  // Filtering
  const [search, setSearch] = useState("");
  const filteredData = useMemo(() => {
    if (!search) return data.users;
    const searchStr = search.toLowerCase();
    return data.users.filter((user) => {
      return (
        user.name?.toLowerCase().includes(searchStr) ||
        user.position?.toLowerCase().includes(searchStr) ||
        user.email?.toLowerCase().includes(searchStr)
      );
    });
  }, [search, data]);

  // Pagination
  const maxCount = 10;
  const [page, setPage] = useState(0);
  const userList = useMemo(() => {
    return filteredData.slice(page * 10, (page + 1) * 10);
  }, [page, filteredData]);

  // Functions
  const handlePagination = (i: number) => {
    setPage(i);
  };

  return (
    <Container className="wrapper">
      <PageHeader title="Users" showBack={false} />
      <Flex justify="between" mb="5">
        <Searchbar placeholder="Search users..." onChange={setSearch} />

        <Link href="/users/create">
          <Button size="2">
            <PlusIcon />
            <Text>Create User</Text>
          </Button>
        </Link>
      </Flex>

      <Suspense fallback={<Spinner size="3" m="auto" />}>
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Position</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {userList.map((user) => (
              <Table.Row key={user._id}>
                <Table.Cell>
                  <Link href={`/users/${user._id}`}>
                    {formatValue(user.name)}
                  </Link>
                </Table.Cell>
                <Table.Cell>{formatValue(user.email)}</Table.Cell>
                <Table.Cell>
                  {POSITIONS_MAP[user.position || ""] ||
                    formatValue(user.position)}
                </Table.Cell>
                <Table.Cell>
                  {user.isActive ? "Active" : "Deactivated"}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
        <Pagination
          count={(data?.users.length ?? 0) / maxCount}
          onPagination={handlePagination}
        />
      </Suspense>
    </Container>
  );
}
