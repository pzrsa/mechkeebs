import { Box, Flex, Heading, Link } from "@chakra-ui/layout";
import NextLink from "next/link";
import React from "react";
import logoutUser from "../lib/logoutUser";
import useUser from "../lib/useUser";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  const { user, mutate } = useUser();

  let body;

  if (!user) {
    body = "loading...";
  } else if (!user?.user) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2}>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>Register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <>
        <Link mr={2}>{user.user.username}</Link>
        <Link
          onClick={() => {
            logoutUser();
            mutate(null, true);
          }}
        >
          Logout
        </Link>
      </>
    );
  }

  return (
    <Flex zIndex={1} bg="tan" position="sticky" top={0} p={4}>
      <Flex flex={1} m="auto" align="center" maxW={800}>
        <NextLink href="/">
          <Link>
            <Heading>SetupScope</Heading>
          </Link>
        </NextLink>
        <Box ml={"auto"}>{body}</Box>
      </Flex>
    </Flex>
  );
};

export default Navbar;
