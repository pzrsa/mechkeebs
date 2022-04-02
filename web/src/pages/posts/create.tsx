import { Button } from "@chakra-ui/button";
import { Box, Heading } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import * as Yup from "yup";
import InputField from "../../components/InputField";
import SelectField from "../../components/SelectField";
import Wrapper from "../../components/Wrapper";
import { switchOptions } from "../../data/data";
import { usePosts } from "../../hooks/post";
import { createPost } from "../../lib/mutations";
import { PostFormValues } from "../../types/Post";
import withAuth from "../../utils/withAuth";

interface CreateProps {}

const Create: React.FC<CreateProps> = ({}) => {
  withAuth();
  const router = useRouter();
  const { mutate } = usePosts();

  const initialValues: PostFormValues = {
    image: "" as any,
    keyboard: { name: "", switches: "", keycaps: "" },
  };

  return (
    <Wrapper>
      <Box width="750px" mx="auto">
        <Heading my={5}>Create Post</Heading>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            // image: Yup.mixed().required("Image required"),

            keyboard: Yup.object().shape({
              name: Yup.string().required("Keyboard name required"),
              switches: Yup.string().required("Keyboard switches required"),
              keycaps: Yup.string().required("Keyboard keycaps required"),
            }),
          })}
          onSubmit={async (values) => {
            const response = await createPost(values);

            if (response.error) {
              console.error(response.error);
            }
            if (response.result) {
              await router.push("/");
              mutate(undefined);
            }
          }}
        >
          {({ isSubmitting, values, errors }) => (
            <Form>
              <InputField name="keyboard.name" label="Name" />
              <SelectField
                name="keyboard.switches"
                label="Switches"
                options={switchOptions}
              />
              <InputField name="keyboard.keycaps" label="Keycaps" />
              <Button isLoading={isSubmitting} type="submit">
                Post
              </Button>
              <pre>{JSON.stringify(values, null, 2)}</pre>
              <pre>{JSON.stringify(errors, null, 2)}</pre>
            </Form>
          )}
        </Formik>
      </Box>
    </Wrapper>
  );
};

export default Create;
