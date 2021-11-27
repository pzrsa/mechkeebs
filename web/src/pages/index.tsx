import { Heading } from "@chakra-ui/layout";
import { GetServerSideProps } from "next";
import React from "react";
import { SWRConfig } from "swr";
import Setups from "../components/Setups";
import Wrapper from "../components/Wrapper";
import getSetups from "../utils/getSetups";

interface IndexProps {
  fallback:
    | {
        [key: string]: any;
      }
    | undefined;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const initialSetups = await getSetups();

  return {
    props: {
      fallback: {
        ["http://localhost:4000/api/setups"]: initialSetups,
      },
    },
  };
};

const Index: React.FC<IndexProps> = ({ fallback }) => {
  return (
    <Wrapper>
      <Heading mb={5}>Latest Setups</Heading>
      <SWRConfig value={{ fallback }}>
        <Setups />
      </SWRConfig>
    </Wrapper>
  );
};

export default Index;
