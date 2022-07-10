import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Wrapper from "./Wrapper";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();

  const title = "MechKeebs";
  const description =
    "MechKeebs - An online community for sharing and discovering your next mechanical keyboard.";
  const image = "/assets/images/favicons/favicon.png";

  return (
    <>
      <Head>
        <meta name="robots" content="all" />
        <meta content={description} name="description" />
        <meta
          property="og:url"
          content={`https://mechkeebs.com${router.asPath}`}
        />
        <link rel="canonical" href={`https://mechkeebs.com${router.asPath}`} />
        <meta property="og:site_name" content={title} key="og:site_name" />
        <meta property="og:description" content={description} />
        <meta property="og:title" content={title} key="og:title" />
        <meta
          property="og:image"
          content={`https://mechkeebs.com${image}`}
          key="og:image"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@_parsam" />
        <meta name="twitter:title" content={title} key="twitter:title" />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content={`https://mechkeebs.com${image}`}
          key="twitter:image"
        />
      </Head>
      <Navbar />
      <Wrapper>
        <main>{children}</main>
        <Footer />
      </Wrapper>
    </>
  );
};

export default Layout;
