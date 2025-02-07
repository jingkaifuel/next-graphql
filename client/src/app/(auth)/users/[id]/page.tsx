"use client";

import getUserById, { GetUserByIdResponse } from "@/api/user/getUserById";
import updateUser from "@/api/user/updateUser";
import PageHeader from "@/app/_components/page-header/page-header";
import client from "@/app/_lib/apolloClient";
import { POSITIONS_MAP } from "@/app/_lib/constants";
import { formatValue } from "@/app/_lib/formatValue";
import useAuthStore from "@/app/_store/authStore";
import { useMutation, useSuspenseQuery } from "@apollo/client";
import { Pencil2Icon } from "@radix-ui/react-icons";
import {
  AlertDialog,
  Button,
  Container,
  DataList,
  Flex,
  Spinner,
  Text,
} from "@radix-ui/themes";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Suspense } from "react";

export default function Page() {
  const { id } = useParams();
  const { user } = useAuthStore();
  const router = useRouter();

  // Queries
  const { data } = useSuspenseQuery<GetUserByIdResponse>(getUserById, {
    variables: { id },
    client,
    fetchPolicy: "network-only",
  });

  // Mutation
  const [trigger, { loading }] = useMutation(updateUser, {
    client,
  });

  const handleDeactivate = async () => {
    const { data } = await trigger({
      variables: {
        id,
        user: { isActive: false },
      },
    });

    if (data) {
      router.push("/users");
    }
  };

  return (
    <Container className="wrapper small">
      <PageHeader title="User Details">
        <Link href={`/users/edit/${id}`}>
          <Button size="2">
            <Pencil2Icon />
            <Text>Edit</Text>
          </Button>
        </Link>

        {id != user?._id ? (
          <AlertDialog.Root>
            <AlertDialog.Trigger>
              <Button
                size="2"
                variant="outline"
                color="red"
                disabled={loading || !data.userById?.isActive}
              >
                <Pencil2Icon />
                <Text>
                  {data.userById?.isActive ? "Deactivate" : "Deactivated"}
                </Text>
              </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content maxWidth="450px">
              <AlertDialog.Title>Deactivate User</AlertDialog.Title>
              <AlertDialog.Description size="2">
                Are you sure you want to deactivate this user? <br />
                The username cannot be reused unless reactivated by a technical
                administrator.
              </AlertDialog.Description>

              <Flex gap="3" mt="4" justify="end">
                <AlertDialog.Cancel>
                  <Button variant="soft" color="gray">
                    Cancel
                  </Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
                  <Button
                    variant="solid"
                    color="red"
                    onClick={handleDeactivate}
                  >
                    Deactivate
                  </Button>
                </AlertDialog.Action>
              </Flex>
            </AlertDialog.Content>
          </AlertDialog.Root>
        ) : null}
      </PageHeader>

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
              {POSITIONS_MAP[data.userById.position || ""] ||
                formatValue(data.userById.position)}
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>
      </Suspense>
    </Container>
  );
}
