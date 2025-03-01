"use client";

import { FocusEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Container,
  DataList,
  Flex,
  Grid,
  Select,
  Text,
} from "@radix-ui/themes";
import { useMutation, useSuspenseQuery } from "@apollo/client";

import client from "@/app/_lib/apolloClient";
import getClaimLimits, {
  GetClaimLimitResponse,
} from "@/api/claimLimit/getClaimLimits";

import { formatValue } from "@/app/_lib/formatValue";
import { Form } from "@radix-ui/react-form";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import createClaim from "@/api/claims/createClaim";
import TextInput from "@/app/_components/text-input/text-input";

export default function AddClaim() {
  // Query
  const { data: claimLimitsData } = useSuspenseQuery<GetClaimLimitResponse>(
    getClaimLimits,
    {
      client,
      fetchPolicy: "network-only",
    }
  );

  // Mutation
  const [trigger, { loading }] = useMutation(createClaim, {
    client,
  });

  // Hooks
  const form = useForm();
  const router = useRouter();

  // States
  const [selectedClaimType, setSelectedClaimType] = useState<string>("");
  const [formError, setFormError] = useState<string>("");
  const claimLimitDetails = useMemo(() => {
    return claimLimitsData?.claimLimitsByUser.findLast(
      (x) => x.claimType._id === selectedClaimType
    );
  }, [selectedClaimType, claimLimitsData?.claimLimitsByUser]);

  // ------ Functions ------
  const handleAmountBlur = (e: FocusEvent<HTMLInputElement>) => {
    e.target.value = parseFloat(e.target.value).toFixed(2);
    e.target.blur();
  };

  const onSubmit = async (val: FieldValues) => {
    setFormError("");
    if (claimLimitDetails?.balance && val.amount > claimLimitDetails?.balance) {
      setFormError("Amount exceeds your claim balance.");
      return;
    }

    const { data } = await trigger({
      variables: {
        data: {
          ...val,
          claimType: selectedClaimType,
          amount: parseFloat(val.amount),
        },
      },
    });

    if (data) router.back();
  };

  return (
    <FormProvider {...form}>
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <Grid columns="2" gapX="5" gapY="3" mb="4">
          <Flex gap="2" direction="column">
            <Text weight="bold">Claim Type</Text>
            <Select.Root
              value={selectedClaimType}
              onValueChange={setSelectedClaimType}
            >
              <Select.Trigger placeholder="Select a claim type" />
              <Select.Content>
                {claimLimitsData?.claimLimitsByUser.map((claimLimit) => {
                  return (
                    <Select.Item
                      key={claimLimit.claimType._id}
                      value={claimLimit.claimType._id}
                    >
                      {claimLimit.claimType.name}
                    </Select.Item>
                  );
                })}
              </Select.Content>
            </Select.Root>
          </Flex>

          <Container
            mb="6"
            style={{ border: "1px solid var(--gray-6", borderRadius: "8px" }}
            px="4"
            py="3"
          >
            <Text weight="bold">Claim Limit</Text>
            <DataList.Root mt="3">
              <DataList.Item align="center">
                <DataList.Label>Claim Type</DataList.Label>
                <DataList.Value>
                  {formatValue(claimLimitDetails?.claimType.name)}
                </DataList.Value>
              </DataList.Item>
              <DataList.Item align="center">
                <DataList.Label>Maximum Amount (RM)</DataList.Label>
                <DataList.Value>
                  {formatValue(claimLimitDetails?.maxAmount.toFixed(2))}
                </DataList.Value>
              </DataList.Item>
              <DataList.Item align="center">
                <DataList.Label>Balance (RM)</DataList.Label>
                <DataList.Value>
                  {formatValue(claimLimitDetails?.balance.toFixed(2))}
                </DataList.Value>
              </DataList.Item>
              <DataList.Item align="center">
                <DataList.Label>Approvers</DataList.Label>
                <DataList.Value>
                  {formatValue(
                    claimLimitDetails?.approver
                      ?.map((user) => user?.username)
                      .join(", ") || undefined
                  )}
                </DataList.Value>
              </DataList.Item>
            </DataList.Root>
          </Container>

          <TextInput
            label="Description"
            name="description"
            placeholder="Enter description"
          />

          <TextInput
            label="Description"
            name="description"
            placeholder="Enter description"
          />

          <TextInput
            label="Amount"
            name="description"
            placeholder="Enter description"
            type="amount"
            step={0.01}
            inputMode="decimal"
            onBlur={handleAmountBlur}
          />

          <Container style={{ gridColumn: "1 / span 2" }}>
            <TextInput
              label="Remark"
              name="remark"
              placeholder="Enter remark"
              type="textarea"
            />
          </Container>
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
    </FormProvider>
  );
}
