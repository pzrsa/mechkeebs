const deleteSetup = async (id: number, creatorId: number) => {
  const response = await fetch("http://localhost:4000/api/setups/delete", {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, creatorId }),
  });

  const result = await response.json();

  return result;
};

export default deleteSetup;
