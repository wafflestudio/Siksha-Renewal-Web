import Head from "next/head";
import "styles/calendar.css";
import ContextProvider from "../hooks/ContextProvider";
import LoginModalProvider from "components/LoginModalProvider";
import Layout from "components/general/Layout";
function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <LoginModalProvider />
      <Head>
        <title>서울대학교 식단 알리미 : 식샤</title>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:image" content="https://siksha.wafflestudio.com/img/og-image.png" />
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          type="text/javascript"
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=721ee09bf246fd72ae86ca9f760a0233"
        />
        <script
          type="text/javascript"
          src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ContextProvider>
  );
}

export default MyApp;
