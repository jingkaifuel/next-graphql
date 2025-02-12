import createClaimStatus from "@/api/claimStatus/createClaimStatus";
import updateClaimStatus from "@/api/claimStatus/updateClaimStatus";
import TextInput from "@/app/_components/text-input/text-input";
import client from "@/app/_lib/apolloClient";
import { ClaimStatus } from "@/gql/graphql";
import { useMutation } from "@apollo/client";
import { Form } from "@radix-ui/react-form";
import { Button, Dialog, Flex } from "@radix-ui/themes";
import { useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";

interface ClaimStatusDialogProps {
  children: React.ReactNode;
  data?: ClaimStatus;
  onComplete?: () => void;
}

export default function ClaimStatusDialog({
  children,
  data,
  onComplete = () => {},
}: ClaimStatusDialogProps) {
  // Mutations
  const [triggerCreate, { loading: createLoading }] = useMutation(
    createClaimStatus,
    { client }
  );
  const [triggerUpdate, { loading: updateLoading }] = useMutation(
    updateClaimStatus,
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
        <Dialog.Title>{!data?._id ? "Add" : "Edit"} Claim Status</Dialog.Title>
        <Dialog.Description />

        <FormProvider {...form}>
          <Form onSubmit={form.handleSubmit(onSubmit)}>
            <Flex direction="column" gap="3">
              <TextInput
                label="Name"
                name="name"
                placeholder="Enter claim status name"
                defaultValue={data?.name}
              />

              <TextInput
                label="Description"
                name="description"
                type="textarea"
                placeholder="Enter claim status description"
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
