import {useQuery} from "react-query";
import {User} from "../types/User";
import {fetchCurrentUser} from "../lib/queries";

export const useUser = () => {
  return useQuery<User>("me", fetchCurrentUser)
};
