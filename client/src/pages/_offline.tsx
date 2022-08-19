import { Center, Heading } from "@chakra-ui/react";
import Head from "next/head";
import Wrapper from "../components/Wrapper";

type OfflineProps = {};

const Offline: React.FC<OfflineProps> = ({}) => {
  return (
    <>
      <Head>
        <title>MechKeebs - Offline</title>
      </Head>
      <Wrapper>
        <Center>
          <Heading size={"md"}>You&apos;re currently offline.</Heading>
        </Center>
      </Wrapper>
    </>
  );
};

export default Offline;
