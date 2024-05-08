import Head from "next/head";
import "/styles/calendar.css";
import axios from "axios";
import { useEffect } from "react";
import APIendpoint from "../constants/constants";
import ContextProvider from "../hooks/ContextProvider";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    axios
      .post(
        `${APIendpoint()}/auth/refresh`,
        {},
        { headers: { "authorization-token": `Bearer ${access_token}` } },
      )
      .then((res) => {
        localStorage.setItem("access_token", res.data.access_token);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  return (
    <ContextProvider>
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
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=721ee09bf246fd72ae86ca9f760a0233"
        />
      </Head>
      <Component {...pageProps} />
    </ContextProvider>
  );
}

export default MyApp;
