import { Button, IconButton } from "@chakra-ui/button";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { FieldArray, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import InputField from "../components/InputField";
import MultiInputField from "../components/MultiInputField";
import Wrapper from "../components/Wrapper";
import PostSetupFormValues from "../interfaces/PostSetupFormValues";

interface PostProps {}

const Post: React.FC<PostProps> = ({}) => {
  const initialValues: PostSetupFormValues = {
    title: "",
    items: ["", ""],
  };

  return (
    <Wrapper>
      <Box width="750px" mx="auto">
        <Heading my={5}>Post a setup</Heading>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            title: Yup.string()
              .min(7, "Must be greater than 7 characters")
              .required("Title required"),

            items: Yup.array().of(
              Yup.object().shape({
                item: Yup.string().required("Item name required"),
              })
            ),
          })}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ values, isSubmitting, errors }) => (
            <Form>
              <InputField name="title" label="Title" />
              <FieldArray
                name="items"
                render={(arrayHelpers) => (
                  <Box>
                    <IconButton
                      aria-label="Add item"
                      icon={<AddIcon />}
                      colorScheme="teal"
                      type="button"
                      onClick={() => arrayHelpers.push("")}
                    />
                    {values.items.map((items, index) => (
                      <Flex direction="row" justifyContent="center" key={index}>
                        <MultiInputField name={`items.${index}.item`} />
                        {values.items && values.items.length <= 2 ? null : (
                          <IconButton
                            aria-label="Remove item"
                            icon={<MinusIcon />}
                            colorScheme="red"
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                          />
                        )}
                      </Flex>
                    ))}
                    <pre>{JSON.stringify(values, null, 2)}</pre>
                    <pre>{JSON.stringify(errors, null, 2)}</pre>
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
