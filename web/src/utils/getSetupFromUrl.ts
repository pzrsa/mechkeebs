import { useRouter } from "next/router";

const getSetupFromUrl = () => {
  const router = useRouter();
  return typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
};

export default getSetupFromUrl;
