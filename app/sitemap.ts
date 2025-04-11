import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://attack-on-titan-survey.vercel.app";

  // 캐릭터 목록 - 이 캐릭터 이름들이 각각 공유 가능한 URL이 됩니다
  const characters = [
    "에렌 예거",
    "미카사 아커만",
    "아르민 알레르트",
    "리바이 아커만",
    "엘빈 스미스",
    "한지 조에",
    "지크 예거",
    "라이너 브라운",
    "애니 레온하트",
    "베르톨트 후버",
    "히스토리아 레이스",
    "가비 브라운",
    "팔코 그라이스",
    "피크 핑거",
  ];

  // 기본 URL
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
  ];

  // 각 캐릭터별 결과 페이지 URL
  const characterUrls = characters.map((char) => ({
    url: `${baseUrl}?char=${encodeURIComponent(char)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...routes, ...characterUrls];
}
