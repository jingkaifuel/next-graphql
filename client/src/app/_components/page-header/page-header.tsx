"use client";

import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Flex, Heading, IconButton } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

interface PageHeaderProps {
  title: string;
  onClose?: () => void;
  children?: React.ReactNode;
  hideBack?: boolean;
  isSecondary?: boolean;
}

export default function PageHeader({
  title,
  onClose,
  children,
  hideBack = true,
  isSecondary = false,
}: PageHeaderProps) {
  const router = useRouter();

  const handleOnClose = () => {
    if (!onClose) router.back();
    else onClose();
  };

  return (
    <Flex gap="4" mb="4">
      {(!hideBack || !isSecondary) && (
        <IconButton
          size="2"
          onClick={handleOnClose}
          radius="full"
          variant="surface"
          ml="-8"
        >
          <ChevronLeftIcon />
        </IconButton>
      )}

      {isSecondary ? (
        <Heading as="h2" size="6">
          {title}
        </Heading>
      ) : (
        <Heading as="h1" size="7">
          {title}
        </Heading>
      )}

      <Flex justify="end" gap="3" ml="auto">
        {children}
      </Flex>
    </Flex>
  );
}
