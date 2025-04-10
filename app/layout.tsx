import "../styles/globals.css";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "진격의 거인 캐릭터 테스트",
  description: "당신이 진격의 거인의 어떤 캐릭터와 가장 닮았는지 알아보세요!",
  openGraph: {
    title: "진격의 거인 캐릭터 테스트",
    description: "당신이 진격의 거인의 어떤 캐릭터와 가장 닮았는지 알아보세요!",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "진격의 거인 캐릭터 테스트",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "진격의 거인 캐릭터 테스트",
    description: "당신이 진격의 거인의 어떤 캐릭터와 가장 닮았는지 알아보세요!",
    images: ["/api/og"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      </head>
      <body>
        {/* 비디오 배경 제거 */}
        
        <div className="content-container">
          <header className="text-center mb-6 p-4 rounded-lg bg-black bg-opacity-70">
            <div className="flex flex-col items-center justify-center">
              <div className="relative h-20 w-64 mb-2">
                <Image 
                  src="/images/title.webp" 
                  alt="진격의 거인" 
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
              <p className="mt-2 text-amber-100 font-semibold" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)' }}>당신은 어떤 캐릭터와 닮았을까요?</p>
            </div>
          </header>

          <main>{children}</main>

          <footer className="text-center mt-12 text-xs p-2 rounded-lg bg-black bg-opacity-70">
            <p className="text-amber-200" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)' }}>&copy; 2025 진격의 거인 캐릭터 테스트</p>
            <p className="mt-1 text-amber-100" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)' }}>
              이 사이트는 애니메이션 &quot;진격의 거인&quot;의 팬 제작
              콘텐츠입니다.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
