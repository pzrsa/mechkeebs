import { Button, Text } from "@chakra-ui/react";
import React from "react";
import { usePaginatedPosts } from "../hooks/post";

interface PostsProps {}

const Posts: React.FC<PostsProps> = ({}) => {
  const {
    posts,
    isLoading,
    mutate,
    size,
    setSize,
    isError,
    isLoadingMore,
    isReachingEnd,
  } = usePaginatedPosts();

  if (isLoading) return <>loading...</>;
  let totalPosts = 0;
  for (let i = 0; i < posts!.length; i++) {
    totalPosts += posts![i].result.length;
  }

  // let body;
  // if (isLoading) {
  //   body = (
  //     <Center>
  //       <Spinner size={"xl"} />
  //     </Center>
  //   );
  // } else if (!posts?.result.length) {
  //   body = (
  //     <Center>
  //       <Heading size={"md"}>No posts to display.</Heading>
  //     </Center>
  //   );
  // }
  // if (posts?.result.length) {
  //   body = (
  //     <SimpleGrid minChildWidth={"350px"} spacing={4}>
  //       {posts.result.map((post) => (
  //         <Box
  //           overflow={"hidden"}
  //           borderRadius={"md"}
  //           shadow={"md"}
  //           key={post.id}
  //         >
  //           <AspectRatio ratio={1}>
  //             <NextImage
  //               src={"https://pbs.twimg.com/media/FKHb6g4VkAAfwvI?format=jpg"}
  //               layout="fill"
  //               objectFit="cover"
  //             />
  //           </AspectRatio>

  //           <Box p={5}>
  //             <Box fontSize={"lg"} fontWeight="black">
  //               {post.keyboard.name}
  //             </Box>
  //             <Box fontSize={"md"} fontWeight="semibold">
  //               {post.keyboard.keycaps} · {post.keyboard.switches}
  //             </Box>
  //             <Box fontSize={"sm"} fontWeight="medium">
  //               by {post.creator.username}
  //             </Box>
  //           </Box>
  //         </Box>
  //       ))}
  //     </SimpleGrid>
  //   );
  // }

  return (
    <>
      <Text>showing {isLoadingMore ? "..." : totalPosts} post(s) </Text>
      {posts?.map((posts) => {
        return posts.result.map((post) => (
          <div key={post.id}>{post.keyboard.name}</div>
        ));
      })}
      <Button
        disabled={isLoadingMore || isReachingEnd}
        onClick={() => setSize(size + 1)}
      >
        {isLoadingMore
          ? "loading..."
          : isReachingEnd
          ? "no more issues"
          : "load more"}
      </Button>
    </>
  );
};

export default Posts;
