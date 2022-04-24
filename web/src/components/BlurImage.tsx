import { Box } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";

interface BlurImageProps {
  imageName: string;
  baseUrl?: string;
}

const BlurImage: React.FC<BlurImageProps> = ({ baseUrl, imageName }) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <Box
      filter={"auto"}
      transitionDuration={"750ms"}
      blur={isLoading ? "xl" : "none"}
      scale={isLoading ? "110" : "100"}
    >
      <Image
        src={baseUrl ? `${baseUrl}/${imageName}` : imageName}
        layout="fill"
        objectFit="cover"
        onLoadingComplete={() => setLoading(false)}
      />
    </Box>
  );
};

export default BlurImage;
