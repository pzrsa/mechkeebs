import { Box, Center, Heading, Spinner } from "@chakra-ui/react";
import React from "react";
import { usePosts } from "../hooks/post";
import { useUser } from "../hooks/user";

interface SetupsProps {}

const Setups: React.FC<SetupsProps> = ({}) => {
  const { posts, isLoading } = usePosts();
  const { user } = useUser();

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
      <Box>
        {posts.result.map((post) => (
          <pre>{JSON.stringify(post, null, 2)}</pre>
        ))}
      </Box>
    );
  }

  return <>{body}</>;
};

export default Setups;
