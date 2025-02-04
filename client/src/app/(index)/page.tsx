"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
  Link,
  Text,
  TextField,
} from "@radix-ui/themes";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import client from "@/app/_lib/apolloClient";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { Form } from "@radix-ui/react-form";
import login from "@/api/user/login";

export default function Home() {
  // Mutations
  const [trigger, { data, loading, error }] = useMutation(login, { client });

  // Hooks
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  // States
  const [passwordVisible, setPasswordVisible] = useState(false);

  // ------ Effects ------
  useEffect(() => {
    if (sessionStorage.getItem("token")) router.replace("/claims");
  }, [router]);

  useEffect(() => {
    if (data?.login) {
      sessionStorage.setItem("token", data.login.token);
      sessionStorage.setItem("user", data.login.user);
      router.replace("/claims");
    }
  }, [data, router]);

  // ------ Functions ------
  const onSubmit = (data: FieldValues) => {
    trigger({ variables: data });
  };

  const handlePasswordToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <Container className={styles.page}>
      <Box className={styles.form} p="20px" m="auto">
        <Heading as="h2" mb="4">
          Login
        </Heading>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Flex gap="3" direction="column" mb="2">
            <Flex gap="2" direction="column">
              <Text>Username</Text>
              <TextField.Root
                placeholder="Enter username"
                {...register("username")}
              />
            </Flex>
            <Flex gap="2" direction="column">
              <Text>Password</Text>
              <TextField.Root
                placeholder="Enter password"
                type={passwordVisible ? "text" : "password"}
                {...register("password")}
              >
                <TextField.Slot></TextField.Slot>
                <TextField.Slot>
                  <IconButton
                    size="1"
                    variant="ghost"
                    onClick={handlePasswordToggle}
                  >
                    {passwordVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
                  </IconButton>
                </TextField.Slot>
              </TextField.Root>
            </Flex>
          </Flex>

          <Container mb="2">
            {!error || (
              <Text size="2" color="red">
                Invalid username or password. Please try again
              </Text>
            )}
          </Container>

          <Flex justify="between" align="center">
            <Link size="2" href="/forgot-password">
              Forgot password?
            </Link>
            <Button type="submit" disabled={loading}>
              Login
            </Button>
          </Flex>
        </Form>
      </Box>
    </Container>
  );
}
