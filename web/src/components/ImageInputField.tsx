import {
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import { useField } from "formik";
import { InputHTMLAttributes } from "react";
import ImageInputThumbnail from "./ImageInputThumbnail";

type ImageInputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

const ImageInputField: React.FC<ImageInputFieldProps> = ({
  label,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);

  return (
    <FormControl mb={5} isInvalid={!!(meta.touched && meta.error)}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <input
        type="file"
        accept="image/png, image/jpeg"
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
      <ImageInputThumbnail image={field.value} />
    </FormControl>
  );
};

export default ImageInputField;
