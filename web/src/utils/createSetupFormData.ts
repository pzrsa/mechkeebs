import PostSetupFormValues from "../types/PostSetupFormValues";
import cleanFilename from "./cleanFilename";
import renameFile from "./renameFile";

const createSetupFormData = (values: PostSetupFormValues) => {
  const formData = new FormData();

  formData.append("title", values.title);
  formData.append(
    "image",
    renameFile(values.image, cleanFilename(values.image.name))
  );

  const items = values["items"].map((item: any): string => item.item);
  formData.append("items", JSON.stringify(items));

  return formData;
};

export default createSetupFormData;
