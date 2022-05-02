import {
  Center,
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormLabel,
  Text,
  useColorModeValue,
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
  size,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (!acceptedFiles.length) {
      return;
    }
    helpers.setValue(acceptedFiles.at(0));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false,
    accept: ["image/jpeg", "image/png"],
  });

  const dropText = isDragActive
    ? "Drop your image here..."
    : "Drag 'n' drop the image of your keeb here, or click to select the image";

  const borderColor = useColorModeValue(
    isDragActive ? "gray.300" : "inherit",
    isDragActive ? "whiteAlpha.400" : "inherit"
  );
  const errorBorderColour = useColorModeValue("red.500", "red.300");

  return (
    <FormControl mb={5} isInvalid={!!(meta.touched && meta.error)}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Center
        mb={3}
        border={"1px solid"}
        _hover={{
          borderColor: useColorModeValue("gray.300", "whiteAlpha.400"),
          bg: useColorModeValue("gray.200", "whiteAlpha.300"),
        }}
        borderRadius={"md"}
        borderColor={
          !!(meta.touched && meta.error) ? errorBorderColour : borderColor
        }
        fontSize={"md"}
        p={10}
        appearance={"none"}
        transitionProperty={"common"}
        transitionDuration={"normal"}
        {...getRootProps()}
        _focus={{
          zIndex: 1,
          borderColor: useColorModeValue("blue.500", "blue.300"),
          boxShadow: `0 0 0 1px ${useColorModeValue("blue.500", "blue.300")}`,
        }}
      >
        <input
          id={field.name}
          {...field}
          {...props}
          {...getInputProps()}
          value={undefined}
        />
        <Text textAlign={"center"}>{dropText}</Text>
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
