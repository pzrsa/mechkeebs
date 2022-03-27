import useSWR from "swr";
import { fetchCurrentUser } from "../lib/queries";

export const useUser = () => {
  const { data, error, mutate } = useSWR("me", fetchCurrentUser);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
