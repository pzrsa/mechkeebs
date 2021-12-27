import { MinusIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  FormLabel,
  Heading,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import { FieldArray, Form, Formik } from "formik";
import Error from "next/error";
import router from "next/router";
import * as Yup from "yup";
import InputField from "../../../components/InputField";
import MultiInputField from "../../../components/MultiInputField";
import Wrapper from "../../../components/Wrapper";
import PostSetupFormValues from "../../../types/PostSetupFormValues";
import getSetupFromUrl from "../../../utils/getSetupFromUrl";
import getUser from "../../../utils/getUser";
import updateSetup from "../../../utils/updateSetup";
import useSetup from "../../../utils/useSetup";
import useUser from "../../../utils/useUser";
import withAuth from "../../../utils/withAuth";

interface EditSetupProps {}

const EditSetup: React.FC<EditSetupProps> = ({}) => {
  withAuth();

  const id = getSetupFromUrl();
  const { data, loading: setupLoading } = useSetup(id);

  const { user, loading: userLoading } = useUser();

  const initialValues: PostSetupFormValues = {
    title: !setupLoading && data?.result ? data.result.title : "",
    items:
      !setupLoading && data?.result
        ? data?.result?.items.map((itemName) => ({ item: itemName }))
        : [{ item: "" }, { item: "" }],
  };

  if (!setupLoading && !data?.result) return <Error statusCode={404} />;

  if (
    !userLoading &&
    !setupLoading &&
    data?.result?.creatorId !== user?.user?.id
  )
    return <Error statusCode={401} />;

  return (
    <Wrapper>
      <Box width="750px" mx="auto">
        {setupLoading ? (
          <Center>
            <Spinner size="xl" />
          </Center>
        ) : (
          <>
            <Heading my={5}>Edit Setup</Heading>
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
                const { user } = await getUser();

                const items = values["items"]!.map(
                  (item: any): string => item.item
                );

                const response = await updateSetup(
                  data!.result.id,
                  values.title,
                  items,
                  user.id
                );

                if (response?.error) {
                  console.error(response.error);
                } else if (response?.result) {
                  await router.push("/");
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
                            type="button"
                            onClick={() => arrayHelpers.unshift({ item: "" })}
                          >
                            Add Item
                          </Button>
                        </Flex>
                        {values.items.map((_, index) => (
                          <Flex
                            direction="row"
                            justifyContent="center"
                            key={index}
                          >
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
                    Update
                  </Button>
                </Form>
              )}
            </Formik>
          </>
        )}
      </Box>
    </Wrapper>
  );
};

export default EditSetup;
