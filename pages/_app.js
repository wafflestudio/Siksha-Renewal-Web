import Head from "next/head";
import "/styles/calendar.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>서울대학교 식단 알리미 : 식샤</title>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          hid="og:image"
          property="og:image"
          content="https://siksha.wafflestudio.com/img/og-image.png"
        />
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          type="text/javascript"
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=97c9bf23c521ad7495139a70e395b4eb"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
