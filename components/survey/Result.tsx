import React, { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";

// Character 인터페이스 정의
interface Character {
  name: string;
  description: string;
  image?: string;
  compatibleCharacters?: string[];
  incompatibleCharacter?: string;
}

interface ResultProps {
  character: string | Character;
  description?: string;
  image?: string;
  onReset: () => void;
  compatibleCharacters?: string[];
  incompatibleCharacter?: string;
}

// 캐릭터 이름 가져오기 (문자열 또는 객체)
const getCharacterName = (character: string | Character): string => {
  return typeof character === "object" ? character.name : character;
};

// 캐릭터 이미지 경로 가져오기
const getDefaultImage = (name: string): string | null => {
  const imageMap: Record<string, string> = {
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
    "이렌 다크스파이크": "/images/darkspike.webp",
  };

  return imageMap[name] || null;
};

// 캐릭터 특성 정보 가져오기
const getAttributes = (name: string) => {
  // 속성 타입 정의
  type Attribute = {
    name: string;
    value: number;
    type: string;
  };

  // 캐릭터별 특성 값
  const characterAttributes: Record<
    string,
    {
      strength: number;
      intelligence: number;
      leadership: number;
      compassion: number;
    }
  > = {
    "에렌 예거": { strength: 8, intelligence: 6, leadership: 7, compassion: 4 },
    "미카사 아커만": {
      strength: 10,
      intelligence: 7,
      leadership: 6,
      compassion: 6,
    },
    "아르민 알레르트": {
      strength: 4,
      intelligence: 10,
      leadership: 8,
      compassion: 9,
    },
    "리바이 아커만": {
      strength: 10,
      intelligence: 8,
      leadership: 9,
      compassion: 6,
    },
    "엘빈 스미스": {
      strength: 7,
      intelligence: 10,
      leadership: 10,
      compassion: 5,
    },
    "한지 조에": {
      strength: 6,
      intelligence: 10,
      leadership: 8,
      compassion: 7,
    },
    "지크 예거": { strength: 7, intelligence: 9, leadership: 8, compassion: 4 },
    "라이너 브라운": {
      strength: 9,
      intelligence: 6,
      leadership: 7,
      compassion: 7,
    },
    "애니 레온하트": {
      strength: 9,
      intelligence: 8,
      leadership: 5,
      compassion: 3,
    },
    "베르톨트 후버": {
      strength: 8,
      intelligence: 7,
      leadership: 5,
      compassion: 6,
    },
    "히스토리아 레이스": {
      strength: 5,
      intelligence: 7,
      leadership: 8,
      compassion: 9,
    },
    "가비 브라운": {
      strength: 7,
      intelligence: 6,
      leadership: 6,
      compassion: 3,
    },
    "팔코 그라이스": {
      strength: 5,
      intelligence: 7,
      leadership: 6,
      compassion: 9,
    },
    "피크 핑거": { strength: 7, intelligence: 9, leadership: 7, compassion: 6 },
    "코니 스프링거": {
      strength: 7,
      intelligence: 6,
      leadership: 5,
      compassion: 8,
    },
    "사샤 블라우스": {
      strength: 7,
      intelligence: 5,
      leadership: 5,
      compassion: 8,
    },
    "장 키르슈타인": {
      strength: 8,
      intelligence: 7,
      leadership: 8,
      compassion: 6,
    },
    "그리샤 예거": {
      strength: 6,
      intelligence: 9,
      leadership: 7,
      compassion: 6,
    },
    "카를라 예거": {
      strength: 3,
      intelligence: 6,
      leadership: 5,
      compassion: 10,
    },
    "프록 폴스타": {
      strength: 6,
      intelligence: 6,
      leadership: 7,
      compassion: 2,
    },
    "케니 아커만": {
      strength: 9,
      intelligence: 8,
      leadership: 7,
      compassion: 3,
    },
    "도트 픽시스": {
      strength: 6,
      intelligence: 8,
      leadership: 9,
      compassion: 7,
    },
    유미르: { strength: 8, intelligence: 7, leadership: 6, compassion: 5 },
    "포르코 갤리아드": {
      strength: 8,
      intelligence: 6,
      leadership: 5,
      compassion: 4,
    },
    "마르코 보트": {
      strength: 6,
      intelligence: 7,
      leadership: 7,
      compassion: 9,
    },
    "이렌 다크스파이크": {
      strength: 10,
      intelligence: 9,
      leadership: 9,
      compassion: 2,
    },
    // 기본값
    default: { strength: 7, intelligence: 7, leadership: 7, compassion: 7 },
  };

  // 캐릭터에 해당하는 특성 값 가져오기 (없으면 기본값 사용)
  const attrs = characterAttributes[name] || characterAttributes["default"];

  // 배열 형태로 변환하여 반환
  const attributeList: Attribute[] = [
    { name: "전투력", value: attrs.strength, type: "strength" },
    { name: "지능", value: attrs.intelligence, type: "intelligence" },
    { name: "리더십", value: attrs.leadership, type: "leadership" },
    { name: "공감능력", value: attrs.compassion, type: "compassion" },
  ];

  return attributeList;
};

// 기본 호환 캐릭터 가져오기
const getDefaultCompatibles = (name: string): string[] => {
  const compatibilityMap: Record<string, string[]> = {
    "에렌 예거": ["미카사 아커만", "아르민 알레르트"],
    "미카사 아커만": ["에렌 예거", "아르민 알레르트"],
    "아르민 알레르트": ["에렌 예거", "미카사 아커만"],
    "리바이 아커만": ["한지 조에", "엘빈 스미스"],
    "엘빈 스미스": ["리바이 아커만", "한지 조에"],
    "한지 조에": ["리바이 아커만", "엘빈 스미스"],
    "지크 예거": ["피크 핑거", "라이너 브라운"],
    "라이너 브라운": ["베르톨트 후버", "애니 레온하트"],
    "애니 레온하트": ["라이너 브라운", "아르민 알레르트"],
    "베르톨트 후버": ["라이너 브라운", "애니 레온하트"],
  };

  return compatibilityMap[name] || ["미카사 아커만", "아르민 알레르트"];
};

// 기본 비호환 캐릭터 가져오기
const getDefaultIncompatible = (name: string): string => {
  const incompatibilityMap: Record<string, string> = {
    "에렌 예거": "지크 예거",
    "미카사 아커만": "지크 예거",
    "아르민 알레르트": "애니 레온하트",
    "리바이 아커만": "지크 예거",
    "엘빈 스미스": "지크 예거",
    "한지 조에": "지크 예거",
    "지크 예거": "리바이 아커만",
  };

  return incompatibilityMap[name] || "지크 예거";
};

// 캐릭터별 명언 모음
const getCharacterQuotes = (name: string): string[] => {
  const quotesMap: Record<string, string[]> = {
    "에렌 예거": [
      "나는 앞으로 나아갈 것이다. 적을 모조리 쓸어버릴 때까지.",
      "내가 태어났을 때부터 자유였으니까.",
      "싸워야 이길 수 있다. 이기지 않으면 죽는다. 이겨야 산다!",
    ],
    "미카사 아커만": [
      "세상은 잔혹해. 그렇기 때문에 아름답다.",
      "이 세상은 잔인하지만, 당신이 있으면 충분해요.",
      "당신이 싸울 때 나도 싸울게요.",
    ],
    "아르민 알레르트": [
      "포기한다는 것은 죽은 사람들의 희생을 버리는 것이다.",
      "미래는 항상 바뀔 수 있어.",
      "지금 해결할 수 없는 문제는 내일의 내가 해결할 수 있다.",
    ],
    "리바이 아커만": [
      "선택에는 후회 없이.",
      "실수해도 괜찮아. 다음에 살아있지 않을 거니까.",
      "딱 두 가지 선택이 있어. 조용히 죽든지, 아니면 싸워서 이기든지.",
    ],
  };
  return quotesMap[name] || [];
};

// 공통 명언 모음
const commonQuotes = [
  "세상은 잔혹하지만 아름답다.",
  "바람 앞의 촛불보다 더 나약한 존재는 없다.",
  "인간이 무엇인가를 포기할 때, 그것은 인간 자신을 포기하는 것과 같다.",
  "승리의 대가는 싸움의 기꺼움이다.",
  "우리의 적은 단지 거인들뿐이 아니다. 인류의 모든 불행은 인간에게서 비롯된다.",
];

// 캐릭터 호환 이유 가져오기
const getCompatibleReason = (mainChar: string, compatChar: string): string => {
  // 특정 캐릭터 조합에 대한 맞춤형 이유
  const reasonMap: Record<string, Record<string, string>> = {
    "에렌 예거": {
      "미카사 아커만":
        "어린 시절부터 함께한 동료로서 서로를 보호하는 관계입니다.",
      "아르민 알레르트": "전략적 사고와 실행력이 결합되어 시너지를 발휘합니다.",
    },
    "리바이 아커만": {
      "한지 조에":
        "서로 다른 접근 방식을 가지고 있지만 상호 보완적인 관계입니다.",
      "엘빈 스미스": "강력한 신뢰를 바탕으로 한 최고의 전투 파트너입니다.",
    },
  };

  // 맞춤형 이유가 있으면 반환, 없으면 기본 이유 반환
  return (
    reasonMap[mainChar]?.[compatChar] || "함께할 때 더 강해지는 관계입니다."
  );
};

// 캐릭터 비호환 이유 가져오기
const getIncompatibleReason = (
  mainChar: string,
  incompatChar: string
): string => {
  // 특정 캐릭터 조합에 대한 맞춤형 이유
  const reasonMap: Record<string, Record<string, string>> = {
    "에렌 예거": {
      "지크 예거":
        "서로 다른 이상과 접근 방식으로 인해 근본적인 갈등이 있습니다.",
    },
    "미카사 아커만": {
      "지크 예거": "에렌을 향한 서로의 감정과 보호 의지가 충돌합니다.",
    },
  };

  // 맞춤형 이유가 있으면 반환, 없으면 기본 이유 반환
  return (
    reasonMap[mainChar]?.[incompatChar] ||
    "가치관과 목표의 차이로 인해 충돌이 자주 발생합니다."
  );
};

export function Result({
  character,
  description,
  image,
  onReset,
  compatibleCharacters = [],
  incompatibleCharacter,
}: ResultProps) {
  const [mounted, setMounted] = useState(false);
  const [randomQuote, setRandomQuote] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [shareMessage, setShareMessage] = useState("");
  const [isCapturing, setIsCapturing] = useState(false);

  // 결과 컨테이너에 대한 ref 생성
  const resultRef = useRef<HTMLDivElement>(null);

  // 캐릭터 이름 가져오기
  const characterName = getCharacterName(character);
  const characterDesc =
    description || (typeof character === "object" ? character.description : "");

  // 호환 캐릭터 처리
  const compatibles =
    compatibleCharacters.length > 0
      ? compatibleCharacters
      : typeof character === "object" && character.compatibleCharacters
      ? character.compatibleCharacters
      : getDefaultCompatibles(characterName);

  // 비호환 캐릭터 처리
  const incompatible =
    incompatibleCharacter ||
    (typeof character === "object" && character.incompatibleCharacter) ||
    getDefaultIncompatible(characterName);

  // 컴포넌트 마운트 시 랜덤 인용구 선택
  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      const characterQuotes = getCharacterQuotes(characterName);
      const availableQuotes =
        characterQuotes.length > 0 ? characterQuotes : commonQuotes;
      const randomIndex = Math.floor(Math.random() * availableQuotes.length);
      setRandomQuote(availableQuotes[randomIndex]);
    }
  }, [mounted, characterName]);

  // 공유 URL 생성
  const generateShareUrl = () => {
    // 기본 URL (배포된 사이트 주소)
    const baseUrl =
      typeof window !== "undefined"
        ? `${window.location.protocol}//${window.location.host}`
        : "https://attack-on-titan-survey.vercel.app";

    // URL 인코딩된 캐릭터 이름
    const encodedName = encodeURIComponent(characterName);

    // URL 파라미터로 캐릭터 이름 추가
    return `${baseUrl}?char=${encodedName}`;
  };

  // 공유 기능
  const handleShare = async () => {
    const shareUrl = generateShareUrl();

    try {
      // 클립보드에 URL 복사
      await navigator.clipboard.writeText(shareUrl);
      setShareMessage(
        `"${characterName}" 결과 URL이 복사되었습니다. 원하는 곳에 붙여넣으세요!`
      );
      setShowModal(true);
    } catch (error) {
      console.error("URL 복사 중 오류 발생:", error);
      setShareMessage("URL 복사에 실패했습니다. 다시 시도해 주세요.");
      setShowModal(true);
    }
  };

  // 결과 캡쳐 기능
  const handleCapture = async () => {
    if (!resultRef.current) return;

    try {
      setIsCapturing(true);

      // 캡쳐 전 스타일 적용
      const targetElement = resultRef.current;
      // originalStyles 변수 제거 (사용하지 않음)
      const originalBackground = targetElement.style.background;

      // 캡쳐 대상에 임시 배경 스타일 적용
      targetElement.style.background = "#1a1a1a";
      targetElement.style.padding = "20px";
      targetElement.style.borderRadius = "12px";

      // html2canvas 설정
      const canvas = await html2canvas(targetElement, {
        allowTaint: true,
        useCORS: true,
        scale: 2, // 고해상도 이미지를 위해 스케일 2배
        backgroundColor: "#1a1a1a",
        logging: false,
      });

      // 원래 스타일로 복원
      targetElement.style.background = originalBackground;

      // 이미지 데이터 URL 가져오기
      const imageData = canvas.toDataURL("image/png");

      // 이미지를 클립보드에 복사하기
      try {
        // Canvas를 Blob으로 변환
        const blobPromise = new Promise<Blob>((resolve) => {
          canvas.toBlob((blob) => {
            if (blob) {
              resolve(blob);
            }
          }, "image/png");
        });

        const blob = await blobPromise;

        // ClipboardItem API 사용
        if (navigator.clipboard && navigator.clipboard.write) {
          const clipboardItem = new ClipboardItem({
            "image/png": blob,
          });
          await navigator.clipboard.write([clipboardItem]);

          // 클립보드에 복사 성공 메시지
          setShareMessage(
            "이미지가 클립보드에 복사되었습니다. 원하는 곳에 붙여넣기하여 공유하세요!"
          );
        } else {
          // 구형 브라우저나 모바일에서는 다운로드 옵션 제공
          const downloadLink = document.createElement("a");
          downloadLink.href = imageData;
          downloadLink.download = `${characterName}_결과.png`;
          downloadLink.click();

          setShareMessage(
            "이미지가 다운로드되었습니다. 원하는 곳에 공유하세요!"
          );
        }
      } catch (clipboardError) {
        console.warn("클립보드 복사 실패, 다운로드로 대체:", clipboardError);
        // 클립보드 API 지원되지 않거나 실패한 경우 다운로드로 대체
        const downloadLink = document.createElement("a");
        downloadLink.href = imageData;
        downloadLink.download = `${characterName}_결과.png`;
        downloadLink.click();

        setShareMessage("이미지가 다운로드되었습니다. 원하는 곳에 공유하세요!");
      }

      setIsCapturing(false);
      setShowModal(true);
    } catch (error) {
      console.error("이미지 캡쳐 중 오류 발생:", error);
      setIsCapturing(false);
      setShareMessage("이미지 캡쳐에 실패했습니다. 다시 시도해 주세요.");
      setShowModal(true);
    }
  };

  // 모달 닫기
  const closeModal = () => {
    setShowModal(false);
    setShareMessage("");
  };

  return (
    <div className="w-full space-y-6">
      <div ref={resultRef} className="result-container">
        <div className="text-center mb-4">
          <h2 className="soft-title text-xl sm:text-2xl md:text-3xl mb-3">
            당신과 가장 닮은 캐릭터는
          </h2>
          <h1 className="soft-title text-2xl sm:text-3xl md:text-4xl text-primary">
            {characterName}
          </h1>
        </div>

        {/* 모바일 반응형 캐릭터 이미지와 정보 레이아웃 */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
          <div className="w-full md:w-1/3 flex flex-col items-center">
            <div className="avatar-container w-36 h-36 sm:w-48 sm:h-48 md:w-full md:max-w-[250px] md:h-auto aspect-square mb-4">
              {image || getDefaultImage(characterName) ? (
                <img
                  src={image || getDefaultImage(characterName) || ""}
                  alt={characterName}
                  className="avatar-image"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = ""; // 에러 시 빈 이미지로
                    e.currentTarget.style.background = `var(--accent)`;
                    e.currentTarget.style.display = "flex";
                    e.currentTarget.style.alignItems = "center";
                    e.currentTarget.style.justifyContent = "center";
                    e.currentTarget.setAttribute(
                      "data-content",
                      characterName.charAt(0)
                    );

                    // 첫 글자를 보여주는 가상 요소 생성
                    const textNode = document.createTextNode(
                      characterName.charAt(0)
                    );
                    e.currentTarget.appendChild(textNode);
                    e.currentTarget.style.fontSize = "2.5rem";
                    e.currentTarget.style.color = "white";
                    e.currentTarget.style.fontWeight = "bold";
                  }}
                />
              ) : (
                <div className="avatar-fallback">{characterName.charAt(0)}</div>
              )}
            </div>

            {/* 캐릭터 명언 (모바일에서는 이미지 아래에 표시) */}
            {mounted && randomQuote && (
              <div className="italic text-sm text-center text-muted mb-4 md:mb-0 p-4 rounded-md bg-primary-light bg-opacity-20">
                &ldquo;{randomQuote}&rdquo;
              </div>
            )}
          </div>

          <div className="w-full md:w-2/3 space-y-4">
            <p className="text-sm sm:text-base leading-relaxed mb-4">
              {characterDesc}
            </p>

            {/* 캐릭터 특성 */}
            <div className="space-y-3">
              {getAttributes(characterName).map((attr, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{attr.name}</span>
                    <span>{attr.value}/10</span>
                  </div>
                  <div className="stat-bar-container">
                    <div
                      className={`stat-bar stat-bar-${attr.type}`}
                      style={{ width: `${attr.value * 10}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 캐릭터 관계 정보 */}
        <div className="space-y-6 mt-8">
          <h3 className="soft-title text-lg sm:text-xl">캐릭터 관계</h3>

          {/* 서로 잘 맞는 캐릭터들 */}
          <div className="space-y-2">
            <h4 className="text-base sm:text-lg font-medium text-accent">
              잘 맞는 캐릭터
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
              {compatibles.length > 0 ? (
                compatibles.map((compatChar, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center p-2 bg-primary-light bg-opacity-20 rounded-lg"
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-accent mb-2">
                      <img
                        src={getDefaultImage(compatChar) || ""}
                        alt={compatChar}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.style.display = "flex";
                          e.currentTarget.style.alignItems = "center";
                          e.currentTarget.style.justifyContent = "center";
                          e.currentTarget.style.background = `var(--accent)`;
                          e.currentTarget.style.color = "white";
                          e.currentTarget.style.fontSize = "1.5rem";
                          e.currentTarget.style.fontWeight = "bold";
                          e.currentTarget.textContent = compatChar.charAt(0);
                        }}
                      />
                    </div>
                    <span className="text-sm text-center font-medium">
                      {compatChar}
                    </span>
                    <span className="text-xs text-center text-muted mt-1">
                      {getCompatibleReason(characterName, compatChar)}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted col-span-2">
                  호환되는 캐릭터 정보가 없습니다.
                </p>
              )}
            </div>
          </div>

          {/* 맞지 않는 캐릭터 */}
          {incompatible && (
            <div className="space-y-2">
              <h4 className="text-base sm:text-lg font-medium text-accent">
                맞지 않는 캐릭터
              </h4>
              <div className="flex flex-col sm:flex-row items-center p-3 bg-primary-light bg-opacity-20 rounded-lg">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-accent mb-2 sm:mb-0 sm:mr-4">
                  <img
                    src={getDefaultImage(incompatible) || ""}
                    alt={incompatible}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.style.display = "flex";
                      e.currentTarget.style.alignItems = "center";
                      e.currentTarget.style.justifyContent = "center";
                      e.currentTarget.style.background = `var(--accent)`;
                      e.currentTarget.style.color = "white";
                      e.currentTarget.style.fontSize = "1.5rem";
                      e.currentTarget.style.fontWeight = "bold";
                      e.currentTarget.textContent = incompatible.charAt(0);
                    }}
                  />
                </div>
                <div>
                  <span className="text-base font-medium block text-center sm:text-left">
                    {incompatible}
                  </span>
                  <span className="text-sm text-muted block mt-1 text-center sm:text-left">
                    {getIncompatibleReason(characterName, incompatible)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 버튼 그룹 - 모바일에서는 스택으로, 데스크톱에서는 나란히 배치 */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
        <button
          onClick={onReset}
          className="soft-button w-full sm:w-auto px-6 py-3 rounded-lg flex items-center justify-center"
          onTouchEnd={(e) => {
            e.preventDefault(); // 기본 터치 이벤트 방지
            onReset();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
            <path d="M3 3v5h5"></path>
          </svg>
          다시 검사하기
        </button>

        <button
          onClick={handleShare}
          className="soft-button-primary w-full sm:w-auto px-6 py-3 rounded-lg flex items-center justify-center"
          onTouchEnd={(e) => {
            e.preventDefault(); // 기본 터치 이벤트 방지
            handleShare();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
            <polyline points="16 6 12 2 8 6"></polyline>
            <line x1="12" y1="2" x2="12" y2="15"></line>
          </svg>
          결과 공유하기
        </button>

        <button
          onClick={handleCapture}
          disabled={isCapturing}
          className="soft-button-secondary w-full sm:w-auto px-6 py-3 rounded-lg flex items-center justify-center"
          onTouchEnd={(e) => {
            e.preventDefault(); // 기본 터치 이벤트 방지
            if (!isCapturing) handleCapture();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
          {isCapturing ? "캡쳐 중..." : "결과 이미지로 저장"}
        </button>
      </div>

      {/* 모바일 친화적인 모달 형태의 알림 창 */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-xl max-w-sm w-full mx-4 border-2 border-primary">
            <div className="text-center mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                알림
              </h3>
              <div className="mt-3">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {shareMessage}
                </p>
              </div>
            </div>
            <div className="text-center">
              <button
                onClick={closeModal}
                className="soft-button-primary w-full px-4 py-2 rounded-md"
                onTouchEnd={(e) => {
                  e.preventDefault(); // 기본 터치 이벤트 방지
                  closeModal();
                }}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
