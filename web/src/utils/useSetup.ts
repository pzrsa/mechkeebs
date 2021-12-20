import useSWRImmutable from "swr/immutable";
import Setup from "../types/Setup";

const useSetup = (setupId: number) => {
  const { data, isValidating: loading } = useSWRImmutable<Setup>(
    `http://localhost:4000/api/setups?id=${setupId}`
  );

  return { data, loading };
};

export default useSetup;
