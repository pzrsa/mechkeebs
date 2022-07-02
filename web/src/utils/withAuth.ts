import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUser } from "../hooks/user";

const withAuth = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user && !isLoading) {
      router.replace("/");
    }
  }, [isLoading, user, router]);
};

export default withAuth;
