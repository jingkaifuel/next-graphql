import createClaimType from "@/api/claimType/createClaimType";
import updateClaimType from "@/api/claimType/updateClaimType";
import TextInput from "@/app/_components/text-input/text-input";
import client from "@/app/_lib/apolloClient";
import { ClaimType } from "@/gql/graphql";
import { useMutation } from "@apollo/client";
import { Form } from "@radix-ui/react-form";
import { Button, Dialog, Flex } from "@radix-ui/themes";
import { useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";

interface ClaimTypeDialogProps {
  children: React.ReactNode;
  data?: ClaimType;
  onComplete?: () => void;
}

export default function ClaimTypeDialog({
  children,
  data,
  onComplete = () => {},
}: ClaimTypeDialogProps) {
  // Mutations
  const [triggerCreate, { loading: createLoading }] = useMutation(
    createClaimType,
    { client }
  );
  const [triggerUpdate, { loading: updateLoading }] = useMutation(
    updateClaimType,
    { client }
  );

  // Hooks
  const form = useForm();

  // State
  const [openDialog, setOpenDialog] = useState(false);

  // Functions
  const handleOpenChange = (isOpen: boolean) => {
    // Disable changing open state if is loading
    if (!createLoading || !updateLoading) setOpenDialog(isOpen);

    // Reset form when closing dialog
    if (!isOpen) form.reset();
  };

  const onSubmit = async (val: FieldValues) => {
    let result;
    if (!data?._id) {
      result = await triggerCreate({ variables: { data: val } });
    } else {
      result = await triggerUpdate({ variables: { id: data._id, data: val } });
    }

    if (result.data) onComplete();
    setOpenDialog(false);
  };

  return (
    <Dialog.Root onOpenChange={handleOpenChange} open={openDialog}>
      <Dialog.Trigger>{children}</Dialog.Trigger>

      <Dialog.Content maxWidth="420px">
        <Dialog.Title>{!data?._id ? "Add" : "Edit"} Claim Type</Dialog.Title>
        <Dialog.Description />

        <FormProvider {...form}>
          <Form onSubmit={form.handleSubmit(onSubmit)}>
            <Flex direction="column" gap="3">
              <TextInput
                label="Name"
                name="name"
                placeholder="Enter claim type name"
                defaultValue={data?.name}
              />

              <TextInput
                label="Description"
                name="description"
                type="textarea"
                placeholder="Enter claim type description"
                defaultValue={data?.description}
              />
            </Flex>

            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close>
                <Button
                  variant="soft"
                  color="gray"
                  disabled={createLoading || updateLoading}
                >
                  Cancel
                </Button>
              </Dialog.Close>
              <Button type="submit" disabled={createLoading || updateLoading}>
                Save
              </Button>
            </Flex>
          </Form>
        </FormProvider>
      </Dialog.Content>
    </Dialog.Root>
  );
}
