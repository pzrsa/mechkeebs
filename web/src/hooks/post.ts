import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
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

const getQuery = (pageIndex: number, previousPageData: Posts) => {
  // reached the end
  if (previousPageData && !previousPageData.result) return null;

  // first page, we don't have `previousPageData`
  if (pageIndex === 0) return `limit=6`;

  // add the cursor to the API endpoint
  return `limit=6&cursor=${previousPageData.nextCursor}`;
};

export const usePaginatedPosts = () => {
  const {} = useSWRInfinite(getQuery);
};
