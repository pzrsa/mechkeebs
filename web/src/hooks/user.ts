import useSWR from "swr";
import { fetchCurrentUser } from "../lib/queries";
import { User } from "../types/User";

export const useUser = () => {
  const { data, error, mutate } = useSWR<User>("me", fetchCurrentUser);

  const loggedOut = (error && error.status === 403) || !data?.user;

  return {
    user: data,
    loggedOut,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
