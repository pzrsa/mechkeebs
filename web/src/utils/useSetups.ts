import useSWR from "swr";
import Setup from "../types/Setup";

const useSetups = () => {
  const {
    data: setups,
    isValidating: loading,
    mutate,
  } = useSWR<Setup>("http://localhost:4000/api/setups");

  return { setups, loading, mutate };
};

export default useSetups;
