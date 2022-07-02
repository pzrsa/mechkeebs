import { Button, Flex, Link } from "@chakra-ui/react";
import { SiGithub } from "react-icons/si";

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <Flex
      as="footer"
      mt={20}
      alignItems={"center"}
      justify={{ sm: "space-between" }}
      direction={{ base: "column", sm: "row" }}
    >
      <Flex align={"center"} direction={{ base: "column", sm: "row" }}>
        <Link
          _hover={{ textDecoration: "none" }}
          href="https://github.com/pzrsa/mechkeebs"
          isExternal
        >
          <Button variant={"ghost"} leftIcon={<SiGithub />} size="sm">
            Source
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
