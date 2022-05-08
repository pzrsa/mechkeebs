import { Button, Flex, IconButton, Link } from "@chakra-ui/react";
import { SiGithub } from "react-icons/si";

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <Flex
      as="footer"
      mt={10}
      align={{ base: "center", sm: "inherit" }}
      justify={{ sm: "space-between" }}
      maxW={{ base: "none", md: "60rem", lg: "80rem" }}
      direction={{ base: "column", sm: "row" }}
    >
      <Link href="https://parsam.io/" isExternal>
        <Button variant="ghost" size="sm">
          Created by Parsa.
        </Button>
      </Link>
      <Link href="https://github.com/pzrsa/mechkeebs" isExternal>
        <IconButton
          aria-label="MechKeebs GitHub"
          variant={"ghost"}
          icon={<SiGithub />}
        />
      </Link>
    </Flex>
  );
};

export default Footer;
