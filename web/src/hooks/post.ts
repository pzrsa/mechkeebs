import useSWR from "swr";
import { fetchAllPosts } from "../lib/queries";
import { Posts } from "../types/Post";

export const usePosts = () => {
  const { data, error, mutate } = useSWR<Posts>("posts", fetchAllPosts);

  return {
    posts: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
