"use client";

import { Box, Button, Container, Flex, Heading, Text } from "@radix-ui/themes";
import styles from "./page.module.css";
import { useMutation } from "@apollo/client";
import client from "@/app/_lib/apolloClient";
import { redirect } from "next/navigation";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { Form } from "@radix-ui/react-form";
import login from "@/api/user/login";
import useAuthStore from "../_store/authStore";
import TextInput from "../_components/text-input/text-input";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  // Mutations
  const [trigger, { loading, error }] = useMutation(login, { client });

  // Hooks
  const form = useForm();

  // Stores
  const { setToken } = useAuthStore();

  // States
  const [isExpired, setIsExpired] = useState(false);

  // Effects
  useEffect(() => {
    try {
      setIsExpired(!!window.sessionStorage.getItem("expired"));
      window.sessionStorage.clear();
    } catch {
      return;
    }
  }, []);

  // Functions
  const onSubmit = async (val: FieldValues) => {
    setIsExpired(false);
    const { data } = await trigger({ variables: val });
    const { token } = data?.login;
    if (!token) return;

    setToken(token);
    window.sessionStorage.setItem("token", token);
    redirect("/");
  };

  return (
    <Container className={styles.page}>
      <Box className={styles.form} p="20px" m="auto">
        <Heading as="h2" mb="4">
          Login
        </Heading>

        <FormProvider {...form}>
          <Form onSubmit={form.handleSubmit(onSubmit)}>
            <Flex gap="3" direction="column" mb="2">
              <TextInput
                label="Username"
                name="username"
                placeholder="Enter username"
              />

              <TextInput
                label="Password"
                name="password"
                type="password"
                placeholder="Enter password"
              />
            </Flex>

            <Container mb="2">
              {error ? (
                <Text size="2" color="red">
                  Invalid username or password. Please try again
                </Text>
              ) : isExpired ? (
                <Text size="2" color="red">
                  Your access token has expired. Please log in again.
                </Text>
              ) : null}
            </Container>

            <Flex justify="between" align="center">
              <Link href="/forgot-password" className={styles.link}>
                <Text size="2">Forgot password?</Text>
              </Link>
              <Button type="submit" disabled={loading}>
                Login
              </Button>
            </Flex>
          </Form>
        </FormProvider>
      </Box>
    </Container>
  );
}
