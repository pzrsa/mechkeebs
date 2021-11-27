const fetcher = async (input: RequestInfo) => {
  const response = await fetch(input, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return data;
};

export default fetcher;
