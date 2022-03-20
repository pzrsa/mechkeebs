import { Button, IconButton } from "@chakra-ui/button";
import { FormLabel } from "@chakra-ui/form-control";
import { MinusIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { FieldArray, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { useMutation } from "react-query";
import * as Yup from "yup";
import InputField from "../../components/InputField";
import MultiInputField from "../../components/MultiInputField";
import Wrapper from "../../components/Wrapper";
import { createSetup } from "../../lib/mutations";
import createSetupFormData from "../../utils/createSetupFormData";
import withAuth from "../../utils/withAuth";
import { SetupFormValues } from "../../types/Setup";

interface CreateProps {}

const Create: React.FC<CreateProps> = ({}) => {
  withAuth();
  const mutation = useMutation(createSetup);

  const initialValues: SetupFormValues = {
    title: "",
    items: [{ item: "" }, { item: "" }],
  };

  const router = useRouter();

  return (
    <Wrapper>
      <Box width="750px" mx="auto">
        <Heading my={5}>Create Setup</Heading>
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
            const formData = createSetupFormData(values);

            await mutation.mutateAsync(formData);

            if (!mutation.isError) {
              await router.push("/");
            }
          }}
        >
          {({ values, isSubmitting, errors }) => (
            <Form>
              <InputField name="title" label="Title" />
              {/*<ImageInputField label="Image" name="image" />*/}
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
                Create
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
