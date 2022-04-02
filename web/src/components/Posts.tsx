import {
  AspectRatio,
  Box,
  Center,
  Heading,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import NextImage from "next/image";
import React from "react";
import { usePosts } from "../hooks/post";

interface PostsProps {}

const Posts: React.FC<PostsProps> = ({}) => {
  const { posts, isLoading } = usePosts();

  let body;
  if (isLoading) {
    body = (
      <Center>
        <Spinner size={"xl"} />
      </Center>
    );
  } else if (!posts?.result.length) {
    body = (
      <Center>
        <Heading size={"md"}>No posts to display.</Heading>
      </Center>
    );
  }
  if (posts?.result.length) {
    body = (
      <SimpleGrid minChildWidth={"350px"} spacing={4}>
        {posts.result.map((post) => (
          <Box
            overflow={"hidden"}
            borderRadius={"md"}
            shadow={"md"}
            key={post.id}
          >
            <AspectRatio ratio={1}>
              <NextImage
                src={"https://pbs.twimg.com/media/FKHb6g4VkAAfwvI?format=jpg"}
                layout="fill"
                objectFit="cover"
              />
            </AspectRatio>

            <Box p={5}>
              <Box fontSize={"lg"} fontWeight="black">
                {post.keyboard.name}
              </Box>
              <Box fontSize={"md"} fontWeight="semibold">
                {post.keyboard.keycaps} · {post.keyboard.switches}
              </Box>
              <Box fontSize={"sm"} fontWeight="medium">
                by {post.creator.username}
              </Box>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    );
  }

  return <>{body}</>;
};

export default Posts;
