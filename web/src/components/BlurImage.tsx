import { Skeleton } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import { GCLOUD_BUCKET_NAME } from "../data/constants";

interface BlurImageProps {
  imageName: string;
}

const BlurImage: React.FC<BlurImageProps> = ({ imageName }) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <Skeleton isLoaded={!isLoading}>
      <Image
        src={`https://storage.googleapis.com/${GCLOUD_BUCKET_NAME}/${imageName}`}
        layout="fill"
        objectFit="cover"
        onLoadingComplete={() => setLoading(false)}
      />
    </Skeleton>
  );
};

export default BlurImage;
