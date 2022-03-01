const renameFile = (originalFile: File, newFilename: string) => {
  return new File([originalFile], newFilename, {
    type: originalFile.type,
  });
};

export default renameFile;
