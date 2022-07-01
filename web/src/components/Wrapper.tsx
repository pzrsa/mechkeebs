import { Container } from "@chakra-ui/layout";

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <Container maxW={"100%"} px={1} my={3}>
      {children}
    </Container>
  );
};

export default Wrapper;
