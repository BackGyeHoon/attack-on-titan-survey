import "../styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "진격의 거인 캐릭터 테스트",
  description: "당신이 진격의 거인의 어떤 캐릭터와 가장 닮았는지 알아보세요!",
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
        <div className="content-container">
          <header className="text-center mb-6">
            <div className="flex items-center justify-center">
              <div className="h-1 bg-primary flex-grow opacity-50 max-w-[100px]"></div>
              <h1 className="titan-header text-3xl mx-4 tracking-wide">
                진격의 거인
              </h1>
              <div className="h-1 bg-primary flex-grow opacity-50 max-w-[100px]"></div>
            </div>
            <p className="text-muted mt-2">당신은 어떤 캐릭터와 닮았을까요?</p>
          </header>

          <main>{children}</main>

          <footer className="text-center mt-12 text-xs text-muted">
            <p>&copy; 2025 진격의 거인 캐릭터 테스트</p>
            <p className="mt-1">
              이 사이트는 애니메이션 &quot;진격의 거인&quot;의 팬 제작
              콘텐츠입니다.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
