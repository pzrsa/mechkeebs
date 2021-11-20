import { Box, Heading } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import * as Yup from "yup";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import LoginFormValues from "../interfaces/LoginFormValues";
import loginUser from "../lib/loginUser";

interface loginProps {}

const login: React.FC<loginProps> = ({}) => {
  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };
  const router = useRouter();

  return (
    <Wrapper>
      <Box width="500px" mx="auto">
        <Heading my={5}>Login</Heading>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Email required"),
            password: Yup.string()
              .min(5, "Must be greater than 5 characters")
              .required("Password required, how else you logging in?"),
          })}
          onSubmit={async (values, { setErrors }) => {
            const response = await loginUser(values);

            console.log(response);

            if (response.error?.includes("email")) {
              setErrors({ email: response.error });
            } else if (response.error?.includes("password")) {
              setErrors({ password: response.error });
            } else if (response?.result) {
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField name="email" label="Email" />
              <InputField name="password" type="password" label="Password" />
              <Button colorScheme="teal" isLoading={isSubmitting} type="submit">
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Wrapper>
  );
};

export default login;
