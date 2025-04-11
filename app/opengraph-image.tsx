import { ImageResponse } from "next/og";

export const runtime = "edge";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          color: "white",
          background: "linear-gradient(to bottom, #333333, #111111)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: "bold",
            marginBottom: 20,
            background: "linear-gradient(to right, #FC8D59, #D73027)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          진격의 거인
        </div>
        <div
          style={{
            fontSize: 60,
            fontWeight: "bold",
            marginBottom: 40,
          }}
        >
          캐릭터 테스트
        </div>
        <div
          style={{
            fontSize: 24,
            opacity: 0.8,
            marginTop: 20,
          }}
        >
          당신과 가장 닮은 캐릭터는 누구인가요?
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
