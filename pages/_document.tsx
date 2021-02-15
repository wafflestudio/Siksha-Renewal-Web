import Document, { DocumentContext } from 'next/document'
import { Fragment } from 'react';
import { ServerStyleSheet } from 'styled-components'
import GlobalStyle from '../components/Common/Layout'

class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<Fragment><GlobalStyle /><App {...props} /></Fragment>)
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } catch (error) {
      throw error;
    } finally {
      sheet.seal();
    }
  }
}

export default CustomDocument;