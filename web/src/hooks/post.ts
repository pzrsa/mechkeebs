import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import { fetchAllPosts, fetchPaginatedPosts, fetchPost } from "../lib/queries";
import { Posts } from "../types/Post";
import getPostFromUrlId from "../utils/getPostFromUrl";
import getQuery from "../utils/getQuery";

export const usePosts = () => {
  const { data, error, mutate } = useSWR<Posts>("posts", fetchAllPosts);

  return {
    posts: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export const usePaginatedPosts = () => {
  const { data, error, mutate, size, setSize } = useSWRInfinite<Posts>(
    getQuery,
    fetchPaginatedPosts
  );

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.at(0)?.result.length === null;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.result.length < 6);

  return {
    posts: data,
    isLoading: !error && !data,
    isLoadingMore,
    isReachingEnd,
    isError: error,
    size,
    setSize,
    mutate,
  };
};

export const usePost = () => {
  const intId = getPostFromUrlId();

  const { data, error, mutate } = useSWR(`${intId}`, fetchPost);

  return {
    post: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
