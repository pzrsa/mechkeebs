import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  ListItem,
  Skeleton,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import React from "react";
import deleteSetup from "../utils/deleteSetup";
import useSetups from "../utils/useSetups";
import useUser from "../utils/useUser";
import DateFromNow from "./DateFromNow";

interface SetupsProps {}

const Setups: React.FC<SetupsProps> = ({}) => {
  const { user } = useUser();
  const { setups, loading, mutate } = useSetups();

  return (
    <Stack spacing={8}>
      {setups?.results.map((setup) => (
        <Box key={setup.id} p={5} shadow="md" borderWidth="1px">
          <Skeleton isLoaded={!loading}>
            <Heading mb={3} size="lg">
              {setup.title}
            </Heading>
          </Skeleton>
          <Skeleton isLoaded={!loading}>
            <Text my={2}>
              Posted <DateFromNow date={setup.createdAt} /> by{" "}
              {setup.creator.username}
            </Text>
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
                    mutate(undefined, true);
                  }}
                />
              </Flex>
            ) : null}
          </Box>
        </Box>
      ))}
    </Stack>
  );
};

export default Setups;
