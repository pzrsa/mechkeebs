import { Box, Flex, Heading, Link } from "@chakra-ui/layout";
import NextLink from "next/link";
import React from "react";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <Flex zIndex={1} position="sticky" top={0} bg="blue.400" p={4}>
      <Flex flex={1} m="auto" align="center" maxW={800}>
        <NextLink href="/">
          <Link>
            <Heading>SetupScope</Heading>
          </Link>
        </NextLink>
        <Box ml={"auto"}>
          <NextLink href="#">
            <Link mr={2}>Login</Link>
          </NextLink>
          <NextLink href="/register">
            <Link>Register</Link>
          </NextLink>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Navbar;
