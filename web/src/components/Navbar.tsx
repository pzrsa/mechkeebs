import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Box, Flex, Link } from "@chakra-ui/layout";
import {
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
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
  const color = useColorModeValue("#111", "#fff");
  const bg = useColorModeValue("#fff", "#111");

  let body;
  let mobileBody: any;

  if (isLoading) {
    body = <Spinner />;
    mobileBody = <Spinner />;
  } else if (user?.user) {
    body = (
      <>
        <NextLink href="/posts/create">
          <Button>Create Post</Button>
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
    mobileBody = (
      <>
        <MenuItem>
          <NextLink href="/posts/create">Create Post</NextLink>
        </MenuItem>
        <MenuItem>
          <Link>{user.user.username}</Link>
        </MenuItem>
        <MenuItem>
          <Link
            onClick={async () => {
              await logoutUser();
              mutate(undefined);
            }}
          >
            Log Out
          </Link>
        </MenuItem>
      </>
    );
  }
  if (loggedOut) {
    body = (
      <>
        <NextLink href="/register">
          <Button mr={2}>Register</Button>
        </NextLink>
        <NextLink href="/login">
          <Button>Login</Button>
        </NextLink>
      </>
    );
    mobileBody = (
      <>
        <MenuItem>
          <NextLink href="/register">Register</NextLink>
        </MenuItem>
        <MenuItem>
          <NextLink href="/login">Login</NextLink>
        </MenuItem>
      </>
    );
  }

  return (
    <Flex boxShadow={useColorModeValue("sm", "white.sm")} p={3}>
      <Flex flex={1} m="auto" align="center" maxW={"85rem"}>
        <NextLink href="/">
          <Button fontSize={"xl"} variant={"ghost"}>
            MechKeebs
          </Button>
        </NextLink>
        <Spacer />
        <Box alignItems={"center"} display={{ base: "none", md: "inherit" }}>
          {body}
          <IconButton
            ml={"2"}
            aria-label={`Toggle ${colorMode} mode`}
            variant={"ghost"}
            icon={<SwitchIcon />}
            onClick={toggleColorMode}
          />
        </Box>
        <Menu autoSelect={false}>
          {({ isOpen }) => (
            <>
              <MenuButton
                as={IconButton}
                aria-label={"Mobile navigation"}
                display={{ base: "inherit", md: "none" }}
                icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                variant={"outline"}
                fontSize={"xl"}
              />
              <MenuList color={color} bg={bg}>
                {mobileBody}
                <MenuItem
                  textTransform={"capitalize"}
                  icon={<SwitchIcon />}
                  onClick={toggleColorMode}
                >
                  {`Toggle ${colorMode} Mode`}
                </MenuItem>
              </MenuList>
            </>
          )}
        </Menu>
      </Flex>
    </Flex>
  );
};

export default Navbar;
