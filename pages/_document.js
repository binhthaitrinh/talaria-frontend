import Document, { Html, Main, NextScript, Head } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getStaticProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getStaticProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  // render() {
  //   return (
  //     <html>
  //       <Head />
  //       <body>
  //         <Main />
  //         {/* Here we will mount our modal portal */}
  //         <div id="modal" />
  //         <NextScript />
  //       </body>
  //     </html>
  //   );
  // }
}
