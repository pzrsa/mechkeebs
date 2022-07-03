import { API_BASE_URL } from "../constants";

export const loginUser = async () => {
  const response = await fetch(`${API_BASE_URL}/twitter/login`);

  return response.json();
};

export const fetchAllPosts = async () => {
  const response = await fetch(`${API_BASE_URL}/posts`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const fetchPaginatedPosts = async (key: string) => {
  const response = await fetch(`${API_BASE_URL}${key}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const fetchPost = async (postId: string) => {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};
export const fetchCurrentUser = async () => {
  const response = await fetch(`${API_BASE_URL}/users/me`, {
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
