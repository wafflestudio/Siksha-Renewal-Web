import Head from "next/head";
import "styles/calendar.css";
import ContextProvider from "../hooks/ContextProvider";
import Layout from "components/general/Layout";
import { GlobalStyle } from "styles/globalstyle";
import { ModalsProvider } from "context/ModalsProvider";
import { useEffect } from "react";
import { analytics } from "utils/api/firebase";
import { logEvent } from "firebase/analytics";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (!analytics) return;
    logEvent(analytics, "page_view", {
      page_location: window.location.href,
      page_path: window.location.pathname,
      page_title: document.title,
    });
  }, [analytics]);

  return (
    <>
      <GlobalStyle />
      <ContextProvider>
        <ModalsProvider>
          <Head>
            <title>서울대학교 식단 알리미 : 식샤</title>
            <meta charSet="utf-8" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="manifest" href="/manifest/manifest.json" />
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width viewport-fit=cover"
            />
            <meta property="og:image" content="https://siksha.wafflestudio.com/img/og-image.png" />
            {/* eslint-disable-next-line @next/next/no-sync-scripts */}
            
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <script
              type="text/javascript"
              rel="dns-prefetch"
              src="//dapi.kakao.com/v2/maps/sdk.js?appkey=721ee09bf246fd72ae86ca9f760a0233"
            />
            <script
              type="text/javascript"
              rel="dns-prefetch"
              src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"
            />
        </ModalsProvider>
      </ContextProvider>
    </>
  );
}

export default MyApp;
