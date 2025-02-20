import TextInput from "@/app/_components/text-input/text-input";
import { ClaimLimit } from "@/gql/graphql";
import { Form } from "@radix-ui/react-form";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button, Dialog, Flex, Text } from "@radix-ui/themes";
import { useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";

interface ClaimLimitPopupProps {
  children: React.ReactNode;
  data?: ClaimLimit;
  onComplete?: () => void;
}

export default function ClaimLimitPopup({
  children,
  data,
  onComplete = () => {},
}: ClaimLimitPopupProps) {
  //   // Mutations
  //   const [triggerCreate, { loading: createLoading }] = useMutation(
  //     createClaimStatus,
  //     { client }
  //   );
  //   const [triggerUpdate, { loading: updateLoading }] = useMutation(
  //     updateClaimStatus,
  //     { client }
  //   );

  // Hooks
  const form = useForm();

  // State
  const [openDialog, setOpenDialog] = useState(false);
  const [approverList, setApproverList] = useState([]);

  // Functions
  const handleOpenChange = (isOpen: boolean) => {
    // Disable changing open state if is loading
    // if (!createLoading || !updateLoading) setOpenDialog(isOpen);
    setOpenDialog(isOpen);

    // Reset form when closing dialog
    if (!isOpen) form.reset();
  };

  const handleAddApprover = () => {};

  const onSubmit = async (val: FieldValues) => {
    let result;
    // if (!data?._id) {
    //   result = await triggerCreate({ variables: { data: val } });
    // } else {
    //   result = await triggerUpdate({ variables: { id: data._id, data: val } });
    // }

    if (result.data) onComplete();
    setOpenDialog(false);
  };

  return (
    <Dialog.Root onOpenChange={handleOpenChange} open={openDialog}>
      <Dialog.Trigger>{children}</Dialog.Trigger>

      <Dialog.Content maxWidth="420px">
        <Dialog.Title>{!data?._id ? "Add" : "Edit"} Claim Limit</Dialog.Title>
        <Dialog.Description />

        <FormProvider {...form}>
          <Form onSubmit={form.handleSubmit(onSubmit)}>
            <Flex direction="column" gap="3">
              <Flex gap="2" direction="column">
                <Text weight="bold">Claim Type</Text>
                <Text size="2">{data?.claimType.name}</Text>
              </Flex>

              <Flex gap="2" direction="column">
                <Text weight="bold">User</Text>
                <Text size="2">{data?.user.name}</Text>
              </Flex>

              <TextInput
                label="Maximum Amount (RM)"
                name="maxAmount"
                type="amount"
                defaultValue={data?.maxAmount}
              />

              <Flex gap="2" direction="column">
                <Text weight="bold">Approvers</Text>
                {data?.approver?.map((approver) => {
                  return (
                    <Text size="2" key={`existing-${approver?._id}`}>
                      {approver?.name}
                    </Text>
                  );
                })}
                {approverList.map((approver) => {
                  return <Text key={`new-${approver}`}>{approver}</Text>;
                })}
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddApprover}
                >
                  <PlusIcon />
                  <Text>Add Approver</Text>
                </Button>
              </Flex>
            </Flex>

            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close>
                <Button
                  variant="soft"
                  color="gray"
                  //   disabled={createLoading || updateLoading}
                >
                  Cancel
                </Button>
              </Dialog.Close>
              <Button
                type="submit"
                //   disabled={createLoading || updateLoading}
              >
                Save
              </Button>
            </Flex>
          </Form>
        </FormProvider>
      </Dialog.Content>
    </Dialog.Root>
  );
}
