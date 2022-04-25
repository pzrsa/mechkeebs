import { Container } from "@chakra-ui/layout";

interface WrapperProps {}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <Container mb={5} maxW="85rem" w="100%" px={1} mt={8} mx="auto">
      {children}
    </Container>
  );
};

export default Wrapper;
