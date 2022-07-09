import { chakra } from "@chakra-ui/react";
import NextImage from "next/image";
import { useState } from "react";

interface BlurImageProps {
  src: string;
  alt?: string;
}

const Image = chakra(NextImage, {
  shouldForwardProp: (prop) =>
    ["src", "layout", "objectFit", "onLoadingComplete"].includes(prop),
});

const BlurImage: React.FC<BlurImageProps> = ({ src, alt }) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <Image
      src={src}
      alt={alt}
      layout="fill"
      objectFit="cover"
      onLoadingComplete={() => setLoading(false)}
      filter={"auto"}
      transitionDuration={"700ms"}
      blur={isLoading ? "xl" : "none"}
      scale={isLoading ? "110" : "100"}
      rounded={"md"}
    />
  );
};

export default BlurImage;
