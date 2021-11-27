import LoginFormValues from "../types/LoginFormValues";

const loginUser = async (values: LoginFormValues) => {
  const response = await fetch("http://localhost:4000/api/users/login", {
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

export default loginUser;
