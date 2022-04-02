import {
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useField } from "formik";
import { InputHTMLAttributes } from "react";
import { SwitchOption } from "../types/Post";

type SelectFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  options: SwitchOption[];
  label: string;
};

const SelectField: React.FC<SelectFieldProps> = ({
  options,
  label,
  size,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);

  return (
    <FormControl mb={5} isInvalid={!!(meta.touched && meta.error)}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Select
        instanceId={field.name}
        id={field.name}
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
