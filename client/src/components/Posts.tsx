import { NotAllowedIcon } from "@chakra-ui/icons";
import { Button, Center, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { archivedPosts } from "../data/data";
import PostCard from "./PostCard";

interface PostsProps {}

const Posts: React.FC<PostsProps> = ({}) => {
  return (
    <>
      <SimpleGrid columns={[1, 2, null, 3, null, 4]} spacing={2}>
        {archivedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </SimpleGrid>
      <Center>
        <Button disabled={true} mt={5}>
          <NotAllowedIcon />
        </Button>
      </Center>
    </>
  );
};

export default Posts;
