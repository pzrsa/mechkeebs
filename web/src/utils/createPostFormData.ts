import { PostFormValues } from "../types/Post";

const createPostFormData = (values: PostFormValues) => {
  const formData = new FormData();

  formData.append("keyboardName", values.keyboard.name);
  formData.append("keyboardSwitches", values.keyboard.switches);
  formData.append("keyboardKeycaps", values.keyboard.keycaps);

  return formData;
};

export default createPostFormData;
