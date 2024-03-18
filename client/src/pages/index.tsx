import Head from "next/head";
import React from "react";
import Posts from "../components/Posts";
import Wrapper from "../components/Wrapper";

import { Posts as PostsType } from "../types/Post";

interface IndexProps {
  fallback: PostsType[];
}

const Index: React.FC<IndexProps> = () => {
  return (
    <>
      <Head>
        <title>
          MechKeebs - An online community for sharing and discovering your next
          mechanical keyboard.
        </title>
      </Head>
      <Wrapper>
        <Posts />
      </Wrapper>
    </>
  );
};

export default Index;
