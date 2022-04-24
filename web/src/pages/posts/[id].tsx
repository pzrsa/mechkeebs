import { DeleteIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/layout";
import {
  AspectRatio,
  Box,
  Button,
  ButtonGroup,
  Center,
  Heading,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import Error from "next/error";
import { useRouter } from "next/router";
import BlurImage from "../../components/BlurImage";
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
        boxShadow={useColorModeValue("lg", "white.lg")}
        ratio={16 / 9}
      >
        <BlurImage imageName={post.result.imageName} />
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
            <Popover closeOnBlur={true}>
              {({ onClose }) => (
                <>
                  <PopoverTrigger>
                    <IconButton
                      ml={"auto"}
                      aria-label={"Delete Post"}
                      icon={<DeleteIcon />}
                      colorScheme="red"
                    />
                  </PopoverTrigger>
                  <PopoverContent
                    color={useColorModeValue("#111", "#fff")}
                    bg={useColorModeValue("#fff", "#111")}
                  >
                    <PopoverHeader pt={4} fontWeight="bold" border="0">
                      Sure you want to delete your post?
                    </PopoverHeader>
                    <PopoverArrow />
                    <PopoverFooter
                      display={"flex"}
                      justifyContent={"end"}
                      alignContent={"end"}
                    >
                      <ButtonGroup size="sm">
                        <Button onClick={onClose}>No</Button>
                        <Button
                          colorScheme="red"
                          onClick={async () => {
                            await deletePost(post.result.id);
                            await router.push("/");
                            mutate();
                          }}
                        >
                          Yes
                        </Button>
                      </ButtonGroup>
                    </PopoverFooter>
                  </PopoverContent>
                </>
              )}
            </Popover>
          </Flex>
        ) : null}
      </Box>
    </Wrapper>
  );
};

export default Post;
