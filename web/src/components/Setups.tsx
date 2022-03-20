import {
  Heading,
  ListItem,
  Stack,
  Text,
  Tooltip,
  UnorderedList,
} from "@chakra-ui/react";
import React from "react";
import { useQuery } from "react-query";
import { fetchAllSetups } from "../lib/queries";
import { Setups } from "../types/Setup";
import DateFromNow from "./DateFromNow";
import { Box } from "@chakra-ui/layout";
import dayjs from "dayjs";
import * as crypto from "crypto";

interface SetupsProps {}

const Setups: React.FC<SetupsProps> = ({}) => {
  const query = useQuery<Setups>("setups", fetchAllSetups);

  return (
    <Stack spacing={8}>
      {query.data?.result.map((setup) => (
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
            </Tooltip>
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
            {/*{setup.creatorId === user?.user?.id ? (*/}
            {/*  <Flex mt={2}>*/}
            {/*    <NextLink href={`/setups/edit/${setup.id}`}>*/}
            {/*      <IconButton*/}
            {/*        ml="auto"*/}
            {/*        aria-label="Edit Setup"*/}
            {/*        icon={<EditIcon />}*/}
            {/*      />*/}
            {/*    </NextLink>*/}
            {/*    <DeleteSetup setupId={setup.id} />*/}
            {/*  </Flex>*/}
            {/*) : null}*/}
          </Box>
        </Box>
      ))}
    </Stack>
  );
};

export default Setups;
