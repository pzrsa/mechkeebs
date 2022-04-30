import { baseUrl } from "../constants";
import { PostFormValues } from "../types/Post";
import { LoginFormValues, RegisterFormValues } from "../types/User";
import createPostFormData from "../utils/createPostFormData";

export const registerUser = async (registerInfo: RegisterFormValues) => {
  const response = await fetch("http://localhost:4000/api/users/register", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...registerInfo }),
  });

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
  const response = await fetch(`${baseUrl}/users/logout`, {
    method: "DELETE",
    credentials: "include",
  });

  return response.json();
};

export const createPost = async (postFormValues: PostFormValues) => {
  const response = await fetch(`${baseUrl}/posts/create`, {
    method: "POST",
    credentials: "include",
    body: createPostFormData(postFormValues),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const deletePost = async (postId: number) => {
  const response = await fetch(`${baseUrl}/posts/delete`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ postId }),
  });

  return response.json();
};
