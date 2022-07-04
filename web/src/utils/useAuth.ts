import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUser } from "../hooks/user";

const useAuth = () => {
  const { user, isLoading, loggedOut } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user?.user && !isLoading && loggedOut) {
      router.replace("/");
    }
  }, [isLoading, user, router, loggedOut]);
};

export default useAuth;
