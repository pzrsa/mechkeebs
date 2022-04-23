import { DeleteIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/layout";
import {
  AspectRatio,
  Box,
  Center,
  Heading,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import Error from "next/error";
import NextImage from "next/image";
import { useRouter } from "next/router";
import Wrapper from "../../components/Wrapper";
import { usePaginatedPosts, usePost } from "../../hooks/post";
import { useUser } from "../../hooks/user";
import { deletePost } from "../../lib/mutations";

interface PostProps {}

const Post: React.FC<PostProps> = ({}) => {
  const router = useRouter();

  const { post, isLoading } = usePost();
  const { user } = useUser();
  const { mutate } = usePaginatedPosts();

  if (isLoading) {
    return (
      <Center>
        <Spinner size={"xl"} />
      </Center>
    );
  } else if (!post?.result) {
    return <Error statusCode={404} />;
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
          src={`https://storage.googleapis.com/mechkeebs/${post.result.imageName}`}
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
        {post.result.creator.id === user?.user.id ? (
          <Flex>
            <IconButton
              ml={"auto"}
              aria-label={"Delete Post"}
              icon={<DeleteIcon />}
              colorScheme="red"
              onClick={async () => {
                await deletePost(post.result.id);
                await router.push("/");
                mutate();
              }}
            />
          </Flex>
        ) : null}
      </Box>
    </Wrapper>
  );
};

export default Post;
