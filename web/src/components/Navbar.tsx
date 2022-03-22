import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading, Link } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import NextLink from "next/link";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useUser } from "../hooks/user";
import { logoutUser } from "../lib/mutations";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  const queryClient = useQueryClient();
  const { data } = useUser();
  const mutation = useMutation(logoutUser, { mutationKey: "logoutUser" });

  console.log(data);

  let body;

  if (!data) {
    body = <Spinner />;
  } else if (!data?.user) {
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
        <NextLink href="/setups/create">
          <Button>Create Setup</Button>
        </NextLink>
        <Link mx={3}>{data.user.username}</Link>
        <Link
          onClick={async () => {
            await mutation.mutateAsync();
            await queryClient.invalidateQueries("me");
          }}
        >
          Log Out
        </Link>
      </>
    );
  }

  return (
    <Flex zIndex={1} bg="white" boxShadow="md" position="sticky" top={0} p={4}>
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
