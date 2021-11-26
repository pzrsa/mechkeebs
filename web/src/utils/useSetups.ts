import useSWR from "swr";

const useSetups = () => {
  const {
    data: setups,
    isValidating: loading,
    mutate,
  } = useSWR("http://localhost:4000/api/setups");

  return { setups, loading, mutate };
};

export default useSetups;
