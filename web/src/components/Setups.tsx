import {
  AspectRatio,
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  ListItem,
  Spinner,
  Text,
  UnorderedList,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import crypto from "crypto";
import Image from "next/image";
import React from "react";
import { useSetups } from "../hooks/setup";
import { useUser } from "../hooks/user";
import { Setups } from "../types/Setup";
import DeleteSetupButton from "./DeleteSetupButton";

interface SetupsProps {}

const Setups: React.FC<SetupsProps> = ({}) => {
  const { setups, isLoading } = useSetups();
  const { user } = useUser();

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
      <HStack>
        <Wrap spacing={3}>
          {setups.result.map((setup) => (
            <WrapItem>
              <Box
                shadow={"lg"}
                key={setup.id}
                borderWidth="1px"
                borderRadius="xl"
                overflow="hidden"
                w={"500px"}
              >
                <AspectRatio ratio={1} h={"500px"}>
                  <Image
                    src={
                      "https://images.unsplash.com/photo-1614624532983-4ce03382d63d"
                    }
                    layout="fill"
                    objectFit="cover"
                  />
                </AspectRatio>
                <Box p="3">
                  <Text fontWeight="semibold" isTruncated>
                    {setup.title}
                  </Text>
                  <Box mt="2">
                    <UnorderedList>
                      {setup.items.map((item) => (
                        <ListItem
                          key={crypto.randomBytes(12).toString("base64")}
                        >
                          {item}
                        </ListItem>
                      ))}
                    </UnorderedList>
                    {setup.creatorId === user?.user.id ? (
                      <Flex>
                        <DeleteSetupButton setupId={setup.id} />
                      </Flex>
                    ) : null}
                  </Box>
                </Box>
              </Box>
            </WrapItem>
          ))}
        </Wrap>
      </HStack>
    );
  }

  return <>{body}</>;
};

export default Setups;
