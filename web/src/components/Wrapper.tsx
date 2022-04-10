import { Box } from "@chakra-ui/layout";

interface WrapperProps {}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <Box mb={5} maxW="1200px" w="100%" px={1} mt={8} mx="auto">
      {children}
    </Box>
  );
};

export default Wrapper;
