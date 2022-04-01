import React from "react";
import Setups from "../components/Setups";
import Wrapper from "../components/Wrapper";

interface IndexProps {}

const Index: React.FC<IndexProps> = () => {
  return (
    <Wrapper>
      <Setups />
    </Wrapper>
  );
};

export default Index;
