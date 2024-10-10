import { Metadata } from "next";
import { Viewport } from "next";
import StyledComponentsRegistry from "./registry";
import ContextProvider from "context/ContextProvider";
import { ModalsProvider } from "context/ModalsProvider";
import { ToastProvider } from "context/ToastProvider";
import Script from "next/script";

export const metadata: Metadata = {
  title: "서울대학교 식단 알리미 : 식샤",
  description: "똑똑한 서울대학교 식단 앱, 식샤를 만나보세요!",
  icons: "/favicon.ico",
  openGraph: {
    url: "https://siksha.wafflestudio.com",
    type: "website",
    title: "서울대학교 식단 알리미 : 식샤",
    description: "똑똑한 서울대학교 식단 앱, 식샤를 만나보세요!",
    images: [
      {
        url: "https://siksha.wafflestudio.com/img/og-image.png",
        alt: "식샤",
      },
    ],
  },
  manifest: "/manifest/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#FF9522",
  initialScale: 1.0,
  width: "device-width",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <StyledComponentsRegistry>
          <ContextProvider>
            <ModalsProvider>
              <ToastProvider>{children}</ToastProvider>
            </ModalsProvider>
          </ContextProvider>
        </StyledComponentsRegistry>
        <Script
          type="text/javascript"
          rel="dns-prefetch"
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=721ee09bf246fd72ae86ca9f760a0233"
        />
        <Script
          type="text/javascript"
          rel="dns-prefetch"
          src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"
        />
      </body>
    </html>
  );
}
