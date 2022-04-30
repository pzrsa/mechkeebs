import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Link } from "@chakra-ui/layout";
import {
  IconButton,
  Spacer,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";
import NextLink from "next/link";
import React from "react";
import { useUser } from "../hooks/user";
import { logoutUser } from "../lib/mutations";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  const { user, isLoading, loggedOut, mutate } = useUser();
  const { colorMode, toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon);

  let body;
  if (isLoading) {
    body = <Spinner />;
  } else if (user?.user) {
    body = (
      <>
        <NextLink href="/posts/create">
          <Link>Create Post</Link>
        </NextLink>
        <Link mx={2}>{user.user.username}</Link>
        <Link
          onClick={async () => {
            await logoutUser();
            mutate(undefined);
          }}
        >
          Log Out
        </Link>
      </>
    );
  }
  if (loggedOut) {
    body = (
      <>
        <NextLink href="/register">
          <Link mr={2}>Register</Link>
        </NextLink>
        <NextLink href="/login">
          <Link>Login</Link>
        </NextLink>
      </>
    );
  }

  return (
    <Flex boxShadow={useColorModeValue("sm", "white.sm")} p={3}>
      <Flex flex={1} m="auto" align="center" maxW={"85rem"}>
        <NextLink href="/">
          <Link>
            <Heading size={"lg"} fontWeight={"black"}>
              MechKeebs
            </Heading>
          </Link>
        </NextLink>
        <Spacer />
        <Box>
          {body}
          <IconButton
            ml={"2"}
            aria-label={`Toggle ${colorMode} mode`}
            icon={<SwitchIcon />}
            onClick={toggleColorMode}
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Navbar;
