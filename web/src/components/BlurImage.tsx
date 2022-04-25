import { chakra } from "@chakra-ui/react";
import NextImage from "next/image";
import { useState } from "react";

interface BlurImageProps {
  imageName: string;
  baseUrl?: string;
  rounded?: boolean;
}

const Image = chakra(NextImage, {
  shouldForwardProp: (prop) =>
    ["src", "layout", "objectFit", "onLoadingComplete"].includes(prop),
});

const BlurImage: React.FC<BlurImageProps> = ({
  baseUrl,
  imageName,
  rounded,
}) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <Image
      src={baseUrl ? `${baseUrl}/${imageName}` : imageName}
      layout="fill"
      objectFit="cover"
      onLoadingComplete={() => setLoading(false)}
      filter={"auto"}
      transitionDuration={"700ms"}
      blur={isLoading ? "xl" : "none"}
      scale={isLoading ? "110" : "100"}
      rounded={rounded ? "md" : "none"}
    />
  );
};

export default BlurImage;
