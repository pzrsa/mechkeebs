import {
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import { useField } from "formik";
import { InputHTMLAttributes } from "react";

type FileInputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  accept: "image" | "video" | "audio";
  label: string;
  name: string;
};

const FileInputField: React.FC<FileInputFieldProps> = ({
  label,
  accept,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);

  return (
    <FormControl mb={5} isInvalid={!!(meta.touched && meta.error)}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <input
        type="file"
        accept={`${accept}/*`}
        id={field.name}
        {...field}
        {...props}
        value={undefined}
        onChange={(event) => {
          helpers.setValue(event.currentTarget.files?.item(0));
        }}
      />
      {meta.touched && meta.error ? (
        <FormErrorMessage>
          <FormErrorIcon />
          {meta.error}
        </FormErrorMessage>
      ) : null}
    </FormControl>
  );
};

export default FileInputField;
