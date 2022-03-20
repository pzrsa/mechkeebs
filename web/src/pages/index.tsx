import { Heading } from "@chakra-ui/layout";
import React from "react";
import Setups from "../components/Setups";
import Wrapper from "../components/Wrapper";

interface IndexProps {}

const Index: React.FC<IndexProps> = () => {
  return (
    <Wrapper>
      <Heading mb={5}>Latest Setups</Heading>
      <Setups />
    </Wrapper>
  );
};

export default Index;
