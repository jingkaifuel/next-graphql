"use client";

import { Avatar, Container, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import styles from "./styles.module.css";
import { ExitIcon, PersonIcon } from "@radix-ui/react-icons";
import useAuthStore from "@/app/_store/authStore";
import Link from "next/link";

const SiteHeader = () => {
  const { user, reset } = useAuthStore();

  const getInitials = (name?: string | null): string => {
    if (!name) return ""; // Handle undefined or empty string

    const words = name.trim().split(/\s+/); // Split by spaces, handling extra spaces
    if (words.length === 0) return ""; // Handle cases with only spaces

    if (words.length === 1) {
      return words[0][0]?.toUpperCase() || ""; // Ensure no error on empty string
    }

    return (words[0][0] + words[1][0]).toUpperCase();
  };

  const handleLogout = () => {
    reset();
    window.location.href = "/";
  };

  return (
    <Flex minHeight="64px" height="fit-content">
      <Container className="wrapper">
        <Flex align="center" justify="end" gap="6">
          <Flex align="center" justify="end" gap="4">
            <Link href="/claims" className={styles.navLink}>
              Claims
            </Link>
            {user?.position == "admin" && (
              <Link href="/users" className={styles.navLink}>
                Users
              </Link>
            )}
            {user?.position == "admin" && (
              <Link href="/manage" className={styles.navLink}>
                Manage
              </Link>
            )}
          </Flex>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <button type="button" className={styles.headerAvatar}>
                <Avatar
                  fallback={getInitials(user?.name)}
                  radius="full"
                ></Avatar>
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item>
                <Text weight="bold">Welcome, </Text>
                <Text>{user?.name || "User"}</Text>
              </DropdownMenu.Item>

              <DropdownMenu.Separator />

              <DropdownMenu.Item>
                <PersonIcon />
                Profile
              </DropdownMenu.Item>
              <DropdownMenu.Item color="red" onClick={handleLogout}>
                <ExitIcon />
                Logout
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Flex>
      </Container>
    </Flex>
  );
};

export default SiteHeader;
