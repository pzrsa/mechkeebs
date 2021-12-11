const editSetup = async (setupId: number) => {
  const response = await fetch("http://localhost:4000/api/setups/update", {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ setupId }),
  });

  const result = await response.json();

  return result;
};

export default editSetup;