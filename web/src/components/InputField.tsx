import {
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  placeholder: string;
  label: string;
  optional?: boolean;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  size,
  placeholder,
  optional,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <FormControl mb={5} isInvalid={!!(meta.touched && meta.error)}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input {...field} {...props} id={field.name} placeholder={placeholder} />
      {optional ? <FormHelperText>Optional</FormHelperText> : null}
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
