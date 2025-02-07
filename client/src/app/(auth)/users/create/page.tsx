"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Container,
  Flex,
  Grid,
  Text,
  TextField,
  Select,
} from "@radix-ui/themes";
import { useMutation } from "@apollo/client";
import { Form } from "@radix-ui/react-form";
import { FieldValues, useForm } from "react-hook-form";

import createUser from "@/api/user/createUser";
import client from "@/app/_lib/apolloClient";
import PageHeader from "@/app/_components/page-header/page-header";
import { POSITIONS_MAP } from "@/app/_lib/constants";

export default function Page() {
  // Mutation
  const [trigger, { loading }] = useMutation(createUser, {
    client,
  });

  // Hooks
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  // States
  const [formError, setFormError] = useState<string>("");
  const [selectedPosition, setSelectedPosition] = useState<string>("");

  // ------ Functions ------
  const onSubmit = async (val: FieldValues) => {
    setFormError("");

    delete val.passwordConfirm;
    const { data } = await trigger({
      variables: {
        user: {
          ...val,
          position: selectedPosition,
        },
      },
    });

    if (data) {
      router.push("/users");
    }
  };

  return (
    <Container className="wrapper small">
      <PageHeader title="Create New User" />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Grid columns="2" gapX="5" gapY="3" mb="4">
          <Flex gap="2" direction="column">
            <Text>Name</Text>
            <TextField.Root
              {...register("name", { required: "Please enter your name" })}
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
              placeholder="Enter email"
            />
            <Text size="2" color="red">
              {errors["email"]?.message?.toString()}
            </Text>
          </Flex>

          <Flex gap="2" direction="column">
            <Text>Position</Text>
            <Select.Root
              value={selectedPosition}
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

          <Flex gap="2" direction="column">
            <Text>Password</Text>
            <TextField.Root
              {...register("password", {
                required: "Please enter your password",
              })}
              type="password"
              placeholder="Enter password"
            />
            <Text size="2" color="red">
              {errors["password"]?.message?.toString()}
            </Text>
          </Flex>

          <Flex gap="2" direction="column">
            <Text>Confirm Password</Text>
            <TextField.Root
              {...register("passwordConfirm", {
                required: "Please enter your password again",
              })}
              type="password"
              placeholder="Enter password again"
            />
            <Text size="2" color="red">
              {errors["passwordConfirm"]?.message?.toString()}
            </Text>
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
    </Container>
  );
}
