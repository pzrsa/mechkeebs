import Footer from "./Footer";
import Navbar from "./Navbar";
import Wrapper from "./Wrapper";

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Wrapper>
        {children}
        <Footer />
      </Wrapper>
    </>
  );
};

export default Layout;
