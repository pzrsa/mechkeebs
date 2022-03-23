import { useQuery } from "react-query";
import { fetchCurrentUser } from "../lib/queries";
import { User } from "../types/User";

export const useUser = () => {
  return useQuery<User>("me", fetchCurrentUser);
};
