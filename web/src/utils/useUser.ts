import useSWR from "swr";
import User from "../types/User";

const useUser = () => {
  const {
    data: user,
    mutate,
    isValidating: loading,
  } = useSWR<User>("http://localhost:4000/api/users/me");

  return { user, mutate, loading };
};

export default useUser;
