import { Button } from "@chakra-ui/button";
import { Box, Heading } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import * as Yup from "yup";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import RegisterFormValues from "../interfaces/RegisterFormValues";
import registerUser from "../utils/registerUser";
import useUser from "../utils/useUser";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
  const initialValues: RegisterFormValues = {
    username: "",
    email: "",
    password: "",
  };

  const { mutate } = useUser();
  const router = useRouter();

  return (
    <Wrapper>
      <Box width="500px" mx="auto">
        <Heading my={5}>Register</Heading>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            username: Yup.string()
              .min(2, "Must be greater than 2 characters")
              .max(15, "Must be 15 characters or less")
              .matches(
                /^[a-zA-Z0-9]+$/,
                "Username must not contain any special characters"
              )
              .required("Username required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Email required"),
            password: Yup.string()
              .min(5, "Must be greater than 5 characters")
              .required("Password required, how else you logging in?"),
          })}
          onSubmit={async (values, { setErrors }) => {
            const response = await registerUser(values);

            if (response.error?.includes("Username")) {
              setErrors({ username: response.error });
            } else if (response.error?.includes("Email")) {
              setErrors({ email: response.error });
            } else if (response?.result) {
              mutate(null, true);
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField name="username" label="Username" />
              <InputField name="email" label="Email" />
              <InputField name="password" type="password" label="Password" />
              <Button colorScheme="teal" isLoading={isSubmitting} type="submit">
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Wrapper>
  );
};

export default Register;
