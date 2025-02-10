"use client";

import getClaimLimits, {
  GetClaimLimitResponse,
} from "@/api/claimLimit/getClaimLimits";
import getUserById, { GetUserByIdResponse } from "@/api/user/getUserById";
import updateUser from "@/api/user/updateUser";
import PageHeader from "@/app/_components/page-header/page-header";
import client from "@/app/_lib/apolloClient";
import { POSITIONS_MAP } from "@/app/_lib/constants";
import { formatValue } from "@/app/_lib/formatValue";
import useAuthStore from "@/app/_store/authStore";
import { useMutation, useSuspenseQuery } from "@apollo/client";
import { Pencil2Icon, PlusIcon } from "@radix-ui/react-icons";
import {
  AlertDialog,
  Button,
  Container,
  DataList,
  Flex,
  Grid,
  Heading,
  Text,
} from "@radix-ui/themes";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import styles from "./style.module.css";

export default function Page() {
  const { id } = useParams();
  const { user } = useAuthStore();
  const router = useRouter();

  // Queries
  const { data: userData } = useSuspenseQuery<GetUserByIdResponse>(
    getUserById,
    {
      variables: { id },
      client,
      fetchPolicy: "network-only",
    }
  );

  const { data: limitData } = useSuspenseQuery<GetClaimLimitResponse>(
    getClaimLimits,
    {
      variables: { id },
      client,
      fetchPolicy: "network-only",
    }
  );

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
                disabled={loading || !userData.userById?.isActive}
              >
                <Pencil2Icon />
                <Text>
                  {userData.userById?.isActive ? "Deactivate" : "Deactivated"}
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
      <DataList.Root mt="3">
        <DataList.Item align="center">
          <DataList.Label>Name</DataList.Label>
          <DataList.Value>{formatValue(userData.userById.name)}</DataList.Value>
        </DataList.Item>
        <DataList.Item align="center">
          <DataList.Label>Email</DataList.Label>
          <DataList.Value>
            {formatValue(userData.userById.email)}
          </DataList.Value>
        </DataList.Item>
        <DataList.Item align="center">
          <DataList.Label>Position</DataList.Label>
          <DataList.Value>
            {POSITIONS_MAP[userData.userById.position || ""] ||
              formatValue(userData.userById.position)}
          </DataList.Value>
        </DataList.Item>
      </DataList.Root>

      <Container mt="6"></Container>

      <Flex justify="between">
        <Heading size="5" mb="4">
          Claim Limits
        </Heading>
        <Button>
          <PlusIcon />
          <Text>Add</Text>
        </Button>
      </Flex>
      <Grid columns="2" gapX="3" gapY="2">
        {limitData.claimLimitsByUser.map((limit) => {
          return (
            <Container
              key={limit._id}
              style={{ border: "1px solid var(--gray-6", borderRadius: "8px" }}
              px="4"
              py="3"
              className={styles.claimLimit}
            >
              <DataList.Root>
                <DataList.Item align="center">
                  <DataList.Label>Claim Type</DataList.Label>
                  <DataList.Value>
                    {formatValue(limit?.claimType.name)}
                  </DataList.Value>
                </DataList.Item>
                <DataList.Item align="center">
                  <DataList.Label>Maximum Amount (RM)</DataList.Label>
                  <DataList.Value>
                    {formatValue(limit?.maxAmount.toFixed(2))}
                  </DataList.Value>
                </DataList.Item>
                <DataList.Item align="center">
                  <DataList.Label>Balance (RM)</DataList.Label>
                  <DataList.Value>
                    {formatValue(limit?.balance.toFixed(2))}
                  </DataList.Value>
                </DataList.Item>
                <DataList.Item align="center">
                  <DataList.Label>Approvers</DataList.Label>
                  <DataList.Value>
                    {formatValue(
                      limit?.approver
                        ?.map((user) => user?.username)
                        .join(", ") || undefined
                    )}
                  </DataList.Value>
                </DataList.Item>
              </DataList.Root>
              <Flex mt="2" justify="end">
                <Button>
                  <Pencil2Icon />
                  <Text>Edit</Text>
                </Button>
              </Flex>
            </Container>
          );
        })}
      </Grid>
    </Container>
  );
}
