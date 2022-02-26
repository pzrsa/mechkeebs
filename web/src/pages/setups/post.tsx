import { Button, IconButton } from "@chakra-ui/button";
import { FormLabel } from "@chakra-ui/form-control";
import { MinusIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { FieldArray, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import * as Yup from "yup";
import FileInputField from "../../components/FileInputField";
import InputField from "../../components/InputField";
import MultiInputField from "../../components/MultiInputField";
import Wrapper from "../../components/Wrapper";
import PostSetupFormValues from "../../types/PostSetupFormValues";
import createSetup from "../../utils/createSetup";
import withAuth from "../../utils/withAuth";

interface PostProps {}

const Post: React.FC<PostProps> = ({}) => {
  withAuth();
  const initialValues: PostSetupFormValues = {
    title: "",
    image: "" as any,
    items: [{ item: "" }, { item: "" }],
  };

  const router = useRouter();

  return (
    <Wrapper>
      <Box width="750px" mx="auto">
        <Heading my={5}>Post Setup</Heading>
        <Formik
          initialValues={initialValues}
          validateOnBlur={false}
          validationSchema={Yup.object().shape({
            title: Yup.string()
              .min(5, "Must be greater than 5 characters")
              .required("Title required"),

            image: Yup.mixed().required("Image required"),

            items: Yup.array().of(
              Yup.object().shape({
                item: Yup.string()
                  .min(3, "Must be greater than 3 characters")
                  .required("Item name required"),
              })
            ),
          })}
          onSubmit={async (values) => {
            const formData = new FormData();

            formData.append("title", values.title);

            formData.append("image", values.image);

            const items = values["items"].map((item: any): string => item.item);
            formData.append("items", JSON.stringify(items));

            const response = await createSetup(formData);

            // if (response?.error) {
            //   console.error(response.error);
            // } else if (response?.result) {
            //   router.push("/");
            // }
          }}
        >
          {({ values, isSubmitting }) => (
            <Form>
              <InputField name="title" label="Title" />
              <FileInputField accept="image" label="Image" name="image" />
              <FieldArray
                name="items"
                render={(arrayHelpers) => (
                  <Box>
                    <Flex mb={5} mt={10} alignItems="center">
                      <FormLabel>Items</FormLabel>
                      <Button
                        ml="auto"
                        type="button"
                        onClick={() => arrayHelpers.unshift({ item: "" })}
                      >
                        Add Item
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
              <Button isLoading={isSubmitting} type="submit">
                Post
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Wrapper>
  );
};

export default Post;
