import { LoginFormValues } from "../types/User";

export const createSetup = async (formData: FormData) => {
  const response = await fetch("http://localhost:4000/api/setups/create", {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const loginUser = async (loginInfo: LoginFormValues) => {
  const response = await fetch("http://localhost:4000/api/users/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...loginInfo }),
  });

  return response.json();
};

export const logoutUser = async () => {
  const response = await fetch("http://localhost:4000/api/users/logout", {
    method: "DELETE",
    credentials: "include",
  });

  return response.json();
};
