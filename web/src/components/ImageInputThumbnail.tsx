import { AspectRatio, Image } from "@chakra-ui/react";

interface ImageInputThumbnailProps {
  image: File;
}

const ImageInputThumbnail: React.FC<ImageInputThumbnailProps> = ({ image }) => {
  if (!image) {
    return <></>;
  }

  return (
    <AspectRatio overflow={"hidden"} rounded={"md"} ratio={16 / 9}>
      <Image src={URL.createObjectURL(image)} />
    </AspectRatio>
  );
};

export default ImageInputThumbnail;
