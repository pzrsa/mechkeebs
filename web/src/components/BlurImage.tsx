import { Box } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import { GCLOUD_BUCKET_NAME } from "../data/constants";

interface BlurImageProps {
  imageName: string;
}

const BlurImage: React.FC<BlurImageProps> = ({ imageName }) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <Box
      filter={"auto"}
      transitionDuration={"750ms"}
      blur={isLoading ? "xl" : "none"}
      scale={isLoading ? "110" : "100"}
    >
      <Image
        src={`https://storage.googleapis.com/${GCLOUD_BUCKET_NAME}/${imageName}`}
        layout="fill"
        objectFit="cover"
        onLoadingComplete={() => setLoading(false)}
      />
    </Box>
  );
};

export default BlurImage;
