"use client";

import { FocusEvent, useEffect, useState } from "react";
import cx from "classnames";
import { useRouter } from "next/navigation";
import {
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  IconButton,
  Select,
  Spinner,
  Table,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useMutation, useQuery } from "@apollo/client";

import client from "@/lib/apolloClient";
import getClaimTypes, { GetClaimTypesResponse } from "@/api/getClaimTypes";
import getClaimLimits, { GetClaimLimitResponse } from "@/api/getClaimLimits";

import { formatValue } from "@/lib/formatValue";
import { Form } from "@radix-ui/react-form";
import { FieldValues, useForm } from "react-hook-form";
import createClaim from "@/api/createClaim";

export default function AddClaimPopup() {
  // Query
  const { data: claimTypesData, loading: claimTypesLoading } =
    useQuery<GetClaimTypesResponse>(getClaimTypes, { client });
  const { data: claimLimitsData, loading: claimLimitsLoading } =
    useQuery<GetClaimLimitResponse>(getClaimLimits, { client });

  // Mutation
  const [trigger, { data, loading }] = useMutation(createClaim, {
    client,
  });

  // Hooks
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  // States
  const [selectedClaimType, setSelectedClaimType] = useState<string>("");

  // Effects
  useEffect(() => {
    if (!loading && data) {
      router.back();
    }
  }, [loading, data, router]);

  // ------ Functions ------
  const handleClose = () => {
    router.back();
  };

  const handleAmountBlur = (e: FocusEvent<HTMLInputElement>) => {
    e.target.value = parseFloat(e.target.value).toFixed(2);
    e.target.blur();
  };

  const onSubmit = (val: FieldValues) => {
    trigger({
      variables: {
        data: {
          ...val,
          claimType: selectedClaimType,
          amount: parseFloat(val.amount),
        },
      },
    });
  };

  return (
    <Container className={cx("wrapper", "small")}>
      <Flex justify="between" mb="4">
        <Heading as="h1" size="8">
          Add Claims
        </Heading>

        <IconButton size="2" onClick={handleClose} radius="full">
          <Cross1Icon />
        </IconButton>
      </Flex>

      {claimLimitsLoading ? (
        <Spinner m="auto" />
      ) : (
        <Table.Root variant="surface" mb="6">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Claim Type</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>
                Maximum Amount (RM)
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Approvers</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {claimLimitsData?.getClaimLimitByUser.map((claimLimit) => {
              return (
                <Table.Row key={claimLimit._id}>
                  <Table.Cell>
                    {formatValue(claimLimit.claimType.name)}
                  </Table.Cell>
                  <Table.Cell>
                    {formatValue(claimLimit.maxAmount?.toFixed(2))}
                  </Table.Cell>
                  <Table.Cell>
                    {formatValue(
                      claimLimit.approver
                        ?.map((user) => user?.username)
                        .join(", ") || undefined
                    )}
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Root>
      )}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Grid columns="2" gapX="5" gapY="3" mb="4">
          <Flex gap="2" direction="column">
            <Text>Claim Type</Text>
            <Select.Root
              value={selectedClaimType}
              onValueChange={setSelectedClaimType}
            >
              <Select.Trigger placeholder="Select a claim type" />
              <Select.Content>
                {claimTypesLoading ||
                  claimTypesData?.getClaimTypes.map((claimType) => {
                    return (
                      <Select.Item
                        key={claimType._id}
                        value={claimType._id}
                        disabled={!claimType.isActive}
                      >
                        {claimType.name}
                      </Select.Item>
                    );
                  })}
              </Select.Content>
            </Select.Root>
          </Flex>

          <Container />

          <Flex gap="2" direction="column">
            <Text>Description</Text>
            <TextField.Root
              {...register("description")}
              placeholder="Enter description"
            />
          </Flex>

          <Flex gap="2" direction="column">
            <Text>Amount</Text>
            <TextField.Root
              {...register("amount")}
              placeholder="Enter amount"
              type="number"
              step={0.01}
              inputMode="decimal"
              onBlur={handleAmountBlur}
            >
              <TextField.Slot>RM</TextField.Slot>
            </TextField.Root>
          </Flex>

          <Flex gap="2" direction="column" gridColumn="1 / span 2">
            <Text>Remark</Text>
            <TextArea {...register("remark")} placeholder="Enter remark" />
          </Flex>
        </Grid>

        <Flex justify="end">
          <Button type="submit" disabled={loading} loading={loading}>
            Submit
          </Button>
        </Flex>
      </Form>
    </Container>
  );
}
