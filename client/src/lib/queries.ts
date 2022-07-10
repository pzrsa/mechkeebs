import { API_BASE_URL } from "../constants";

export const loginUser = async () => {
  const response = await fetch(`${API_BASE_URL}/twitter/login`);

  return response.json();
};

export const fetchAllPosts = async () => {
  const response = await fetch(`${API_BASE_URL}/posts`, {
    method: "GET",
  });

  return response.json();
};

export const fetchPaginatedPosts = async (key: string) => {
  const response = await fetch(`${API_BASE_URL}${key}`, {
    method: "GET",
  });

  return response.json();
};

export const fetchPost = async (postId: string) => {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
    method: "GET",
  });

  return response.json();
};
export const fetchCurrentUser = async () => {
  const response = await fetch(`${API_BASE_URL}/users/me`, {
    method: "GET",
    credentials: "include",
  });

  return response.json();
};
