import { PostFormValues } from "../types/Post";

const createPostFormData = (values: PostFormValues) => {
  const formData = new FormData();

  formData.append("title", values.title);

  const items = values["items"].map((item: any): string => item.item);
  formData.append("items", JSON.stringify(items));

  return formData;
};

export default createPostFormData;
