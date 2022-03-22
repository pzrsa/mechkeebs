import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUser } from "../hooks/user";

const withAuth = () => {
  const { data, isFetching } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isFetching && !data?.user) {
      router.replace("/login");
    }
  }, [isFetching, data, router]);
};

export default withAuth;
