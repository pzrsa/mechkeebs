import { Box, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Wrapper from "../../../components/Wrapper";
import useSetup from "../../../utils/useSetup";

interface EditSetupProps {}

const EditSetup: React.FC<EditSetupProps> = ({}) => {
  const router = useRouter();
  const id =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;

  const { data, loading } = useSetup(id);

  return (
    <Wrapper>
      <Box width="750px" mx="auto">
        <Heading my={5}>Edit setup</Heading>
        {loading ? "loading..." : <pre>{JSON.stringify(data, null, 2)}</pre>}
        {/* <Formik
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

            const items = values["items"].map((item: any): string => item.item);

            const response = await createSetup(values.title, items, user.id);

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
        </Formik> */}
      </Box>
    </Wrapper>
  );
};

export default EditSetup;
