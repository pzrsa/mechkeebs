import { Box } from "@chakra-ui/layout";

interface WrapperProps {}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <Box maxW="1200px" w="100%" mt={8} mx="auto">
      {children}
    </Box>
  );
};

export default Wrapper;
