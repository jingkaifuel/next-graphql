"use client";

import { GetUserByIdResponse } from "@/api/user/getUserById";
import updateUser from "@/api/user/updateUser";
import client from "@/app/_lib/apolloClient";
import { POSITIONS_MAP } from "@/app/_lib/constants";
import { useMutation } from "@apollo/client";
import { Form } from "@radix-ui/react-form";
import { Button, Flex, Grid, Select, Text, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Grid columns="2" gapX="5" gapY="3" mb="4">
        <Flex gap="2" direction="column">
          <Text>Name</Text>
          <TextField.Root
            {...register("name", { required: "Please enter your name" })}
            defaultValue={user.userById.name || ""}
            placeholder="Enter name"
          />
          <Text size="2" color="red">
            {errors["name"]?.message?.toString()}
          </Text>
        </Flex>

        <Flex gap="2" direction="column">
          <Text>Username</Text>
          <TextField.Root
            {...register("username", {
              required: "Please enter your username",
            })}
            disabled={true}
            defaultValue={user.userById.username || ""}
            placeholder="Enter username"
          />
          <Text size="2" color="red">
            {errors["username"]?.message?.toString()}
          </Text>
        </Flex>

        <Flex gap="2" direction="column">
          <Text>Email</Text>
          <TextField.Root
            {...register("email", {
              required: "Please enter your email address",
            })}
            type="email"
            defaultValue={user.userById.email || ""}
            placeholder="Enter email"
          />
          <Text size="2" color="red">
            {errors["email"]?.message?.toString()}
          </Text>
        </Flex>

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
  );
}
