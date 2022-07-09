import { Container } from "@chakra-ui/layout";

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <Container maxW={[null, "4xl", "5xl", "6xl", "7xl", "8xl"]} px={1} my={3}>
      {children}
    </Container>
  );
};

export default Wrapper;
