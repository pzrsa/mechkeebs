import {
  AspectRatio,
  Box,
  Heading,
  LinkBox,
  LinkOverlay,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { GCLOUD_BUCKET_NAME } from "../data/constants";
import { SinglePost } from "../types/Post";
import BlurImage from "./BlurImage";

interface PostCardProps {
  post: SinglePost;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <LinkBox
      overflow={"hidden"}
      rounded={"md"}
      boxShadow={useColorModeValue("lg", "white.lg")}
      key={post.id}
      transition={"0.2s opacity ease-out 0s, transform ease-out 0.2s"}
      _hover={{ transform: "scale(1.01) translateY(-4px)" }}
    >
      <AspectRatio ratio={16 / 9}>
        <BlurImage
          baseUrl={`https://storage.googleapis.com/${GCLOUD_BUCKET_NAME}`}
          imageName={post.imageName}
        />
      </AspectRatio>

      <Box p={5}>
        <Heading fontSize={"lg"} fontWeight="black">
          <NextLink href={`posts/${post.id}`} passHref>
            <LinkOverlay>{post.keyboard.name}</LinkOverlay>
          </NextLink>
        </Heading>
        <Box fontSize={"md"} fontWeight="semibold">
          {post.keyboard.keycaps} · {post.keyboard.switches}
        </Box>
        <Box fontSize={"sm"} fontWeight="medium">
          by {post.creator.username}
        </Box>
      </Box>
    </LinkBox>
  );
};

export default PostCard;
