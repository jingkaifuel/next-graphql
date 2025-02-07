"use client";

import getClaimLimits, {
  GetClaimLimitResponse,
} from "@/api/claimLimit/getClaimLimits";
import getClaimById, { GetClaimByIdResponse } from "@/api/claims/getClaimById";
import updateClaim from "@/api/claims/updateClaim";
import client from "@/app/_lib/apolloClient";
import { formatValue } from "@/app/_lib/formatValue";
import { useMutation, useSuspenseQuery } from "@apollo/client";
import { Form } from "@radix-ui/react-form";
import {
  Button,
  Container,
  DataList,
  Flex,
  Grid,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { useParams, useRouter } from "next/navigation";
import { FocusEvent, useMemo, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

export default function ClaimDetail() {
  const { id } = useParams();

  // Query
  const { data: claimData } = useSuspenseQuery<GetClaimByIdResponse>(
    getClaimById,
    { client, variables: { id } }
  );
  const { data: claimLimitsData } = useSuspenseQuery<GetClaimLimitResponse>(
    getClaimLimits,
    { client }
  );

  // Mutation
  const [trigger, { loading }] = useMutation(updateClaim, {
    client,
  });

  // Hooks
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  // States
  const [formError, setFormError] = useState<string>("");
  const claimLimit = useMemo(() => {
    const data = claimLimitsData.claimLimitsByUser.findLast(
      (x) => x.claimType._id == claimData.claimById.claimType._id
    );
    const balance = (data?.balance ?? 0) + claimData.claimById.amount;
    return { ...data, balance };
  }, [claimData, claimLimitsData]);

  // Functions
  const handleAmountBlur = (e: FocusEvent<HTMLInputElement>) => {
    e.target.value = parseFloat(e.target.value).toFixed(2);
    e.target.blur();
  };

  const onSubmit = async (val: FieldValues) => {
    setFormError("");
    if (claimLimit?.balance && val.amount > claimLimit?.balance) {
      setFormError("Amount exceeds your claim balance.");
      return;
    }

    const { data } = await trigger({
      variables: {
        id,
        data: {
          ...val,
          claimType: claimData.claimById.claimType._id,
          amount: parseFloat(val.amount),
        },
      },
    });

    if (data) router.back();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Grid columns="2" gapX="5" gapY="3" mb="4">
        <Flex gap="2" direction="column">
          <Text>Claim Type</Text>
          <Text size="2">{claimData.claimById.claimType.name}</Text>
        </Flex>

        <Container
          mb="6"
          style={{ border: "1px solid var(--gray-6", borderRadius: "8px" }}
          px="4"
          py="3"
        >
          <Text>Claim Limit</Text>
          <DataList.Root mt="3">
            <DataList.Item align="center">
              <DataList.Label>Claim Type</DataList.Label>
              <DataList.Value>
                {formatValue(claimLimit?.claimType?.name)}
              </DataList.Value>
            </DataList.Item>
            <DataList.Item align="center">
              <DataList.Label>Maximum Amount (RM)</DataList.Label>
              <DataList.Value>
                {formatValue(claimLimit?.maxAmount?.toFixed(2))}
              </DataList.Value>
            </DataList.Item>
            <DataList.Item align="center">
              <DataList.Label>Balance (RM)</DataList.Label>
              <DataList.Value>
                {formatValue(claimLimit?.balance.toFixed(2))}
              </DataList.Value>
            </DataList.Item>
            <DataList.Item align="center">
              <DataList.Label>Approvers</DataList.Label>
              <DataList.Value>
                {formatValue(
                  claimLimit?.approver
                    ?.map((user) => user?.username)
                    .join(", ") || undefined
                )}
              </DataList.Value>
            </DataList.Item>
          </DataList.Root>
        </Container>

        <Flex gap="2" direction="column">
          <Text>Description</Text>
          <TextField.Root
            {...register("description")}
            defaultValue={claimData.claimById.description}
            placeholder="Enter description"
          />
        </Flex>

        <Flex gap="2" direction="column">
          <Text>Amount</Text>
          <TextField.Root
            {...register("amount")}
            defaultValue={claimData.claimById.amount}
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
          <TextArea
            {...register("remark")}
            defaultValue={claimData.claimById.remark || ""}
            placeholder="Enter remark"
          />
        </Flex>
      </Grid>

      <Container mb="2">
        {!formError || (
          <Text size="2" color="red">
            {formError}
          </Text>
        )}
      </Container>

      <Flex justify="end">
        <Button type="submit" disabled={loading} loading={loading}>
          Submit
        </Button>
      </Flex>
    </Form>
  );
}
