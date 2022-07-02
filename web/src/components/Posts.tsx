import { ArrowDownIcon, NotAllowedIcon } from "@chakra-ui/icons";
import { Button, Center, Heading, SimpleGrid, Spinner } from "@chakra-ui/react";
import React from "react";
import { usePaginatedPosts } from "../hooks/post";
import PostCard from "./PostCard";

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
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={2}>
        {posts!.map((posts) =>
          posts.result.map((post) => <PostCard key={post.id} post={post} />)
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
