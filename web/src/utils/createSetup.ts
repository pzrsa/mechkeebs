import PostSetupFormValues from "../types/PostSetupFormValues";

const createSetup = async (
  title: PostSetupFormValues["title"],
  items: string[],
  creatorId: number
) => {
  const response = await fetch("http://localhost:4000/api/setups/create", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      items,
      creatorId,
    }),
  });

  const result = await response.json();

  return result;
};

export default createSetup;
