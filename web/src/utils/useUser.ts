import useSWR from "swr";

const useUser = () => {
  const {
    data: user,
    mutate,
    isValidating: loading,
  } = useSWR("http://localhost:4000/api/users/me");

  return { user, mutate, loading };
};

export default useUser;
