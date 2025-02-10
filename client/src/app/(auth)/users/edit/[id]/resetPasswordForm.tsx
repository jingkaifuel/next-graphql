"use client";

import resetPassword from "@/api/user/resetPassword";
import TextInput from "@/app/_components/text-input/text-input";
import client from "@/app/_lib/apolloClient";
import { useMutation } from "@apollo/client";
import { Form } from "@radix-ui/react-form";
import { Button, Flex, Grid } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { FieldValues, FormProvider, useForm } from "react-hook-form";

export default function ResetPasswordForm() {
  // Mutations
  const [trigger, { loading }] = useMutation(resetPassword, {
    client,
  });

  // Hooks
  const router = useRouter();
  const form = useForm();

  // Functions
  const onSubmit = async (val: FieldValues) => {
    const { data } = await trigger({ variables: val });

    if (data) {
      router.push("/users");
    }
  };

  return (
    <FormProvider {...form}>
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <Grid columns="2" gapX="5" gapY="3" mb="4">
          <TextInput
            label="Password"
            name="password"
            options={{ required: "Please enter your password" }}
            type="password"
            placeholder="Enter password"
          />

          <TextInput
            label="Confirm Password"
            name="passwordConfirm"
            options={{ required: "Please enter your password again" }}
            type="password"
            placeholder="Enter password again"
          />
        </Grid>

        <Flex justify="end">
          <Button type="submit" disabled={loading} loading={loading}>
            Reset
          </Button>
        </Flex>
      </Form>
    </FormProvider>
  );
}
