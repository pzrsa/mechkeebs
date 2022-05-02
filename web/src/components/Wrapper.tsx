import { Container } from "@chakra-ui/layout";

interface WrapperProps {}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <Container maxW="85rem" w="100%" px={1} my={3}>
      {children}
    </Container>
  );
};

export default Wrapper;
