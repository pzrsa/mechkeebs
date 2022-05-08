import Document, { Head, Html, Main, NextScript } from "next/document";

class MechKeebsDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="icon"
            type="image/svg+xml"
            href="/assets/images/favicons/favicon.svg"
          />
          <link
            rel="icon"
            type="image/png"
            href="/assets/images/favicons/favicon.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/assets/images/favicons/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/assets/images/favicons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/assets/images/favicons/favicon-16x16.png"
          />
          <link
            rel="manifest"
            href="/assets/images/favicons/site.webmanifest"
          />
          <link
            rel="mask-icon"
            href="/assets/images/favicons/safari-pinned-tab.svg"
            color="#111111"
          />
          <link
            rel="shortcut icon"
            href="/assets/images/favicons/favicon.ico"
          />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta
            name="msapplication-config"
            content="/assets/images/favicons/browserconfig.xml"
          />
          <meta name="theme-color" content="#ffffff" />
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
