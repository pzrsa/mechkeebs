import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import React from "react";
import Wrapper from "../components/Wrapper";
import SetupFields from "../interfaces/SetupFields";
import deleteSetup from "../utils/deleteSetup";
import getSetups from "../utils/getSetups";
import useUser from "../utils/useUser";

interface IndexProps {
  setups: Array<SetupFields>;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await getSetups();

  const setups = data.results;

  return {
    props: { setups },
  };
};

const Index: React.FC<IndexProps> = ({ setups }) => {
  const { user } = useUser();

  return (
    <Wrapper>
      <Heading mb={5}>Latest Setups</Heading>
      <Stack spacing={8}>
        {setups?.map((setup) => (
          <Box key={setup.id} p={5} shadow="md" borderWidth="1px">
            <Heading mb={3} size="lg">
              {setup.title}
            </Heading>
            <Box>
              <Text my={2}>posted by {setup.creator.username}</Text>
              <Heading mb={2} size="md">
                Items
              </Heading>
              {setup.items.map((item) => (
                <UnorderedList key={item}>
                  <ListItem>{item}</ListItem>
                </UnorderedList>
              ))}
              {setup.creatorId === user?.user?.id ? (
                <Flex>
                  <IconButton
                    colorScheme="red"
                    ml="auto"
                    aria-label="Delete Setup"
                    icon={<DeleteIcon />}
                    onClick={async () => await deleteSetup(setup.id)}
                  />
                </Flex>
              ) : null}
            </Box>
          </Box>
        ))}
      </Stack>
    </Wrapper>
  );
};

export default Index;
