import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

// 이미지 경로 매핑 (components/survey/Result.tsx의 getDefaultImage와 동일)
const characterImageMap: Record<string, string> = {
  "에렌 예거": "/images/eren.webp",
  "미카사 아커만": "/images/mikasa.webp",
  "아르민 알레르트": "/images/armin.webp",
  "리바이 아커만": "/images/levi.webp",
  "엘빈 스미스": "/images/erwin.webp",
  "한지 조에": "/images/hange.webp",
  "지크 예거": "/images/zeke.webp",
  "라이너 브라운": "/images/reiner.webp",
  "애니 레온하트": "/images/annie.webp",
  "베르톨트 후버": "/images/bertholdt.webp",
  "히스토리아 레이스": "/images/historia.webp",
  "가비 브라운": "/images/gabi.webp",
  "팔코 그라이스": "/images/falco.webp",
  "피크 핑거": "/images/pieck.webp",
  "코니 스프링거": "/images/connie.webp",
  "사샤 블라우스": "/images/sasha.webp",
  "장 키르슈타인": "/images/jean.webp",
  "그리샤 예거": "/images/grisha.webp",
  "카를라 예거": "/images/carla.webp",
  "프록 폴스타": "/images/floch.webp",
  "케니 아커만": "/images/kenny.webp",
  "도트 픽시스": "/images/pixis.webp",
  유미르: "/images/ymir.webp",
  "포르코 갤리아드": "/images/porco.webp",
  "마르코 보트": "/images/marco.webp",
};

// 기본 OG 이미지 URL - public 폴더 내 이미지 사용
const DEFAULT_OG_IMAGE = "/images/og-image.webp";

// URL 정보 추출 함수
function extractUrlInfo(request: NextRequest) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const host = request.headers.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http://" : "https://";

  return { searchParams, host, protocol };
}

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams, host, protocol } = extractUrlInfo(request);
    const character = searchParams.get("char");

    // URL 디코딩 적용
    const characterName = character
      ? decodeURIComponent(character)
      : "진격의 거인 캐릭터 테스트";

    console.log("Request URL:", request.url);
    console.log("Host:", host);
    console.log("Protocol:", protocol);
    console.log("Character param:", character);
    console.log("Decoded character name:", characterName);
    console.log(
      "Has image mapping:",
      characterName && characterImageMap[characterName] ? "Yes" : "No"
    );

    // 이미지 URL 결정
    let imagePath = DEFAULT_OG_IMAGE; // 기본 이미지로 DEFAULT_OG_IMAGE 상수 사용

    if (character && characterImageMap[characterName]) {
      imagePath = characterImageMap[characterName];
    }

    const imageUrl = `${protocol}${host}${imagePath}`;

    // OG 이미지 응답 생성
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            backgroundColor: "#1a1a1a",
            color: "#fff",
            fontFamily: "sans-serif",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* 배경 이미지 */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "#1a1a1a",
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(0.7)",
              opacity: 0.8,
            }}
          />

          {/* 캐릭터 이름 */}
          <div
            style={{
              position: "absolute",
              bottom: 60,
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: 60,
              fontWeight: "bold",
              textAlign: "center",
              padding: "20px 40px",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              borderRadius: 20,
              maxWidth: "80%",
              zIndex: 10,
            }}
          >
            {characterName}
          </div>

          {/* 사이트 제목 */}
          <div
            style={{
              position: "absolute",
              top: 60,
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: 40,
              fontWeight: "bold",
              textAlign: "center",
              padding: "20px 40px",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              borderRadius: 20,
              zIndex: 10,
            }}
          >
            진격의 거인 캐릭터 테스트
          </div>

          {/* 로고나 추가 정보가 필요하면 여기에 추가 */}
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error("OG 이미지 생성 중 오류:", error);

    // 에러 발생 시 기본 이미지로 fallback하여 ImageResponse 생성
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            backgroundColor: "#1a1a1a",
            color: "#fff",
            fontFamily: "sans-serif",
          }}
        >
          <div
            style={{
              fontSize: 60,
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            진격의 거인 캐릭터 테스트
          </div>
          <div
            style={{
              fontSize: 30,
              textAlign: "center",
            }}
          >
            당신과 닮은 캐릭터를 찾아보세요!
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }
}
