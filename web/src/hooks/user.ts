import useSWR from "swr";
import { fetchCurrentUser } from "../lib/queries";

export const useUser = () => {
  const { data, mutate, error } = useSWR("me", fetchCurrentUser);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
