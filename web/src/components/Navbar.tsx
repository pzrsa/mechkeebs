import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading, Link } from "@chakra-ui/layout";
import { Spacer } from "@chakra-ui/react";
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
          <Button>Create Post</Button>
        </NextLink>
        <Link mx={3}>{user.user.username}</Link>
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
        <NextLink href="/login">
          <Button mr={2}>Login</Button>
        </NextLink>
        <NextLink href="/register">
          <Button>Register</Button>
        </NextLink>
      </>
    );
  }

  return (
    <Flex zIndex={1} bg="white" boxShadow="md" position="sticky" top={0} p={4}>
      <Flex flex={1} m="auto" align="center" maxW={"1250px"}>
        <NextLink href="/">
          <Link>
            <Heading>MechKeebs</Heading>
          </Link>
        </NextLink>
        <Spacer />
        <Box>{body}</Box>
      </Flex>
    </Flex>
  );
};

export default Navbar;
