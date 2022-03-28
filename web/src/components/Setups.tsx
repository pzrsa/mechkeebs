import {
  AspectRatio,
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
      <Stack>
        <Wrap spacing={10}>
          {setups.result.map((setup) => (
            <Box
              shadow={"lg"}
              key={setup.id}
              borderWidth="1px"
              borderRadius="xl"
              overflow="hidden"
              w={"full"}
            >
              <AspectRatio ratio={1}>
                <Image
                  src={
                    "https://images.unsplash.com/photo-1614624532983-4ce03382d63d"
                  }
                  layout="fill"
                  objectFit="cover"
                />
              </AspectRatio>
              <Box p="3">
                <Box
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                  isTruncated
                >
                  {setup.title}
                </Box>
                <Box mt="2">
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
