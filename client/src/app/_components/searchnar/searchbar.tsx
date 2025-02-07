"use client";

import { Cross1Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button, Flex, IconButton, TextField } from "@radix-ui/themes";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";

interface SearchbarProps {
  placeholder: string;
  onChange: (val: string) => void;
}

export default function Searchbar({ placeholder, onChange }: SearchbarProps) {
  const { register, resetField } = useForm();
  const [hasValue, setHasValue] = useState(false);

  const handleSearchInput = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    setHasValue(!!target.value);
    onChange(target.value);
  };

  const handleSearchReset = () => {
    resetField("search");
    setHasValue(false);
    onChange("");
  };

  return (
    <Flex gap="3" align="center">
      <TextField.Root
        {...register("search")}
        placeholder={placeholder}
        onInput={handleSearchInput}
      >
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
        <TextField.Slot>
          {hasValue ? (
            <IconButton
              variant="ghost"
              radius="full"
              onClick={handleSearchReset}
            >
              <Cross1Icon height="12" width="12" />
            </IconButton>
          ) : (
            <Cross1Icon height="12" width="12" color="white" />
          )}
        </TextField.Slot>
      </TextField.Root>

      <Button>Search</Button>
    </Flex>
  );
}
