import { EditIcon } from "@chakra-ui/icons";
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
import crypto from "crypto";
import React from "react";
import useSetups from "../utils/useSetups";
import useUser from "../utils/useUser";
import DateFromNow from "./DateFromNow";
import DeleteSetup from "./DeleteSetup";

interface SetupsProps {}

const Setups: React.FC<SetupsProps> = ({}) => {
  const { user } = useUser();
  const { setups, loading } = useSetups();

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
              <UnorderedList>
                {setup.items.map((item) => (
                  <ListItem key={crypto.randomBytes(12).toString("base64")}>
                    {item}
                  </ListItem>
                ))}
              </UnorderedList>
            </Skeleton>
            {setup.creatorId === user?.user?.id ? (
              <Flex mt={2}>
                <IconButton
                  colorScheme="blue"
                  ml="auto"
                  aria-label="Edit Setup"
                  icon={<EditIcon />}
                />
                <DeleteSetup setupId={setup.id} />
              </Flex>
            ) : null}
          </Box>
        </Box>
      ))}
    </Stack>
  );
};

export default Setups;
