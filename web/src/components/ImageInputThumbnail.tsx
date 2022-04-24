import { AspectRatio } from "@chakra-ui/react";
import BlurImage from "./BlurImage";

interface ImageInputThumbnailProps {
  image: File;
}

const ImageInputThumbnail: React.FC<ImageInputThumbnailProps> = ({ image }) => {
  if (!image) {
    return <></>;
  }

  return (
    <AspectRatio overflow={"hidden"} rounded={"md"} ratio={16 / 9}>
      <BlurImage imageName={URL.createObjectURL(image)} />
    </AspectRatio>
  );
};

export default ImageInputThumbnail;
