import useSWR from "swr";
import { fetchAllSetups } from "../lib/queries";
import { Setups } from "../types/Setup";

export const useSetups = () => {
  const { data, error, mutate } = useSWR<Setups>("setups", fetchAllSetups);

  return {
    setups: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
