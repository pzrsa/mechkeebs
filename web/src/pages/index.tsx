import { Heading } from "@chakra-ui/react";
import React from "react";
import Wrapper from "../components/Wrapper";

interface IndexProps {}

const Index: React.FC<IndexProps> = ({}) => {
  return (
    <Wrapper>
      <Heading>Latest Setups</Heading>
    </Wrapper>
  );
};

export default Index;
