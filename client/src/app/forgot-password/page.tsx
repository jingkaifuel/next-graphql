"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
  Text,
  TextField,
} from "@radix-ui/themes";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import client from "@/app/_lib/apolloClient";
import { FieldValues, useForm } from "react-hook-form";
import { Form } from "@radix-ui/react-form";
import resetPassword from "@/api/user/resetPassword";
import { redirect } from "next/navigation";

export default function Home() {
  // Mutations
  const [trigger, { loading, error }] = useMutation(resetPassword, {
    client,
  });
  const [formError, setFormError] = useState("");

  // Hooks
  const { register, handleSubmit } = useForm();

  // States
  const [passwordVisible, setPasswordVisible] = useState(false);

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

  const handlePasswordToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <Container className={styles.page}>
      <Box className={styles.form} p="20px" m="auto">
        <Heading as="h2" mb="4">
          Forgot Password
        </Heading>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Flex gap="3" direction="column" mb="2">
            <Flex gap="2" direction="column">
              <Text>Email</Text>
              <TextField.Root
                placeholder="Enter email"
                {...register("email")}
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
            <Flex gap="2" direction="column">
              <Text>Confirm Password</Text>
              <TextField.Root
                placeholder="Enter password again"
                type={passwordVisible ? "text" : "password"}
                {...register("passwordConfirm")}
              ></TextField.Root>
            </Flex>
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
      </Box>
    </Container>
  );
}
