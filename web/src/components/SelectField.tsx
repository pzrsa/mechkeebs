import {
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormLabel,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChakraStylesConfig, Select } from "chakra-react-select";
import { useField } from "formik";
import { InputHTMLAttributes } from "react";

type SelectFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  options: { label: string; value: string }[];
  label: string;
};

const SelectField: React.FC<SelectFieldProps> = ({
  options,
  label,
  size,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);

  const color = useColorModeValue("#111", "#fff");
  const bg = useColorModeValue("#fff", "#111");

  const chakraStyles: ChakraStylesConfig = {
    menuList: (provided) => ({
      ...provided,
      color: color,
      bg: bg,
    }),
  };

  return (
    <FormControl mb={5} isInvalid={!!(meta.touched && meta.error)}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Select
        instanceId={field.name}
        id={field.name}
        chakraStyles={chakraStyles}
        options={options}
        onChange={(option: any) => helpers.setValue(option.value)}
        value={
          options
            ? options.find((option) => option.value === field.value)
            : null
        }
        onBlur={() => helpers.setTouched(true)}
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

export default SelectField;
