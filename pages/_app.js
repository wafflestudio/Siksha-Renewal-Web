import Head from "next/head";
import "/styles/calendar.scss"

function MyApp({ Component, pageProps }) {
  return (
      <>
        <Head>
          <title>서울대학교 식단 알리미 : 식샤</title>
          <meta charSet="utf-8" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Component {...pageProps} />
      </>
  )
}

export default MyApp
