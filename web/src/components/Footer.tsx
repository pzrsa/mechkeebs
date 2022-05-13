import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  IconButton,
  Link,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { SiGithub } from "react-icons/si";

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon);

  return (
    <Flex
      as="footer"
      mt={10}
      alignItems={"center"}
      justify={{ sm: "space-between" }}
      maxW={{ base: "none", md: "60rem", lg: "80rem" }}
      direction={{ base: "column", sm: "row" }}
    >
      <Flex align={"center"} direction={{ base: "column", sm: "row" }} gap={2}>
        <IconButton
          size={"sm"}
          aria-label={`Toggle ${colorMode} mode`}
          variant={"ghost"}
          icon={<SwitchIcon />}
          onClick={toggleColorMode}
        />
        <Link
          _hover={{ textDecoration: "none" }}
          href="https://github.com/pzrsa/mechkeebs"
          isExternal
        >
          <Button variant={"ghost"} leftIcon={<SiGithub />} size="sm">
            GitHub
          </Button>
        </Link>
      </Flex>
      <Link
        href="https://parsam.io/"
        _hover={{ textDecoration: "none" }}
        isExternal
      >
        <Button variant="ghost" size="sm">
          Made by Parsa
        </Button>
      </Link>
    </Flex>
  );
};

export default Footer;
