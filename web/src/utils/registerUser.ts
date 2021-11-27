import RegisterFormValues from "../types/RegisterFormValues";

const registerUser = async (values: RegisterFormValues) => {
  values.username = values.username.toLowerCase();

  const response = await fetch("http://localhost:4000/api/users/register", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...values }),
  });

  const result = await response.json();

  return result;
};

export default registerUser;
