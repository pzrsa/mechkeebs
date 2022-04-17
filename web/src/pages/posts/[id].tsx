import Wrapper from "../../components/Wrapper";
import { usePost } from "../../hooks/post";

interface PostProps {}

const Post: React.FC<PostProps> = ({}) => {
  const { post } = usePost();

  return (
    <Wrapper>
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </Wrapper>
  );
};

export default Post;
