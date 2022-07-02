import {
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  placeholder: string;
  label: string;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  size,
  placeholder,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <FormControl mb={5} isInvalid={!!(meta.touched && meta.error)}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
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

export default InputField;
