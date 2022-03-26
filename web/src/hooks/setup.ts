import useSWR from "swr";
import { fetchAllSetups } from "../lib/queries";

export const useSetups = () => {
  const { data, error, mutate } = useSWR("setups", fetchAllSetups);

  return {
    setups: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
