import { useRouter } from "next/router";
import { useEffect } from "react";
import useUser from "./useUser";

const withAuth = () => {
  const { user } = useUser();

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);
};

export default withAuth;
