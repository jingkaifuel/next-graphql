"use client";

import resetPassword from "@/api/user/resetPassword";
import client from "@/app/_lib/apolloClient";
import { useMutation } from "@apollo/client";
import { Form } from "@radix-ui/react-form";
import { Button, Flex, Grid, Text, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";

export default function ResetPasswordForm() {
  // Mutations
  const [trigger, { loading }] = useMutation(resetPassword, {
    client,
  });

  // Hooks
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Functions
  const onSubmit = async (val: FieldValues) => {
    const { data } = await trigger({ variables: val });

    if (data) {
      router.push("/users");
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Grid columns="2" gapX="5" gapY="3" mb="4">
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

      <Flex justify="end">
        <Button type="submit" disabled={loading} loading={loading}>
          Reset
        </Button>
      </Flex>
    </Form>
  );
}
