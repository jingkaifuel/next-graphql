"use client";

import updateClaimType from "@/api/claimType/updateClaimType";
import client from "@/app/_lib/apolloClient";
import { ClaimStatus, ClaimType } from "@/gql/graphql";
import { useMutation } from "@apollo/client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { useState } from "react";

interface DeleteDialogProps {
  children: React.ReactNode;
  type: "claimType" | "claimStatus";
  data: ClaimType | ClaimStatus;
  onComplete?: () => void;
}

export default function DeleteDialog({
  children,
  type,
  data,
  onComplete = () => {},
}: DeleteDialogProps) {
  // Mutations
  const [triggerClaimType, { loading: claimTypeLoading }] = useMutation(
    updateClaimType,
    { client }
  );
  const [triggerClaimStatus, { loading: claimStatusLoading }] = useMutation(
    updateClaimType,
    { client }
  );

  // State
  const [openDialog, setOpenDialog] = useState(false);

  // Functions
  const handleOpenChange = (isOpen: boolean) => {
    // Disable changing open state if is loading
    if (!claimTypeLoading || !claimStatusLoading) setOpenDialog(isOpen);
  };

  const handleDelete = async () => {
    let result;
    if (type === "claimType") {
      result = await triggerClaimType({
        variables: { id: data._id, data: { isActive: false } },
      });
    } else {
      result = await triggerClaimStatus({
        variables: { id: data._id, data: { isActive: false } },
      });
    }

    if (result.data) onComplete();
    setOpenDialog(false);
  };

  return (
    <AlertDialog.Root onOpenChange={handleOpenChange} open={openDialog}>
      <AlertDialog.Trigger>{children}</AlertDialog.Trigger>

      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Confirm deletion</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you certain you want to delete this item? This action is
          irreversible and may impact associated claims.
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              variant="solid"
              color="red"
              onClick={handleDelete}
              disabled={claimTypeLoading || claimStatusLoading}
            >
              Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
