import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import { FETCH_LIMIT } from "../constants";
import { fetchAllPosts, fetchPaginatedPosts } from "../lib/queries";
import { Posts } from "../types/Post";
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
  const isEmpty = !data?.at(0)?.result.length;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.result.length < FETCH_LIMIT);

  return {
    posts: data,
    isLoading: !error && !data,
    isLoadingMore,
    isReachingEnd,
    isError: error,
    isEmpty,
    size,
    setSize,
    mutate,
  };
};
