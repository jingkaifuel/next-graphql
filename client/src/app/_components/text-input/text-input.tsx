import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { IconButton, Text, TextArea, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { RegisterOptions, useFormContext } from "react-hook-form";

interface TextInputProps {
  label: string;
  name: string;
  placeholder?: string;
  options?: RegisterOptions;
  type?: "text" | "amount" | "textarea" | "password" | "email";
  [key: string]: unknown;
}

export default function TextInput({
  label,
  name,
  placeholder,
  options,
  type = "text",
  ...props
}: TextInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handlePasswordToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <label>
      <Text as="div" size="2" mb="1" weight="bold">
        {label}
      </Text>

      {type === "textarea" ? (
        <TextArea
          {...register(name, options)}
          placeholder={placeholder}
          {...props}
        />
      ) : (
        <TextField.Root
          {...register(name, options)}
          placeholder={placeholder}
          type={
            type === "password" && !passwordVisible ? "password" : undefined
          }
          {...props}
        >
          {type === "amount" ? <TextField.Slot>RM</TextField.Slot> : null}
          {type === "password" ? (
            <>
              <TextField.Slot></TextField.Slot>
              <TextField.Slot>
                <IconButton
                  size="1"
                  variant="ghost"
                  onClick={handlePasswordToggle}
                  type="button"
                >
                  {passwordVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
                </IconButton>
              </TextField.Slot>
            </>
          ) : null}
        </TextField.Root>
      )}
      <Text size="2" color="red">
        {errors["name"]?.message?.toString()}
      </Text>
    </label>
  );
}
