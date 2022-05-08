import Document, { Head, Html, Main, NextScript } from "next/document";

class MechKeebsDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="icon"
            type="image/svg+xml"
            href="/assets/images/favicon/favicon.svg"
          />
          <link
            rel="icon"
            type="image/png"
            href="/assets/images/favicon/favicon.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MechKeebsDocument;
