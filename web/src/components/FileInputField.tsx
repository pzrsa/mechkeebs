import { FormControl, FormLabel } from "@chakra-ui/react";
import { useField } from "formik";

interface FileInputFieldProps {
  label: string;
  name: string;
}

const FileInputField: React.FC<FileInputFieldProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <FormControl mb={5} isInvalid={!!(meta.touched && meta.error)}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
    </FormControl>
  );
};

export default FileInputField;
