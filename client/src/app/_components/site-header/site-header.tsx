"use client";

import { Avatar, Container, DropdownMenu, Flex, Link } from "@radix-ui/themes";
import styles from "./styles.module.css";
import { ExitIcon, PersonIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const SiteHeader = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    switch (pathname) {
      case "/":
        if (token) router.replace("/claims");
        break;
      default:
        if (!token) router.push("/");
    }
  }, [pathname, router]);

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.reload();
  };

  if (!sessionStorage.getItem("token")) return null;

  return (
    <Flex minHeight="64px" height="fit-content">
      <Container className="wrapper">
        <Flex align="center" justify="end" gap="6">
          <Flex align="center" justify="end" gap="4">
            {/* <Link href="/dashboard">Dashboard</Link> */}
            <Link href="/claims">Claims</Link>
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
