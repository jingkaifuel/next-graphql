"use client";

import { GetUserByIdResponse } from "@/api/user/getUserById";
import updateUser from "@/api/user/updateUser";
import TextInput from "@/app/_components/text-input/text-input";
import client from "@/app/_lib/apolloClient";
import { POSITIONS_MAP } from "@/app/_lib/constants";
import { useMutation } from "@apollo/client";
import { Form } from "@radix-ui/react-form";
import { Button, Flex, Grid, Select, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";

interface Props {
  user: GetUserByIdResponse;
}

export default function DetailsForm({ user }: Props) {
  // Mutation
  const [trigger, { loading }] = useMutation(updateUser, {
    client,
  });

  // State
  const [selectedPosition, setSelectedPosition] = useState<string>("");

  // Hooks
  const router = useRouter();
  const form = useForm();

  // Functions
  const onSubmit = async (val: FieldValues) => {
    const { data } = await trigger({
      variables: {
        id: user.userById._id,
        user: {
          ...val,
          position: selectedPosition || user.userById.position || "",
        },
      },
    });

    if (data) {
      router.push("/users");
    }
  };

  return (
    <FormProvider {...form}>
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <Grid columns="2" gapX="5" gapY="3" mb="4">
          <TextInput
            label="Name"
            name="name"
            options={{ required: "Please enter your name" }}
            placeholder="Enter name"
            defaultValue={user.userById.name || ""}
          />

          <TextInput
            label="Username"
            name="username"
            options={{ required: "Please enter your username" }}
            defaultValue={user.userById.username || ""}
            placeholder="Enter username"
            disabled={true}
          />

          <TextInput
            label="Email"
            name="email"
            options={{ required: "Please enter your email address" }}
            defaultValue={user.userById.email || ""}
            placeholder="Enter email"
            type="email"
          />

          <Flex gap="2" direction="column">
            <Text>Position</Text>
            <Select.Root
              value={selectedPosition || user.userById.position || ""}
              onValueChange={setSelectedPosition}
            >
              <Select.Trigger placeholder="Select a claim type" />
              <Select.Content>
                {Object.keys(POSITIONS_MAP).map((key) => {
                  return (
                    <Select.Item key={key} value={key}>
                      {POSITIONS_MAP[key]}
                    </Select.Item>
                  );
                })}
              </Select.Content>
            </Select.Root>
          </Flex>
        </Grid>

        <Flex justify="end">
          <Button type="submit" disabled={loading} loading={loading}>
            Submit
          </Button>
        </Flex>
      </Form>
    </FormProvider>
  );
}
