import { Button } from "@chakra-ui/button";
import { FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Heading } from "@chakra-ui/layout";
import { Field, Form, Formik } from "formik";
import Wrapper from "../components/Wrapper";

interface RegisterProps {}

interface FormValues {
  username: string;
  email: string;
  password: string;
}

const Register: React.FC<RegisterProps> = ({}) => {
  const initialValues: FormValues = { username: "", email: "", password: "" };

  return (
    <Wrapper>
      <Heading my={5}>Register</Heading>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          const res = await fetch("http://localhost:4000/api/users/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...values }),
          });

          const result = await res.json();

          console.log(result.result);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormLabel>Username</FormLabel>
            <Field type="text" name="username" as={Input} />
            <FormLabel>Email</FormLabel>
            <Field type="email" name="email" as={Input} />
            <FormLabel>Password</FormLabel>
            <Field type="password" name="password" as={Input} />
            <Button
              colorScheme="teal"
              isLoading={isSubmitting}
              mt={5}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
