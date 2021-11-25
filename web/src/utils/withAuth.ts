import { useRouter } from "next/router";
import { useEffect } from "react";
import useUser from "./useUser";

const withAuth = () => {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user?.user) {
      router.replace("/login");
    }
  }, [loading, user, router]);
};

export default withAuth;
