import useSWR from "swr";

const useSetups = () => {
  const { data: setups } = useSWR("http://localhost:4000/api/setups");

  return { setups };
};

export default useSetups;
