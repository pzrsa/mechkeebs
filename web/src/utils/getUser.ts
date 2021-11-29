import User from "../types/User";

const getUser = async () => {
  const response = await fetch("http://localhost:4000/api/users/me", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result: User = await response.json();

  return result;
};

export default getUser;
