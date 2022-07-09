import imageCompression from "browser-image-compression";
import { PostFormValues } from "../types/Post";
import cleanFilename from "./cleanFilename";
import renameFile from "./renameFile";

const createPostFormData = async (values: PostFormValues) => {
  const formData = new FormData();

  if (values.keyboard.soundTestUrl) {
    const httpRe = new RegExp(/^(http|https):\/\//);
    !httpRe.test(values.keyboard.soundTestUrl)
      ? formData.append(
          "keyboardSoundTestUrl",
          `https://${values.keyboard.soundTestUrl}`
        )
      : formData.append(
          "keyboardSoundTestUrl",
          values.keyboard.soundTestUrl as string
        );
  }

  formData.append("keyboardName", values.keyboard.name);
  formData.append("keyboardSwitches", values.keyboard.switches);
  formData.append("keyboardKeycaps", values.keyboard.keycaps);

  const compressedImage = await imageCompression(values.image, {
    maxSizeMB: 1,
  });

  formData.append(
    "image",
    renameFile(compressedImage, cleanFilename(values.image.name))
  );

  return formData;
};

export default createPostFormData;
