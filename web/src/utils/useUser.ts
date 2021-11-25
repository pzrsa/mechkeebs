import useSWR from "swr";

const useUser = () => {
  const { data: user, mutate } = useSWR("http://localhost:4000/api/users/me");

  return { user, mutate };
};

export default useUser;
