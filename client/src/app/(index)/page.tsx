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
import { gql, useMutation } from "@apollo/client";
import client from "@/lib/apolloClient";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { Form } from "@radix-ui/react-form";

const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export default function Home() {
  // Mutations
  const [trigger, { data, loading, error }] = useMutation(LOGIN, { client });

  // Hooks
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  // States
  const [passwordVisible, setPasswordVisible] = useState(false);

  // ------ Effects ------
  useEffect(() => {
    if (sessionStorage.getItem("token")) router.push("/claims");
  }, [router]);

  useEffect(() => {
    if (data?.login) {
      sessionStorage.setItem("token", data.login.token);
      sessionStorage.setItem("user", data.login.user);
      router.push("/claims");
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

          {error ? (
            <Container mb="2">
              <Text size="2" color="red">
                {error.message}
              </Text>
            </Container>
          ) : (
            <Container mb="2"></Container>
          )}

          <Flex justify="between" align="center">
            <Link size="2" href="/reset-password">
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
