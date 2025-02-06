"use client";

import { Avatar, Container, DropdownMenu, Flex, Link } from "@radix-ui/themes";
import styles from "./styles.module.css";
import { ExitIcon, PersonIcon } from "@radix-ui/react-icons";
import useAuthStore from "@/app/_store/authStore";

const SiteHeader = () => {
  const { user, reset } = useAuthStore();

  const handleLogout = () => {
    reset();
    window.location.href = "/";
  };

  return (
    <Flex minHeight="64px" height="fit-content">
      <Container className="wrapper">
        <Flex align="center" justify="end" gap="6">
          <Flex align="center" justify="end" gap="4">
            <Link href="/claims">Claims</Link>
            {user?.position == "admin" && <Link href="/users">Users</Link>}
          </Flex>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <button type="button" className={styles.headerAvatar}>
                <Avatar fallback="A" radius="full"></Avatar>
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
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
