const createSetup = async (
  title: string,
  imageName: string,
  items: string[]
) => {
  const response = await fetch("http://localhost:4000/api/setups/create", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      imageName,
      items,
    }),
  });

  const result = await response.json();

  return result;
};

export default createSetup;
