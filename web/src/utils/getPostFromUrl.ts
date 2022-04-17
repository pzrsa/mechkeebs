import { useRouter } from "next/router";

const getPostFromUrlId = () => {
  const router = useRouter();

  return typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
};

export default getPostFromUrlId;
