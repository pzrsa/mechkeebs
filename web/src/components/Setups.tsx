import {
  Box,
  Center,
  Heading,
  ListItem,
  Spinner,
  Stack,
  UnorderedList,
  Wrap,
} from "@chakra-ui/react";
import crypto from "crypto";
import Image from "next/image";
import React from "react";
import { useSetups } from "../hooks/setup";
import { Setups } from "../types/Setup";

interface SetupsProps {}

const Setups: React.FC<SetupsProps> = ({}) => {
  const { setups, isLoading } = useSetups();

  let body;
  if (isLoading) {
    body = (
      <Center>
        <Spinner size={"xl"} />
      </Center>
    );
  } else if (!setups?.result.length) {
    body = (
      <Center>
        <Heading size={"md"}>No setups to display.</Heading>
      </Center>
    );
  }
  if (setups?.result.length) {
    body = (
      <Stack direction="row">
        <Wrap spacing={7}>
          {setups.result.map((setup) => (
            <Box
              shadow={"md"}
              key={setup.id}
              maxW="sm"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
            >
              <Image
                src={
                  "https://images.unsplash.com/photo-1616763355548-1b606f439f86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8"
                }
                width={800}
                height={500}
              />
              <Box p="3">
                <Box
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                  isTruncated
                >
                  {setup.title}
                </Box>
                <Box display="flex" mt="2" alignItems="center">
                  <UnorderedList>
                    {setup.items.map((item) => (
                      <ListItem key={crypto.randomBytes(12).toString("base64")}>
                        {item}
                      </ListItem>
                    ))}
                  </UnorderedList>
                </Box>
              </Box>
            </Box>
          ))}
        </Wrap>
      </Stack>
    );
  }

  return <>{body}</>;
};

export default Setups;
