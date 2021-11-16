import { Link } from "@chakra-ui/layout";
import NextLink from "next/link";
import React from "react";
import Wrapper from "../components/Wrapper";

interface IndexProps {}

const Index: React.FC<IndexProps> = ({}) => {
  return (
    <Wrapper>
      <NextLink href="/register">
        <Link>Register account</Link>
      </NextLink>
    </Wrapper>
  );
};

export default Index;
