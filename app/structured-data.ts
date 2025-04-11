export function generateStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: "진격의 거인 캐릭터 테스트 - 나와 닮은 캐릭터는?",
    description:
      "진격의 거인 애니메이션 캐릭터 중 당신과 가장 닮은 캐릭터를 알아보는 성향 테스트입니다.",
    educationalUse: "Entertainment",
    accessibilityAPI: "ARIA",
    accessibilityControl: "fullKeyboardControl",
    accessibilityFeature: ["highContrast", "readAloud", "structuralNavigation"],
    accessibilityHazard: [
      "noFlashingHazard",
      "noMotionSimulationHazard",
      "noSoundHazard",
    ],
    about: {
      "@type": "CreativeWork",
      name: "진격의 거인 (Attack on Titan)",
      abstract:
        "진격의 거인(Attack on Titan)은 일본의 인기 애니메이션으로, 거인들로부터 살아남기 위한 인류의 투쟁을 그린 작품입니다.",
    },
    author: {
      "@type": "Person",
      name: "진격의 거인 캐릭터 테스트 제작자",
    },
    inLanguage: "ko-KR",
    isAccessibleForFree: true,
    keywords:
      "진격의 거인, 애니메이션, 캐릭터 테스트, 성향 테스트, 에렌 예거, 미카사 아커만, 리바이",
    publisher: {
      "@type": "Organization",
      name: "진격의 거인 캐릭터 테스트",
      logo: {
        "@type": "ImageObject",
        url: "https://attack-on-titan-survey.vercel.app/images/og-image.jpg",
      },
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "KRW",
      availability: "https://schema.org/InStock",
    },
  };
}
