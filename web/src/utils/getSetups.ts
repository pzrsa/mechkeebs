const getSetups = async () => {
  const response = await fetch("http://localhost:4000/api/setups", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();

  return result;
};

export default getSetups;
