import { PostFormValues } from "../types/Post";
import cleanFilename from "./cleanFilename";
import renameFile from "./renameFile";

const createPostFormData = (values: PostFormValues) => {
  const formData = new FormData();

  formData.append("keyboardName", values.keyboard.name);
  formData.append("keyboardSwitches", values.keyboard.switches);
  formData.append("keyboardKeycaps", values.keyboard.keycaps);
  formData.append(
    "image",
    renameFile(values.image, cleanFilename(values.image.name))
  );

  return formData;
};

export default createPostFormData;
