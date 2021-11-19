import { Button, Heading } from "@chakra-ui/react";
import React from "react";
import Wrapper from "../components/Wrapper";
import logoutUser from "../lib/logoutUser";

interface IndexProps {}

const Index: React.FC<IndexProps> = ({}) => {
  return (
    <Wrapper>
      <Heading>Latest Setups</Heading>
      <Button onClick={async () => await logoutUser()}>logout</Button>
    </Wrapper>
  );
};

export default Index;
