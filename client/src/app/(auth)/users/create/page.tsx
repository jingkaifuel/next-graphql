"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Container, Flex, Grid, Text, Select } from "@radix-ui/themes";
import { useMutation } from "@apollo/client";
import { Form } from "@radix-ui/react-form";
import { FieldValues, FormProvider, useForm } from "react-hook-form";

import createUser from "@/api/user/createUser";
import client from "@/app/_lib/apolloClient";
import PageHeader from "@/app/_components/page-header/page-header";
import { POSITIONS_MAP } from "@/app/_lib/constants";
import TextInput from "@/app/_components/text-input/text-input";

export default function Page() {
  // Mutation
  const [trigger, { loading }] = useMutation(createUser, {
    client,
  });

  // Hooks
  const form = useForm();
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
      <FormProvider {...form}>
        <Form onSubmit={form.handleSubmit(onSubmit)}>
          <Grid columns="2" gapX="5" gapY="3" mb="4">
            <TextInput
              label="Name"
              name="name"
              options={{ required: "Please enter your name" }}
              placeholder="Enter name"
            />

            <TextInput
              label="Username"
              name="username"
              options={{ required: "Please enter your username" }}
              placeholder="Enter username"
            />

            <TextInput
              label="Emal"
              name="email"
              options={{ required: "Please enter your username" }}
              placeholder="Enter email"
            />

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

            <TextInput
              label="Password"
              name="password"
              type="password"
              options={{ required: "Please enter your password" }}
              placeholder="Enter password"
            />

            <TextInput
              label="Confirm Password"
              name="passwordConfirm"
              type="password"
              options={{ required: "Please enter your password again" }}
              placeholder="Enter password again"
            />
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
    </Container>
  );
}
