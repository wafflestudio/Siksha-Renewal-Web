import { Metadata } from "next";
import { Viewport } from "next";
import StyledComponentsRegistry from "providers/StyledComponentsRegistry";
import ContextProvider from "providers/ContextProvider";
import { ModalsProvider } from "providers/ModalsProvider";
import Script from "next/script";
import { GlobalStyleFixed } from "styles/globalstyle";
import Layout from "components/general/Layout";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "서울대학교 식단 알리미 : 식샤",
  description: "똑똑한 서울대학교 식단 앱, 식샤를 만나보세요!",
  icons: [
    { rel: "icon", url: "/manifest/icon-192x192.png", sizes: "maskable" },
    { rel: "apple-touch-icon", url: "/manifest/apple-icon.png" },
  ],
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
  verification: {
    google: "AnMTnRMI0ZtNg3N2Dn8HwdcWIgoeJ0dKUDcdkmJHksc",
  },
  other: {
    "naver-site-verification": "db18bbda827fc3568ba263ad091c58099938f65c",
  },
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
        <GlobalStyleFixed />
        <StyledComponentsRegistry>
          <ContextProvider>
            <ModalsProvider>
              <Suspense>
                <Layout>{children}</Layout>
              </Suspense>
            </ModalsProvider>
          </ContextProvider>
        </StyledComponentsRegistry>
        <Script
          type="text/javascript"
          rel="dns-prefetch"
          src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"
        />
      </body>
    </html>
  );
}
