export const fetchAllSetups = async () => {
  const response = await fetch("http://localhost:4000/api/setups", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};
