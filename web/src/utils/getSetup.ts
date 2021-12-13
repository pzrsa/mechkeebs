import Setup from "../types/Setup";

const getSetup = async (setupId: number) => {
  const response = await fetch(
    `http://localhost:4000/api/setups?id=${setupId}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const result: Setup = await response.json();

  return result;
};

export default getSetup;
