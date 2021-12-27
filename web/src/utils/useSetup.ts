import useSWR from "swr";
import Setup from "../types/Setup";

const useSetup = (setupId: number) => {
  const { data, isValidating: loading } = useSWR<Setup>(
    `http://localhost:4000/api/setups?id=${setupId}`,
    { revalidateOnFocus: false }
  );

  return { data, loading };
};

export default useSetup;
