import useSWR from "swr";
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";
import { fetchAllPosts, fetchPaginatedPosts } from "../lib/queries";
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

const getQuery: SWRInfiniteKeyLoader = (
  pageIndex: number,
  previousPageData: Posts
) => {
  // reached the end
  if (previousPageData && !previousPageData.result) return null;

  // first page, we don't have `previousPageData`
  if (pageIndex === 0) return `limit=6`;

  // add the cursor to the API endpoint
  return `limit=6&cursor=${previousPageData.nextCursor}`;
};

export const usePaginatedPosts = () => {
  const { data, error, isValidating, mutate, size, setSize } =
    useSWRInfinite<Posts>(getQuery, fetchPaginatedPosts);

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
