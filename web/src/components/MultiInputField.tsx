import { FormControl, FormErrorMessage } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { FormErrorIcon } from "@chakra-ui/react";
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
        <FormErrorMessage>
          <FormErrorIcon />
          {meta.error}
        </FormErrorMessage>
      ) : null}
    </FormControl>
  );
};

export default MultiInputField;
