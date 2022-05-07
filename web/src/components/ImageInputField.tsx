import {
  AspectRatio,
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormLabel,
  Image,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import {useField} from "formik";
import {InputHTMLAttributes, useCallback} from "react";
import {useDropzone} from "react-dropzone";

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
      <AspectRatio
        overflow={"hidden"}
        rounded={"md"}
        ratio={16 / 9}
        mb={3}
        border={field.value ? "none" : "1px solid"}
        _hover={{
          borderColor: !!(meta.touched && meta.error)
            ? errorBorderColour
            : useColorModeValue("gray.300", "whiteAlpha.400"),
          bg: useColorModeValue("gray.200", "whiteAlpha.300"),
        }}
        borderRadius={"md"}
        borderColor={
          !!(meta.touched && meta.error) ? errorBorderColour : borderColor
        }
        p={10}
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
            <Image src={URL.createObjectURL(field.value)} />
          ) : (
            <Text p={10} textAlign={"center"}>
              {dropText}
            </Text>
          )}
        </>
      </AspectRatio>
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
