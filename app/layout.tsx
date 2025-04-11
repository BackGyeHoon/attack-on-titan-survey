import "../styles/globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import Image from "next/image";
import Script from "next/script";
import { generateStructuredData } from "./structured-data";

export const metadata: Metadata = {
  title: "진격의 거인 캐릭터 테스트 - 나와 닮은 캐릭터는?",
  description:
    "진격의 거인 캐릭터 테스트로 당신이 어떤 캐릭터와 가장 닮았는지 알아보세요! 에렌, 미카사, 리바이 등 인기 캐릭터와의 성향 일치도를 확인해보세요.",
  metadataBase: new URL("https://attack-on-titan-survey.vercel.app"),
  keywords: [
    "진격의 거인",
    "공격의 거인",
    "Attack on Titan",
    "성향 테스트",
    "캐릭터 테스트",
    "에렌 예거",
    "미카사 아커만",
    "리바이",
    "아르민",
    "애니메이션 캐릭터 테스트",
  ],
  openGraph: {
    title: "진격의 거인 캐릭터 테스트 - 나와 닮은 캐릭터는?",
    description:
      "진격의 거인 캐릭터 테스트로 당신이 어떤 캐릭터와 가장 닮았는지 알아보세요! 12가지 질문을 통해 에렌, 미카사, 리바이 등 인기 캐릭터와의 성향 일치도를 확인해보세요.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "진격의 거인 캐릭터 테스트",
      },
    ],
    locale: "ko_KR",
    type: "website",
    siteName: "진격의 거인 캐릭터 테스트",
  },
  twitter: {
    card: "summary_large_image",
    title: "진격의 거인 캐릭터 테스트 - 나와 닮은 캐릭터는?",
    description:
      "진격의 거인 캐릭터 테스트로 당신이 어떤 캐릭터와 가장 닮았는지 알아보세요! 12가지 질문을 통해 에렌, 미카사, 리바이 등 인기 캐릭터와의 성향 일치도를 확인해보세요.",
    images: ["/images/og-image.jpg"],
    site: "@your_twitter_handle",
  },
  alternates: {
    canonical: "https://attack-on-titan-survey.vercel.app",
    languages: {
      ko: "https://attack-on-titan-survey.vercel.app",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = generateStructuredData();

  return (
    <html lang="ko">
      <head>
        {/* Google Fonts 프리컨넥트 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* 필요한 폰트는 globals.css에 import되어 있음 */}

        {/* JSON-LD 구조화 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body>
        {/* Google Analytics 추가 (필요한 경우) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>

        {/* 비디오 배경 제거 */}
        <Analytics />
        <div className="content-container">
          <header className="text-center mb-6 p-4 rounded-lg bg-black bg-opacity-70">
            <div className="flex flex-col items-center justify-center">
              <div className="relative h-20 w-64 mb-2">
                <Image
                  src="/images/title.webp"
                  alt="진격의 거인"
                  fill
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>
              <p
                className="mt-2 text-amber-100 font-semibold"
                style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.8)" }}
              >
                당신은 어떤 캐릭터와 닮았을까요?
              </p>
            </div>
          </header>

          <main>{children}</main>

          <footer className="text-center mt-12 text-xs p-2 rounded-lg bg-black bg-opacity-70">
            <p
              className="text-amber-200"
              style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.8)" }}
            >
              &copy; 2025 진격의 거인 캐릭터 테스트
            </p>
            <p
              className="mt-1 text-amber-100"
              style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.8)" }}
            >
              이 사이트는 애니메이션 &quot;진격의 거인&quot;의 팬 제작
              콘텐츠입니다.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
