"use client";

import getUsers, { GetUsersResponse } from "@/api/user/getUsers";
import Pagination from "@/app/_components/pagination/pagination";
import client from "@/app/_lib/apolloClient";
import { formatValue } from "@/app/_lib/formatValue";
import { useSuspenseQuery } from "@apollo/client";
import { Link, Table } from "@radix-ui/themes";
import { useMemo, useState } from "react";

export default function Page() {
  const { data } = useSuspenseQuery<GetUsersResponse>(getUsers, {
    client,
    fetchPolicy: "network-only",
  });

  // Pagination
  const maxCount = 10;
  const [page, setPage] = useState(0);
  const userList = useMemo(() => {
    return data?.users.slice(page * 10, (page + 1) * 10);
  }, [page, data]);

  // Functions
  const handlePagination = (i: number) => {
    setPage(i);
  };

  return (
    <>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Position</Table.ColumnHeaderCell>
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
              <Table.Cell>{formatValue(user.position)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        count={(data?.users.length ?? 0) / maxCount}
        onPagination={handlePagination}
      />
    </>
  );
}
