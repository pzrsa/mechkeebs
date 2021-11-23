import { Box, Heading } from "@chakra-ui/layout";
import React from "react";
import Wrapper from "../components/Wrapper";

interface PostProps {}

const Post: React.FC<PostProps> = ({}) => {
  return (
    <Wrapper>
      <Box width="750px" mx="auto">
        <Heading my={5}>Post a setup</Heading>
      </Box>
    </Wrapper>
  );
};

export default Post;
