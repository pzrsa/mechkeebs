import { ArrowDownIcon, NotAllowedIcon } from "@chakra-ui/icons";
import {
  AspectRatio,
  Box,
  Button,
  Center,
  Heading,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import NextImage from "next/image";
import NextLink from "next/link";
import React from "react";
import { GCLOUD_BUCKET_NAME } from "../data/constants";
import { usePaginatedPosts } from "../hooks/post";

interface PostsProps {}

const Posts: React.FC<PostsProps> = ({}) => {
  const {
    posts,
    isLoading,
    size,
    setSize,
    isLoadingMore,
    isReachingEnd,
    isEmpty,
  } = usePaginatedPosts();

  if (isLoading) {
    return (
      <Center>
        <Spinner size={"xl"} />
      </Center>
    );
  } else if (isEmpty) {
    return (
      <Center>
        <Heading size={"md"}>No posts to display.</Heading>
      </Center>
    );
  }

  return (
    <>
      <SimpleGrid minChildWidth={"350px"} spacing={3}>
        {posts!.map((posts) =>
          posts.result.map((post) => (
            <LinkBox
              overflow={"hidden"}
              rounded={"md"}
              boxShadow={useColorModeValue("lg", "white.lg")}
              key={post.id}
            >
              <AspectRatio ratio={16 / 9}>
                <NextImage
                  src={`https://storage.googleapis.com/${GCLOUD_BUCKET_NAME}/${post.imageName}`}
                  layout="fill"
                  objectFit="cover"
                />
              </AspectRatio>

              <Box p={5}>
                <Heading fontSize={"lg"} fontWeight="black">
                  <NextLink href={`posts/${post.id}`} passHref>
                    <LinkOverlay>{post.keyboard.name}</LinkOverlay>
                  </NextLink>
                </Heading>
                <Box fontSize={"md"} fontWeight="semibold">
                  {post.keyboard.keycaps} · {post.keyboard.switches}
                </Box>
                <Box fontSize={"sm"} fontWeight="medium">
                  by {post.creator.username}
                </Box>
              </Box>
            </LinkBox>
          ))
        )}
      </SimpleGrid>
      <Center>
        <Button
          disabled={isLoadingMore || isReachingEnd}
          onClick={() => setSize(size + 1)}
          mt={5}
        >
          {isLoadingMore ? (
            <Spinner />
          ) : isReachingEnd ? (
            <NotAllowedIcon />
          ) : (
            <ArrowDownIcon />
          )}
        </Button>
      </Center>
    </>
  );
};

export default Posts;
