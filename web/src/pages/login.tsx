import { Box, Heading } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import * as Yup from "yup";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { useUser } from "../hooks/user";
import { loginUser } from "../lib/mutations";
import { LoginFormValues } from "../types/User";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const router = useRouter();
  const { mutate } = useUser();

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  return (
    <Wrapper>
      <Box>
        <Heading mb={3}>Login</Heading>
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

            if (response.error?.includes("email")) {
              setErrors({ email: response.error });
            }
            if (response.error?.includes("password")) {
              setErrors({ password: response.error });
            }
            if (response?.result) {
              await router.push("/");
              mutate();
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField name="email" label="Email" />
              <InputField name="password" type="password" label="Password" />
              <Button isLoading={isSubmitting} type="submit">
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Wrapper>
  );
};

export default Login;
