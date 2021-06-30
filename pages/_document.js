import Document, { Head, Main, Html, NextScript } from 'next/document';


export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <title>서울대학교 식단 알리미 : 식샤</title>
                    <meta charSet="utf-8"/>
                    <link rel="icon" href="/favicon.ico"/>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                    {/* eslint-disable-next-line @next/next/no-sync-scripts */}
                    <script type="text/javascript"
                            src="//dapi.kakao.com/v2/maps/sdk.js?appkey=97c9bf23c521ad7495139a70e395b4eb"/>
                </Head>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        );
    }
}
