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
          <Link>create post</Link>
        </NextLink>
        <Link mx={3}>{user.user.username}</Link>
        <Link
          onClick={async () => {
            await logoutUser();
            mutate(undefined);
          }}
        >
          log out
        </Link>
      </>
    );
  }
  if (loggedOut) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={3}>login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>register</Link>
        </NextLink>
      </>
    );
  }

  return (
    <Flex zIndex={1} bg="white" boxShadow="md" position="sticky" top={0} p={4}>
      <Flex flex={1} m="auto" align="center" maxW={"1250px"}>
        <NextLink href="/">
          <Link>
            <Heading fontWeight={"black"}>mechkeebs</Heading>
          </Link>
        </NextLink>
        <Spacer />
        <Box>{body}</Box>
      </Flex>
    </Flex>
  );
};

export default Navbar;
