import { DeleteIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/layout";
import {
  AspectRatio,
  Box,
  Button,
  ButtonGroup,
  Heading,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  useColorModeValue,
} from "@chakra-ui/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import BlurImage from "../../components/BlurImage";
import FormattedDate from "../../components/FormattedDate";
import Wrapper from "../../components/Wrapper";
import { GCLOUD_BUCKET_NAME } from "../../data/constants";
import { usePaginatedPosts } from "../../hooks/post";
import { useUser } from "../../hooks/user";
import { deletePost } from "../../lib/mutations";
import { fetchPost } from "../../lib/queries";
import { Post } from "../../types/Post";
import getPostFromUrlId from "../../utils/getPostFromUrl";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const postId = getPostFromUrlId(context);

  const data: Post = await fetchPost(`${postId}`);

  if (!data?.result) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data },
  };
};

interface PostProps {
  data: Post;
}

const Post: React.FC<PostProps> = ({ data: post }) => {
  const router = useRouter();

  const { user } = useUser();
  const { mutate } = usePaginatedPosts();

  const boxShadow = useColorModeValue("lg", "white.lg");
  const color = useColorModeValue("#111", "#fff");
  const bg = useColorModeValue("#fff", "#111");

  return (
    <>
      <Head>
        <title>MechKeebs - {post.result.keyboard.name}</title>
        <meta
          property="og:site_name"
          content={post.result.keyboard.name}
          key="og:site_name"
        />
        <meta
          property="og:title"
          content={post.result.keyboard.name}
          key="og:title"
        />
        <meta
          property="og:image"
          content={`https://storage.googleapis.com/${GCLOUD_BUCKET_NAME}/${post.result.imageName}`}
          key="og:image"
        />
        <meta
          name="twitter:title"
          content={post.result.keyboard.name}
          key="twitter:title"
        />
        <meta
          name="twitter:image"
          content={`https://storage.googleapis.com/${GCLOUD_BUCKET_NAME}/${post.result.imageName}`}
          key="twitter:image"
        />
      </Head>
      <Wrapper>
        <AspectRatio boxShadow={boxShadow} ratio={16 / 9}>
          <BlurImage
            baseUrl={`https://storage.googleapis.com/${GCLOUD_BUCKET_NAME}`}
            imageName={post.result.imageName}
            rounded={true}
            alt={post.result.keyboard.name}
          />
        </AspectRatio>
        <Box py={4}>
          <Heading fontSize={{ base: "lg", md: "2xl" }} fontWeight="black">
            {post.result.keyboard.name}
          </Heading>
          <Box fontSize={{ base: "md", md: "xl" }} fontWeight="bold">
            {post.result.keyboard.keycaps} · {post.result.keyboard.switches}
          </Box>
          <Box fontSize={{ base: "sm", md: "lg" }} fontWeight="semibold">
            by {post.result.creator.username} ·{" "}
            <FormattedDate date={post.result.createdAt} />
          </Box>
          {post.result.creator.id === user?.user?.id ? (
            <Flex>
              <Popover closeOnBlur={true} placement={"left-end"}>
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
                    <Portal>
                      <PopoverContent
                        maxW={{ base: "16rem", md: "none" }}
                        color={color}
                        bg={bg}
                      >
                        <PopoverHeader pt={4} fontWeight="bold">
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
                    </Portal>
                  </>
                )}
              </Popover>
            </Flex>
          ) : null}
        </Box>
      </Wrapper>
    </>
  );
};

export default Post;
