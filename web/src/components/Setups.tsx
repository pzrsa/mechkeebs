import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  ListItem,
  Stack,
  Text,
  Tooltip,
  UnorderedList,
} from "@chakra-ui/react";
import crypto from "crypto";
import dayjs from "dayjs";
import NextLink from "next/link";
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
          <Heading mb={3} size="lg">
            {setup.title}
          </Heading>
          <Text my={2}>
            Posted{" "}
            <Tooltip
              label={dayjs(setup.createdAt).format("ddd, MMM D, YYYY, HH:mm")}
              aria-label="Full Setup Date"
            >
              <span>
                <DateFromNow date={setup.createdAt} />
              </span>
            </Tooltip>{" "}
            by {setup.creator.username}
          </Text>
          <Box>
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
            {setup.creatorId === user?.user?.id ? (
              <Flex mt={2}>
                <NextLink href={`/setups/edit/${setup.id}`}>
                  <IconButton
                    ml="auto"
                    aria-label="Edit Setup"
                    icon={<EditIcon />}
                  />
                </NextLink>
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
