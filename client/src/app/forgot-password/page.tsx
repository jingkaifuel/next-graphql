"use client";

import { Box, Button, Container, Flex, Heading, Text } from "@radix-ui/themes";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import client from "@/app/_lib/apolloClient";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { Form } from "@radix-ui/react-form";
import resetPassword from "@/api/user/resetPassword";
import { redirect } from "next/navigation";
import TextInput from "../_components/text-input/text-input";

export default function Home() {
  // Mutations
  const [trigger, { loading, error }] = useMutation(resetPassword, {
    client,
  });
  const [formError, setFormError] = useState("");

  // Hooks
  const form = useForm();

  // Effects
  useEffect(() => {
    setFormError(error?.message || "");
  }, [error]);

  // ------ Functions ------
  const onSubmit = async (val: FieldValues) => {
    setFormError("");
    if (!val.email) {
      setFormError("Please enter your email address.");
      return;
    } else if (!val.password) {
      setFormError("Please enter your new password.");
      return;
    } else if (val.password != val.passwordConfirm) {
      setFormError("Passwords do not match. Please try again.");
      return;
    }

    const { data } = await trigger({ variables: val });
    if (data?.resetPassword) redirect("/");
    setFormError("Account not found. Please check your details and try again.");
  };

  return (
    <Container className={styles.page}>
      <Box className={styles.form} p="20px" m="auto">
        <Heading as="h2" mb="4">
          Forgot Password
        </Heading>

        <FormProvider {...form}>
          <Form onSubmit={form.handleSubmit(onSubmit)}>
            <Flex gap="3" direction="column" mb="2">
              <TextInput label="Email" name="email" placeholder="Enter email" />
              <TextInput
                label="Password"
                name="password"
                type="password"
                placeholder="Enter password"
              />
              <TextInput
                label="Confirm Password"
                name="passwordConfirm"
                type="password"
                placeholder="Enter password again"
              />
            </Flex>

            <Container mb="2">
              {!formError || (
                <Text size="2" color="red">
                  {formError}
                </Text>
              )}
            </Container>

            <Flex justify="end" align="center">
              <Button type="submit" disabled={loading}>
                Reset Password
              </Button>
            </Flex>
          </Form>
        </FormProvider>
      </Box>
    </Container>
  );
}
