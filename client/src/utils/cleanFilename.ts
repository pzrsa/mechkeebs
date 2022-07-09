import dayjs from "dayjs";

const cleanFilename = (filename: string) => {
  const date = dayjs().format("YYYYMMDD");

  const randomString = Math.random().toString(36).substring(2, 7);

  const filenameWithoutExtension = filename.replace(/\.[^/.]+$/, "");

  const cleanFilename = filenameWithoutExtension
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-");

  const fileExtension = filename.substring(filename.lastIndexOf(".") + 1);

  const newFilename = `${date}-${randomString}-${cleanFilename.substring(
    0,
    30
  )}.${fileExtension}`;

  return newFilename;
};

export default cleanFilename;
