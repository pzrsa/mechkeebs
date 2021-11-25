import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading, Link } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import NextLink from "next/link";
import React from "react";
import logoutUser from "../utils/logoutUser";
import useUser from "../utils/useUser";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  const { user, mutate, loading } = useUser();

  let body;

  if (loading) {
    body = <Spinner />;
  } else if (!user?.user) {
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
  } else {
    body = (
      <>
        <NextLink href="/post">
          <Button>Post Setup</Button>
        </NextLink>
        <Link textColor="white" mx={3}>
          {user.user.username}
        </Link>
        <Link
          textColor="white"
          onClick={async () => {
            await logoutUser();
            mutate(null, true);
          }}
        >
          Log Out
        </Link>
      </>
    );
  }

  return (
    <Flex zIndex={1} bg="teal" position="sticky" top={0} p={4}>
      <Flex flex={1} m="auto" align="center" maxW={800}>
        <NextLink href="/">
          <Link textColor="white">
            <Heading>SetupScope</Heading>
          </Link>
        </NextLink>
        <Box ml={"auto"}>{body}</Box>
      </Flex>
    </Flex>
  );
};

export default Navbar;
