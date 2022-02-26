const createSetup = async (formData: FormData) => {
  const response = await fetch("http://localhost:4000/api/setups/create", {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  const result = await response.json();

  return result;
};

export default createSetup;
