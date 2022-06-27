import { API_BASE_URL } from "../constants";
import { PostFormValues } from "../types/Post";
import createPostFormData from "../utils/createPostFormData";

export const logoutUser = async () => {
  const response = await fetch(`${API_BASE_URL}/users/logout`, {
    method: "DELETE",
    credentials: "include",
  });

  return response.json();
};

export const createPost = async (postFormValues: PostFormValues) => {
  const response = await fetch(`${API_BASE_URL}/posts/create`, {
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
  const response = await fetch(`${API_BASE_URL}/posts/delete`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ postId }),
  });

  return response.json();
};
