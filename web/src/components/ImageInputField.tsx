import {
  AspectRatio,
  Box,
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useField } from "formik";
import { InputHTMLAttributes, useCallback } from "react";
import { useDropzone } from "react-dropzone";

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

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!acceptedFiles.length) {
        return;
      }
      helpers.setValue(acceptedFiles.at(0));
    },
    [helpers]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false,
    accept: ["image/jpeg", "image/png"],
  });

  const dropText = isDragActive
    ? "Drop your image here..."
    : "Drag 'n' drop the photo of your keeb here, or click to select the photo";

  const hover = useColorModeValue("gray.300", "whiteAlpha.400");
  const bg = useColorModeValue("gray.200", "whiteAlpha.300");
  const borderColor = useColorModeValue(
    isDragActive ? "gray.300" : "inherit",
    isDragActive ? "whiteAlpha.400" : "inherit"
  );
  const errorBorderColour = useColorModeValue("red.500", "red.300");

  return (
    <FormControl mb={5} isInvalid={!!(meta.touched && meta.error)}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Box
        overflow={"hidden"}
        rounded={"md"}
        mb={3}
        p={1}
        border={field.value ? "none" : "1px solid"}
        _hover={{
          borderColor: !!(meta.touched && meta.error)
            ? errorBorderColour
            : hover,
          bg: bg,
        }}
        borderRadius={"md"}
        borderColor={
          !!(meta.touched && meta.error) ? errorBorderColour : borderColor
        }
        appearance={"none"}
        transitionProperty={"common"}
        transitionDuration={"normal"}
        {...getRootProps()}
      >
        <>
          <input
            id={field.name}
            {...field}
            {...props}
            {...getInputProps()}
            value={undefined}
          />
          {field.value ? (
            <AspectRatio ratio={16 / 9}>
              <Image
                rounded={"md"}
                src={URL.createObjectURL(field.value)}
                alt="Uploaded Keyboard"
              />
            </AspectRatio>
          ) : (
            <Text p={10} textAlign={"center"}>
              {dropText}
            </Text>
          )}
        </>
      </Box>
      <FormHelperText>Landscape photo preferred.</FormHelperText>
      {meta.touched && meta.error ? (
        <FormErrorMessage>
          <FormErrorIcon />
          {meta.error}
        </FormErrorMessage>
      ) : null}
    </FormControl>
  );
};

export default ImageInputField;
