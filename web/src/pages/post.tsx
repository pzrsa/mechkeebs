import { Button, IconButton } from "@chakra-ui/button";
import { FormLabel } from "@chakra-ui/form-control";
import { MinusIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { FieldArray, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import * as Yup from "yup";
import InputField from "../components/InputField";
import MultiInputField from "../components/MultiInputField";
import Wrapper from "../components/Wrapper";
import PostSetupFormValues from "../interfaces/PostSetupFormValues";
import createSetup from "../lib/createSetup";
import getUser from "../lib/getUser";
import withAuth from "../lib/withAuth";

interface PostProps {}

const Post: React.FC<PostProps> = ({}) => {
  withAuth();
  const initialValues: PostSetupFormValues = {
    title: "",
    items: [{ item: "" }, { item: "" }],
  };

  const router = useRouter();

  return (
    <Wrapper>
      <Box width="750px" mx="auto">
        <Heading my={5}>Post a setup</Heading>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            title: Yup.string()
              .min(5, "Must be greater than 5 characters")
              .required("Title required"),

            items: Yup.array().of(
              Yup.object().shape({
                item: Yup.string()
                  .min(3, "Must be greater than 3 characters")
                  .required("Item name required"),
              })
            ),
          })}
          onSubmit={async (values) => {
            const { userId } = await getUser();

            const items = values["items"].map((item: any): string => item.item);

            const response = await createSetup(values.title, items, userId);

            if (response?.error) {
              console.error(response.error);
            } else if (response?.result) {
              router.push("/");
            }
          }}
        >
          {({ values, isSubmitting }) => (
            <Form>
              <InputField name="title" label="Title" />
              <FieldArray
                name="items"
                render={(arrayHelpers) => (
                  <Box>
                    <Flex mb={5} mt={10} alignItems="center">
                      <FormLabel>Items</FormLabel>
                      <Button
                        ml="auto"
                        colorScheme="teal"
                        type="button"
                        onClick={() => arrayHelpers.unshift({ item: "" })}
                      >
                        Add item
                      </Button>
                    </Flex>
                    {values.items.map((_, index) => (
                      <Flex direction="row" justifyContent="center" key={index}>
                        <MultiInputField
                          name={`items.${index}.item`}
                          placeholder="Item name"
                        />
                        {values.items.length <= 2 ? null : (
                          <IconButton
                            ml={5}
                            aria-label="Remove item"
                            icon={<MinusIcon />}
                            colorScheme="red"
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                          />
                        )}
                      </Flex>
                    ))}
                  </Box>
                )}
              />
              <Button colorScheme="teal" isLoading={isSubmitting} type="submit">
                Post Setup
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Wrapper>
  );
};

export default Post;
