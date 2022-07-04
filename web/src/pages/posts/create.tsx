import { Button } from "@chakra-ui/button";
import { Box, Heading } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import * as Yup from "yup";
import ImageInputField from "../../components/ImageInputField";
import InputField from "../../components/InputField";
import SelectField from "../../components/SelectField";
import Wrapper from "../../components/Wrapper";
import { switchOptions } from "../../data/data";
import { usePaginatedPosts } from "../../hooks/post";
import { createPost } from "../../lib/mutations";
import { Post, PostFormValues } from "../../types/Post";
import useAuth from "../../utils/useAuth";

interface CreateProps {}

const Create: React.FC<CreateProps> = ({}) => {
  useAuth();
  const router = useRouter();
  const { mutate } = usePaginatedPosts();

  const toast = useToast();

  const initialValues: PostFormValues = {
    image: "" as any,
    keyboard: { name: "", switches: "", keycaps: "" },
  };

  return (
    <>
      <Head>
        <title>MechKeebs - Create Post</title>
      </Head>
      <Wrapper>
        <Box mx="auto" width={[null, "2xl"]}>
          <Heading mb={3}>Create Post</Heading>
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object().shape({
              keyboard: Yup.object().shape({
                name: Yup.string().required("Name required"),
                switches: Yup.string().required("Switches required"),
                keycaps: Yup.string().required("Keycaps required"),
              }),

              image: Yup.mixed().required("Photo required"),
            })}
            onSubmit={async (values) => {
              const response: Post = await createPost(values);

              if (!response.result) {
                toast({
                  title: "Something went wrong, try again later",
                  status: "error",
                  duration: 3000,
                  position: "bottom-right",
                  variant: "subtle",
                });
              } else if (response.result) {
                await router.push("/");
                mutate(undefined);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <InputField
                  name="keyboard.name"
                  label="Name"
                  placeholder="KBD67 Lite R3"
                />
                <SelectField
                  name="keyboard.switches"
                  label="Switches"
                  options={switchOptions}
                  placeholder="Gateron Ink Black"
                />
                <InputField
                  name="keyboard.keycaps"
                  label="Keycaps"
                  placeholder="GMK White-on-Black"
                />
                <ImageInputField label="Photo" name="image" />
                <Button isLoading={isSubmitting} type="submit">
                  Post
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Wrapper>
    </>
  );
};

export default Create;
