import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Flex, Heading } from "@chakra-ui/layout";
import {
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Spacer,
  Spinner,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { SiTwitter } from "react-icons/si";
import { useUser } from "../hooks/user";
import { logoutUser } from "../lib/mutations";
import { loginUser } from "../lib/queries";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  const router = useRouter();
  const { user, isLoading, loggedOut, mutate } = useUser();
  const color = useColorModeValue("#111", "#fff");
  const bg = useColorModeValue("#fff", "#111");

  const { colorMode, toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon);

  let body;

  if (isLoading) {
    body = <Spinner />;
  } else if (loggedOut) {
    body = (
      <>
        <Button
          disabled
          variant={"ghost"}
          onClick={async () => {
            const response = await loginUser();

            if (response?.result) {
              await router.push(response.result);
            }
          }}
        >
          <Flex align={"center"} gap={2}>
            <SiTwitter />
            Sign In
          </Flex>
        </Button>
      </>
    );
  }

  if (user?.id && !loggedOut) {
    body = (
      <>
        <NextLink href="/posts/create">
          <Button display={["none", "inherit"]} mr={3}>
            Create Post
          </Button>
        </NextLink>
        <Menu autoSelect={false} placement="bottom-end">
          <MenuButton>
            <Avatar size={"sm"} src={user.user.twitterImageUrl} />
          </MenuButton>
          <Portal>
            <MenuList color={color} bg={bg}>
              <NextLink href="/posts/create">
                <MenuItem display={["inherit", "none"]}>Create Post </MenuItem>
              </NextLink>
              <MenuItem
                onClick={async () => {
                  await logoutUser();
                  mutate(undefined);
                }}
              >
                Sign Out
              </MenuItem>
            </MenuList>
          </Portal>
        </Menu>
      </>
    );
  }

  return (
    <Flex
      as={"nav"}
      position={"sticky"}
      top={0}
      bg={useColorModeValue("#fff", "#111")}
      boxShadow={useColorModeValue("sm", "white.sm")}
      zIndex={1}
      p={3}
    >
      <Flex
        align={"center"}
        maxW={[null, "4xl", "5xl", "6xl", "7xl", "8xl"]}
        flex={1}
        m="auto"
      >
        <NextLink href="/">
          <Button variant={"ghost"}>
            <Heading size={"md"}>MechKeebs</Heading>
          </Button>
        </NextLink>
        <Spacer />
        <Flex alignItems={"center"}>{body}</Flex>
        <IconButton
          ml={2}
          aria-label={`Toggle ${colorMode} mode`}
          variant={"ghost"}
          icon={<SwitchIcon />}
          onClick={toggleColorMode}
        />
      </Flex>
    </Flex>
  );
};

export default Navbar;
