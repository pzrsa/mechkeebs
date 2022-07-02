import { SWRInfiniteKeyLoader } from "swr/infinite/dist/infinite";
import { FETCH_LIMIT } from "../constants";
import { Posts } from "../types/Post";

const getQuery: SWRInfiniteKeyLoader = (
  pageIndex: number,
  previousPageData: Posts
) => {
  // reached the end
  if (previousPageData && !previousPageData.result) return null;

  // first page, we don't have `previousPageData`
  if (pageIndex === 0) return `limit=${FETCH_LIMIT}`;

  // add the cursor to the API endpoint
  return `limit=${FETCH_LIMIT}&cursor=${previousPageData.nextCursor}`;
};

export default getQuery;
