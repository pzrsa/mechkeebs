import Head from "next/head";
import React from "react";
import Posts from "../components/Posts";
import Wrapper from "../components/Wrapper";

import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { SWRConfig } from "swr";
import { unstable_serialize } from "swr/infinite";
import { FETCH_LIMIT } from "../constants";
import { fetchPaginatedPosts } from "../lib/queries";
import { Posts as PostsType } from "../types/Post";
import getQuery from "../utils/getKey";

export const getServerSideProps: GetServerSideProps = async () => {
  const initialPosts = await fetchPaginatedPosts(`/posts?limit=${FETCH_LIMIT}`);
  return {
    props: {
      fallback: {
        [unstable_serialize(getQuery)]: [initialPosts],
      },
    },
  };
};

interface IndexProps {
  fallback: PostsType[];
}

const Index: React.FC<IndexProps> = ({
  fallback,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>MechKeebs</title>
      </Head>
      <Wrapper>
        <SWRConfig value={{ fallback }}>
          <Posts />
        </SWRConfig>
      </Wrapper>
    </>
  );
};

export default Index;
