import Head from "next/head";
import React from "react";
import Posts from "../components/Posts";
import Wrapper from "../components/Wrapper";

interface IndexProps {}

const Index: React.FC<IndexProps> = () => {
  return (
    <>
      <Head>
        <title>MechKeebs</title>
      </Head>
      <Wrapper>
        <Posts />
      </Wrapper>
    </>
  );
};

export default Index;
