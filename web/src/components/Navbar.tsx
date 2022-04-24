import { Box, Flex, Heading, Link } from "@chakra-ui/layout";
import { Spacer, useColorModeValue } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";
import NextLink from "next/link";
import React from "react";
import { useUser } from "../hooks/user";
import { logoutUser } from "../lib/mutations";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  const { user, isLoading, loggedOut, mutate } = useUser();

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
    <Flex
      zIndex={1}
      boxShadow={useColorModeValue("sm", "white.sm")}
      top={0}
      p={3}
    >
      <Flex flex={1} m="auto" align="center" maxW={"1200px"}>
        <NextLink href="/">
          <Link>
            <Heading size={"lg"} fontWeight={"black"}>
              MechKeebs
            </Heading>
          </Link>
        </NextLink>
        <Spacer />
        <Box>{body}</Box>
      </Flex>
    </Flex>
  );
};

export default Navbar;
