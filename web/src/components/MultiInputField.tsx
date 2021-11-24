import { FormControl, FormErrorMessage } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { useField } from "formik";
import React from "react";

interface MultiInputFieldProps {
  name: string;
  placeholder: string;
}

const MultiInputField: React.FC<MultiInputFieldProps> = ({
  placeholder,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <FormControl mb={5} isInvalid={!!(meta.touched && meta.error)}>
      <Input {...field} {...props} id={field.name} placeholder={placeholder} />
      {meta.touched && meta.error ? (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
};

export default MultiInputField;
