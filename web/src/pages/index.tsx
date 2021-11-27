import { IconButton } from "@chakra-ui/button";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import { GetServerSideProps } from "next";
import React from "react";
import { SWRConfig } from "swr";
import Wrapper from "../components/Wrapper";
import SetupFields from "../interfaces/SetupFields";
import deleteSetup from "../utils/deleteSetup";
import getSetups from "../utils/getSetups";
import useSetups from "../utils/useSetups";
import useUser from "../utils/useUser";

interface IndexProps {
  fallback:
    | {
        [key: string]: any;
      }
    | undefined;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await getSetups();

  const initialSetups = data.results;

  return {
    props: {
      fallback: {
        useSetups: initialSetups,
      },
    },
  };
};

const Index: React.FC<IndexProps> = ({ fallback }) => {
  const { user } = useUser();
  const { setups, loading, mutate } = useSetups();

  return (
    <SWRConfig value={{ fallback }}>
      <Wrapper>
        <Heading mb={5}>Latest Setups</Heading>
        <Stack spacing={8}>
          {setups?.results.map((setup: SetupFields) => (
            <Box key={setup.id} p={5} shadow="md" borderWidth="1px">
              <Skeleton isLoaded={!loading}>
                <Heading mb={3} size="lg">
                  {setup.title}
                </Heading>
              </Skeleton>
              <Skeleton isLoaded={!loading}>
                <Text my={2}>posted by {setup.creator.username}</Text>
              </Skeleton>
              <Box>
                <Skeleton isLoaded={!loading}>
                  <Heading mb={2} size="md">
                    Items
                  </Heading>
                  {setup.items.map((item) => (
                    <UnorderedList key={item}>
                      <ListItem>{item}</ListItem>
                    </UnorderedList>
                  ))}
                </Skeleton>
                {setup.creatorId === user?.user?.id ? (
                  <Flex>
                    <IconButton
                      colorScheme="red"
                      ml="auto"
                      mt={2}
                      aria-label="Delete Setup"
                      icon={<DeleteIcon />}
                      onClick={async () => {
                        await deleteSetup(setup.id);
                        mutate(null, true);
                      }}
                    />
                  </Flex>
                ) : null}
              </Box>
            </Box>
          ))}
        </Stack>
      </Wrapper>
    </SWRConfig>
  );
};

export default Index;
