import {
  Box,
  Heading,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import React from "react";
import Wrapper from "../components/Wrapper";
import SetupFields from "../interfaces/SetupFields";
import getSetups from "../utils/getSetups";

interface IndexProps {
  setups: any;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await getSetups();

  const setups = data.results;

  return {
    props: { setups },
  };
};

const Index: React.FC<IndexProps> = ({ setups }) => {
  return (
    <Wrapper>
      <Heading mb={5}>Latest Setups</Heading>
      <Stack spacing={8}>
        {setups.map((setup: SetupFields) => (
          <Box key={setup.id} p={5} shadow="md" borderWidth="1px">
            <Heading mb={3} size="lg">
              {setup.title}
            </Heading>
            <Text my={2}>posted by {setup.creator.username}</Text>
            <Heading mb={2} size="md">
              Items
            </Heading>
            {setup.items.map((item) => (
              <UnorderedList key={item}>
                <ListItem>{item}</ListItem>
              </UnorderedList>
            ))}
          </Box>
        ))}
      </Stack>
    </Wrapper>
  );
};

export default Index;
