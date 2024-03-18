import { DeleteIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/layout";
import {
  AspectRatio,
  Box,
  Button,
  ButtonGroup,
  Heading,
  IconButton,
  Link,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  useColorModeValue,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { AiFillSound } from "react-icons/ai";
import BlurImage from "../../components/BlurImage";
import FormattedDate from "../../components/FormattedDate";
import Wrapper from "../../components/Wrapper";
import { GCLOUD_BUCKET_NAME } from "../../data/constants";
import { archivedPosts } from "../../data/data";
import { usePaginatedPosts } from "../../hooks/post";
import { useUser } from "../../hooks/user";
import { deletePost } from "../../lib/mutations";

export async function getStaticPaths() {
  const paths = archivedPosts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: any) {
  const post = archivedPosts.find((post) => post.id.toString() === params.id);
  console.log(post);
  return { props: { post } };
}

interface PostProps {
  post: any;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const router = useRouter();

  const { mutate } = usePaginatedPosts();

  const boxShadow = useColorModeValue("lg", "white.lg");
  const color = useColorModeValue("#111", "#fff");
  const bg = useColorModeValue("#fff", "#111");

  return (
    <>
      <Head>
        <title>MechKeebs - {post.keyboard.name}</title>
        <meta
          property="og:site_name"
          content={post.keyboard.name}
          key="og:site_name"
        />
        <meta property="og:title" content={post.keyboard.name} key="og:title" />
        <meta
          property="og:image"
          content={`https://storage.googleapis.com/${GCLOUD_BUCKET_NAME}/${post.imageName}`}
          key="og:image"
        />
        <meta
          name="twitter:title"
          content={post.keyboard.name}
          key="twitter:title"
        />
        <meta
          name="twitter:image"
          content={`https://storage.googleapis.com/${GCLOUD_BUCKET_NAME}/${post.imageName}`}
          key="twitter:image"
        />
      </Head>
      <Wrapper>
        <Box mx="auto" maxW={[null, "7xl"]}>
          <AspectRatio ratio={16 / 9} boxShadow={boxShadow}>
            <BlurImage
              src={`https://storage.googleapis.com/${GCLOUD_BUCKET_NAME}/${post.imageName}`}
              alt={post.keyboard.name}
            />
          </AspectRatio>
          <Box py={4}>
            <Heading fontSize={{ base: "lg", md: "2xl" }} fontWeight="black">
              {post.keyboard.name}
            </Heading>
            <Box fontSize={{ base: "md", md: "xl" }} fontWeight="bold">
              {post.keyboard.keycaps} · {post.keyboard.switches}
            </Box>
            <Box fontSize={{ base: "sm", md: "lg" }} fontWeight="semibold">
              by{" "}
              <Link
                fontWeight={"black"}
                href={`https://twitter.com/${post.creator.twitterUsername}`}
                isExternal
              >
                @{post.creator.twitterUsername}
              </Link>{" "}
              · <FormattedDate date={post.createdAt} />
            </Box>
            {post.keyboard.soundTestUrl ? (
              <Box maxW={"fit-content"} mt={2}>
                <Link
                  href={post.keyboard.soundTestUrl}
                  isExternal
                  _hover={{ textDecoration: "none" }}
                >
                  <Button leftIcon={<AiFillSound />}>Sound Test</Button>
                </Link>
              </Box>
            ) : null}
          </Box>
        </Box>
      </Wrapper>
    </>
  );
};

export default Post;
