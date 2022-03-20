import useSWR from "swr";
import { Setups } from "../types/Setup";

const useSetups = () => {
  const {
    data: setups,
    isValidating: loading,
    mutate,
  } = useSWR<Setups>("http://localhost:4000/api/setups");

  return { setups, loading, mutate };
};

export default useSetups;
