import { Box } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";

interface BlurImageProps {
  imageName: string;
  baseUrl?: string;
  rounded?: boolean;
  priority?: boolean;
}

const BlurImage: React.FC<BlurImageProps> = ({
  baseUrl,
  imageName,
  rounded,
  priority,
}) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <Box
      filter={"auto"}
      transitionDuration={"750ms"}
      blur={isLoading ? "xl" : "none"}
      scale={isLoading ? "110" : "100"}
      rounded={rounded ? "md" : "none"}
    >
      <Image
        src={baseUrl ? `${baseUrl}/${imageName}` : imageName}
        layout="fill"
        objectFit="cover"
        onLoadingComplete={() => setLoading(false)}
        priority={priority}
      />
    </Box>
  );
};

export default BlurImage;
