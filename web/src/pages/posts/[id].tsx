import { AspectRatio, Box, Center, Heading, Spinner } from "@chakra-ui/react";
import NextImage from "next/image";
import Wrapper from "../../components/Wrapper";
import { usePost } from "../../hooks/post";

interface PostProps {}

const Post: React.FC<PostProps> = ({}) => {
  const { post, isLoading } = usePost();

  if (isLoading) {
    return (
      <Center>
        <Spinner size={"xl"} />
      </Center>
    );
  } else if (!post?.result) {
    return (
      <Center>
        <Heading size={"md"}>No post to display</Heading>
      </Center>
    );
  }

  return (
    <Wrapper>
      <AspectRatio
        overflow={"hidden"}
        rounded={"md"}
        shadow={"md"}
        ratio={16 / 9}
      >
        <NextImage
          src={"https://pbs.twimg.com/media/FKHb6g4VkAAfwvI?format=jpg"}
          layout="fill"
          objectFit="cover"
        />
      </AspectRatio>

      <Box p={5}>
        <Heading fontSize={"xl"} fontWeight="black">
          {post.result.keyboard.name}
        </Heading>
        <Box fontSize={"lg"} fontWeight="semibold">
          {post.result.keyboard.keycaps} · {post.result.keyboard.switches}
        </Box>
        <Box fontSize={"md"} fontWeight="medium">
          by {post.result.creator.username}
        </Box>
      </Box>
    </Wrapper>
  );
};

export default Post;
