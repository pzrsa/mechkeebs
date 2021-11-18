const logoutUser = async () => {
  const response = await fetch("http://localhost:4000/api/users/logout", {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();

  return result;
};

export default logoutUser;
