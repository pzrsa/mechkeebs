import RegisterFormValues from "../interfaces/RegisterFormValues";

const registerUser = async (values: RegisterFormValues) => {
  const response = await fetch("http://localhost:4000/api/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...values }),
  });

  const result = await response.json();

  return result;
};

export default registerUser;
