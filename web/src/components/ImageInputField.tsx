import {
  Center,
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormLabel,
  Text,
} from "@chakra-ui/react";
import { useField } from "formik";
import { InputHTMLAttributes, useCallback } from "react";
import { useDropzone } from "react-dropzone";
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

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (!acceptedFiles.length) {
      return;
    }
    helpers.setValue(acceptedFiles.at(0));
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragAccept } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      multiple: false,
      accept: ["image/jpeg", "image/png"],
    });

  const dropText = isDragActive
    ? "Drop your image here..."
    : "Drag 'n' drop the image of your keeb here, or click to select the image";

  return (
    <FormControl mb={5} isInvalid={!!(meta.touched && meta.error)}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Center p={10} cursor="pointer" {...getRootProps()}>
        <input
          id={field.name}
          {...field}
          {...props}
          {...getInputProps()}
          value={undefined}
        />
        <Text>{dropText}</Text>
      </Center>
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
