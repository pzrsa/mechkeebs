import { GetServerSidePropsContext } from "next";

const getPostFromUrlId = (context: GetServerSidePropsContext) => {
  return typeof context.query.id === "string" ? parseInt(context.query.id) : -1;
};

export default getPostFromUrlId;
