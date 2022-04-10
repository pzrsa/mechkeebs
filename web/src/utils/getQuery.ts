import { SWRInfiniteKeyLoader } from "swr/infinite/dist/infinite";
import { Posts } from "../types/Post";

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

export default getQuery;
