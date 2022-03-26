export const fetchAllSetups = async () => {
  const response = await fetch("http://localhost:4000/api/setups", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const fetchCurrentUser = async () => {
  const response = await fetch("http://localhost:4000/api/users/me", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    const error: any = new Error("An error occurred while fetching the data.");
    error.info = await response.json();
    error.status = response.status;
    throw error;
  }

  return response.json();
};
