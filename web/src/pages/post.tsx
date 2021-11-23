import { Button, IconButton } from "@chakra-ui/button";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { FieldArray, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import PostSetupFormValues from "../interfaces/PostSetupFormValues";

interface PostProps {}

const Post: React.FC<PostProps> = ({}) => {
  const initialValues: PostSetupFormValues = {
    title: "",
    items: [""],
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

            items: Yup.array()
              .min(2, "Minimum of 2 items")
              .required("Must have items"),
          })}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ values, isSubmitting, errors }) => (
            <Form>
              {console.log(errors)}
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
                    {values.items.map((_, index) => (
                      <Flex
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        key={index}
                      >
                        <InputField name={`items.${index}`} label="Item" />
                        <IconButton
                          aria-label="Remove item"
                          icon={<MinusIcon />}
                          colorScheme="red"
                          type="button"
                          onClick={() => arrayHelpers.remove(index)}
                        />
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
