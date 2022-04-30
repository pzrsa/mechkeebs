import { baseUrl } from "../constants";

export const fetchAllPosts = async () => {
  const response = await fetch(`${baseUrl}/posts`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const fetchPaginatedPosts = async (query: string) => {
  const response = await fetch(`${baseUrl}/posts?${query}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const fetchPost = async (postId: string) => {
  const response = await fetch(`${baseUrl}/posts/${postId}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};
export const fetchCurrentUser = async () => {
  const response = await fetch(`${baseUrl}/users/me`, {
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
