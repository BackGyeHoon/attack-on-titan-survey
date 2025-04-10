"use client";

import { useState, useEffect } from "react";
import { Question } from "../components/survey/Question";
import { Result } from "../components/survey/Result";

// 간단한 설문 데이터
const questions = [
  {
    id: 1,
    text: "위기 상황에서 당신은 어떻게 행동하나요?",
    options: [
      "냉정하게 상황을 분석하고 대처한다",
      "본능적으로 행동한다",
      "팀원들을 보호하려고 한다",
      "최선의 전략을 찾아 실행한다",
    ],
  },
  {
    id: 2,
    text: "당신의 가장 큰 강점은 무엇인가요?",
    options: [
      "분석력과 전략적 사고",
      "강한 의지와 결단력",
      "충성심과 헌신",
      "적응력과 생존 능력",
    ],
  },
  {
    id: 3,
    text: "당신에게 가장 중요한 가치는 무엇인가요?",
    options: ["자유", "정의", "가족과 친구", "인류의 생존"],
  },
  {
    id: 4,
    text: "다른 사람들이 당신을 어떻게 묘사하나요?",
    options: [
      "리더십이 있고 카리스마가 있다",
      "신뢰할 수 있고 충성스럽다",
      "똑똑하고 분석적이다",
      "용감하고 결단력이 있다",
      "계산적이고 전략적이다",
    ],
  },
  {
    id: 5,
    text: "어려운 결정을 내릴 때, 당신은 주로 무엇에 의존하나요?",
    options: [
      "논리와 이성",
      "본능과 직감",
      "다른 사람들의 의견",
      "과거의 경험",
      "목표와 이상",
    ],
  },
  {
    id: 6,
    text: "당신이 가장 두려워하는 것은 무엇인가요?",
    options: [
      "사랑하는 사람을 잃는 것",
      "자유를 잃는 것",
      "실패하는 것",
      "무력함을 느끼는 것",
      "배신당하는 것",
    ],
  },
];

// 확장된 캐릭터 결과
const characters = [
  {
    name: "에렌 예거",
    description:
      "자유를 향한 강한 의지와 결단력을 가지고 있습니다. 목표를 위해서라면 모든 것을 희생할 수 있는 강한 결의를 지니고 있어요. 처음에는 순수한 복수심과 정의감을 가졌지만, 점차 극단적인 방법까지 택하는 복잡한 캐릭터로 발전했습니다.",
  },
  {
    name: "미카사 아커만",
    description:
      "뛰어난 전투 능력과 소중한 사람을 지키려는 강한 보호 본능을 가지고 있습니다. 충성심이 매우 강하고 믿음직한 동료예요. 아커만 가문의 피를 이어받아 비범한 전투 능력과 특별한 힘을 가지고 있습니다.",
  },
  {
    name: "아르민 알레르트",
    description:
      "뛰어난 분석력과 전략적 사고 능력을 가지고 있습니다. 위기 상황에서도 냉정하게 최선의 해결책을 찾아내는 지혜를 지니고 있어요. 체력이나 전투력은 부족하지만, 지적 능력으로 팀에 큰 기여를 합니다.",
  },
  {
    name: "리바이 아커만",
    description:
      "강인한 정신력과 뛰어난 전투 기술을 가졌습니다. 원칙을 중요시하며 필요할 때는 냉정한 결단을 내리는 리더십을 보여줍니다. '인류 최강의 군인'이라 불리며 거인을 상대로 타의 추종을 불허하는 전투 능력을 갖췄습니다.",
  },
  {
    name: "엘빈 스미스",
    description:
      "뛰어난 리더십과 전략적 사고를 갖추고 있습니다. 인류의 미래를 위해 큰 희생도 감수하는 결단력이 있습니다. 조사병단의 단장으로서 인류의 진실을 밝히기 위해 노력하며, 부하들의 희생을 두려워하지 않는 냉철한 판단력을 가졌습니다.",
  },
  {
    name: "한지 조에",
    description:
      "호기심이 많고 지적 탐구심이 강합니다. 거인에 대한 연구에 열정적이며 창의적인 문제 해결 능력을 갖추고 있어요. 때로는 미친 것처럼 보이지만, 그 열정 속에는 깊은 통찰력이 숨어 있습니다.",
  },
  {
    name: "지크 예거",
    description:
      "냉철한 판단력과 전략적 사고를 지니고 있습니다. 자신의 목표를 위해 계획적으로 행동하는 치밀함이 있어요. 에렌의 이복 형이자 마레의 전사로, 복잡한 배경과 목표를 가진 캐릭터입니다.",
  },
  {
    name: "라이너 브라운",
    description:
      "강한 책임감과 충성심을 가졌지만, 내적 갈등이 심한 복잡한 성격입니다. 이중적인 삶 속에서 정체성의 혼란을 겪고 있어요. 갑옷 거인의 능력자로, 내면의 고통과 죄책감에 시달리는 비극적 인물입니다.",
  },
  {
    name: "애니 레온하트",
    description:
      "냉정하고 독립적인 성격을 지니고 있으며, 자신의 목표를 위해 냉철하게 행동합니다. 뛰어난 전투 기술과 함께 감정을 숨기는 능력이 탁월해요. 여성형 거인의 능력자로, 자신만의 신념에 따라 행동합니다.",
  },
  {
    name: "베르톨트 후버",
    description:
      "온화하고 조용한 성격이지만, 사명감이 강한 복잡한 인물입니다. 내면의 갈등 속에서도 맡은 임무를 수행하는 의지가 있어요. 초대형 거인의 능력자로, 겉보기와 달리 큰 파괴력을 지닌 캐릭터입니다.",
  },
  {
    name: "히스토리아 레이스",
    description:
      "겉으로는 순수하고 친절하지만, 내면에는 강한 의지와 결단력을 지니고 있습니다. 자신의 정체성을 찾아가는 여정 속에서 성장하는 모습을 보여줘요. 왕가의 혈통을 이어받은 인물로, 자신의 운명을 스스로 결정하고자 합니다.",
  },
  {
    name: "가비 브라운",
    description:
      "용감하고 충동적이며 확신에 찬 성격입니다. 자신의 믿음에 강한 확신을 가지고 행동하는 열정이 있어요. 마레의 전사 후보생으로, 라이너를 우상으로 여기며 엘디아인에 대한 강한 증오심을 가진 인물입니다.",
  },
  {
    name: "팔코 그라이스",
    description:
      "성실하고 충실한 성격으로, 친구와 가족을 중요시합니다. 온화하지만 필요할 때는 용기를 내는 강인함이 있어요. 마레의 전사 후보생으로, 순수한 마음을 지니고 있으며 복잡한 상황 속에서 자신의 가치를 지키려 노력합니다.",
  },
  {
    name: "피크 핑거",
    description:
      "지적이고 분석적인 성격으로, 상황을 빠르게 파악하는 능력이 있습니다. 침착하게 문제를 해결하는 실용적인 태도를 가졌어요. 짐승형 거인의 능력자로, 뛰어난 지구력과 끈기를 가진 믿음직한 전사입니다.",
  },
  {
    name: "코니 스프링거",
    description:
      "유머 감각이 있고 솔직한 성격입니다. 어려운 상황에서도 긍정적인 태도를 유지하며 동료들에게 활력을 줘요. 평범한 배경에서 군인이 된 인물로, 진실한 마음과 우정을 중요시합니다.",
  },
  {
    name: "사샤 블라우스",
    description:
      "직관적이고 본능적인 성격으로, 특히 식욕이 왕성한 캐릭터입니다. 겉으로는 단순해 보이지만 위기 상황에서 뛰어난 직감을 발휘해요. '감자 소녀'라는 별명으로 불리며, 사냥 실력이 뛰어나고 순수한 마음을 지닌 인물입니다.",
  },
  {
    name: "장 키르슈타인",
    description:
      "자존심이 강하고 솔직한 성격이지만, 내면에는 깊은 연민과 정의감이 있습니다. 처음에는 이기적으로 보였지만 점차 책임감 있는 리더로 성장해요. 솔직하고 직설적인 태도로 상황을 직시하며, 믿음직한 동료가 됩니다.",
  },
  {
    name: "그리샤 예거",
    description:
      "지적이고 이상주의적인 성격이지만, 어둡고 복잡한 과거를 가지고 있습니다. 엘디아인의 억압에 저항하며 처음에는 복권파에 가담했고, 후에는 반란을 일으켰습니다. 에렌과 지크의 아버지로, 공격형 거인과 진격의 거인의 능력을 보유했던 인물입니다.",
  },
  {
    name: "카를라 예거",
    description:
      "성실하고 배려심이 깊은 성격입니다. 아들 에렌을 끔찍이 사랑했고, 가족을 위해 모든 것을 희생할 수 있는 헌신적인 어머니였습니다. 평범한 일상을 소중히 여겼으며, 아들이 조사병단에 들어가는 것을 강하게 반대했던 인물입니다.",
  },
  {
    name: "프록 폴스타",
    description:
      "맹목적인 충성심과 확고한 신념을 가진 인물입니다. 처음에는 평범한 신병이었지만, 차츰 에렌의 추종자가 되어 예거파의 핵심 멤버로 성장했습니다. 극단적이고 과격한 성향을 보이며, 엘디아의 부활을 위해서라면 어떤 수단과 방법도 가리지 않습니다.",
  },
  {
    name: "케니 아커만",
    description:
      "냉혹하고 무자비한 성격이지만, 복잡한 내면을 가진 인물입니다. 헌병대 소속으로 '내성의 살인마'라 불리며 많은 사람들을 살해했습니다. 리바이의 삼촌이자 스승이었으며, 왕가의 비밀을 추적하다 죽음을 맞이한 복잡한 배경을 가진 캐릭터입니다.",
  },
  {
    name: "도트 픽시스",
    description:
      "침착하고 현명한 성격으로 뛰어난 지도력을 갖춘 인물입니다. 주둔병단의 총사령관으로 트로스트 구 방어 작전을 지휘했습니다. 술을 좋아하는 여유로운 모습을 보이기도 하지만, 위기 상황에서는 냉정한 판단력으로 인류를 위해 최선의 결정을 내립니다.",
  },
  {
    name: "유미르",
    description:
      "냉소적이고 현실적인 태도를 가졌지만, 마음 깊은 곳엔 따뜻함을 지니고 있습니다. 고아로 힘든 유년 시절을 보냈고, 순수 거인으로 60년을 보낸 후 인간 형태로 돌아왔습니다. 히스토리아에게 깊은 애정을 품고 있으며, 자신의 삶을 희생하는 선택을 한 비극적 인물입니다.",
  },
  {
    name: "포르코 갤리아드",
    description:
      "자신감이 넘치고 거만한 듯 보이지만, 동료에 대한 깊은 충성심을 가진 인물입니다. 마레의 전사로 '턱 거인'의 능력을 물려받았습니다. 동생 마르셀을 잃은 상처가 있으며, 완고한 성격 속에 숨겨진 따뜻한 마음을 가진 복잡한 캐릭터입니다.",
  },
];

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<{
    name: string;
    description: string;
    compatibleCharacters?: string[];
    incompatibleCharacter?: string;
  } | null>(null);
  const [progressClass, setProgressClass] = useState("question-progress-0");

  // 진행률에 따라 배경색 변경
  useEffect(() => {
    if (result) {
      setProgressClass("question-progress-100");
      return;
    }

    const progress = Math.round((currentQuestion / questions.length) * 100);
    if (progress <= 20) {
      setProgressClass("question-progress-0");
    } else if (progress <= 40) {
      setProgressClass("question-progress-20");
    } else if (progress <= 60) {
      setProgressClass("question-progress-40");
    } else if (progress <= 80) {
      setProgressClass("question-progress-60");
    } else {
      setProgressClass("question-progress-80");
    }
  }, [currentQuestion, result]);

  // body 클래스에 진행률 클래스 추가
  useEffect(() => {
    document.body.className = progressClass;

    return () => {
      document.body.className = "";
    };
  }, [progressClass]);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 답변을 기반으로 캐릭터 결정
      const determineCharacter = (userAnswers: string[]) => {
        // 답변 패턴에 기반한 간단한 점수 시스템
        let scores: Record<string, number> = {};

        // 초기화
        characters.forEach((char) => {
          scores[char.name] = 0;
        });

        // 각 질문별 응답에 따른 점수 할당
        // 질문 1: 위기 상황 대처 방식
        if (userAnswers[0] === "냉정하게 상황을 분석하고 대처한다") {
          scores["아르민 알레르트"] += 2;
          scores["엘빈 스미스"] += 2;
          scores["한지 조에"] += 1;
          scores["리바이 아커만"] += 1;
        } else if (userAnswers[0] === "본능적으로 행동한다") {
          scores["에렌 예거"] += 2;
          scores["미카사 아커만"] += 1;
          scores["사샤 블라우스"] += 2;
        } else if (userAnswers[0] === "팀원들을 보호하려고 한다") {
          scores["미카사 아커만"] += 2;
          scores["라이너 브라운"] += 1;
          scores["히스토리아 레이스"] += 1;
        } else if (userAnswers[0] === "최선의 전략을 찾아 실행한다") {
          scores["아르민 알레르트"] += 1;
          scores["엘빈 스미스"] += 2;
          scores["지크 예거"] += 2;
        }

        // 질문 2: 가장 큰 강점
        if (userAnswers[1] === "분석력과 전략적 사고") {
          scores["아르민 알레르트"] += 2;
          scores["엘빈 스미스"] += 2;
          scores["한지 조에"] += 1;
          scores["지크 예거"] += 1;
        } else if (userAnswers[1] === "강한 의지와 결단력") {
          scores["에렌 예거"] += 2;
          scores["리바이 아커만"] += 2;
          scores["미카사 아커만"] += 1;
          scores["프록 폴스타"] += 2;
        } else if (userAnswers[1] === "충성심과 헌신") {
          scores["미카사 아커만"] += 2;
          scores["라이너 브라운"] += 2;
          scores["베르톨트 후버"] += 1;
          scores["팔코 그라이스"] += 1;
        } else if (userAnswers[1] === "적응력과 생존 능력") {
          scores["에렌 예거"] += 1;
          scores["유미르"] += 2;
          scores["피크 핑거"] += 1;
          scores["사샤 블라우스"] += 1;
        }

        // 질문 3: 가장 중요한 가치
        if (userAnswers[2] === "자유") {
          scores["에렌 예거"] += 3;
          scores["유미르"] += 1;
        } else if (userAnswers[2] === "정의") {
          scores["엘빈 스미스"] += 2;
          scores["리바이 아커만"] += 1;
        } else if (userAnswers[2] === "가족과 친구") {
          scores["미카사 아커만"] += 2;
          scores["코니 스프링거"] += 2;
          scores["사샤 블라우스"] += 2;
          scores["카를라 예거"] += 3;
        } else if (userAnswers[2] === "인류의 생존") {
          scores["엘빈 스미스"] += 3;
          scores["한지 조에"] += 2;
          scores["도트 픽시스"] += 2;
        }

        // 질문 4: 다른 사람들의 묘사
        if (userAnswers[3] === "리더십이 있고 카리스마가 있다") {
          scores["엘빈 스미스"] += 3;
          scores["에렌 예거"] += 1;
        } else if (userAnswers[3] === "신뢰할 수 있고 충성스럽다") {
          scores["미카사 아커만"] += 2;
          scores["라이너 브라운"] += 1;
          scores["팔코 그라이스"] += 2;
        } else if (userAnswers[3] === "똑똑하고 분석적이다") {
          scores["아르민 알레르트"] += 3;
          scores["한지 조에"] += 2;
          scores["피크 핑거"] += 2;
        } else if (userAnswers[3] === "용감하고 결단력이 있다") {
          scores["에렌 예거"] += 2;
          scores["리바이 아커만"] += 2;
          scores["가비 브라운"] += 1;
        } else if (userAnswers[3] === "계산적이고 전략적이다") {
          scores["지크 예거"] += 3;
          scores["애니 레온하트"] += 2;
        }

        // 질문 5: 결정 방식
        if (userAnswers[4] === "논리와 이성") {
          scores["아르민 알레르트"] += 2;
          scores["한지 조에"] += 1;
          scores["지크 예거"] += 2;
        } else if (userAnswers[4] === "본능과 직감") {
          scores["에렌 예거"] += 2;
          scores["미카사 아커만"] += 2;
          scores["사샤 블라우스"] += 2;
        } else if (userAnswers[4] === "다른 사람들의 의견") {
          scores["히스토리아 레이스"] += 2;
          scores["팔코 그라이스"] += 2;
        } else if (userAnswers[4] === "과거의 경험") {
          scores["리바이 아커만"] += 2;
          scores["케니 아커만"] += 2;
          scores["그리샤 예거"] += 1;
        } else if (userAnswers[4] === "목표와 이상") {
          scores["엘빈 스미스"] += 3;
          scores["프록 폴스타"] += 2;
        }

        // 질문 6: 가장 두려워하는 것
        if (userAnswers[5] === "사랑하는 사람을 잃는 것") {
          scores["미카사 아커만"] += 3;
          scores["카를라 예거"] += 2;
          scores["베르톨트 후버"] += 1;
        } else if (userAnswers[5] === "자유를 잃는 것") {
          scores["에렌 예거"] += 3;
          scores["유미르"] += 2;
        } else if (userAnswers[5] === "실패하는 것") {
          scores["라이너 브라운"] += 2;
          scores["엘빈 스미스"] += 2;
          scores["가비 브라운"] += 2;
        } else if (userAnswers[5] === "무력함을 느끼는 것") {
          scores["에렌 예거"] += 2;
          scores["리바이 아커만"] += 2;
        } else if (userAnswers[5] === "배신당하는 것") {
          scores["애니 레온하트"] += 2;
          scores["히스토리아 레이스"] += 1;
          scores["포르코 갤리아드"] += 2;
        }

        // 가장 높은 점수를 받은 캐릭터 찾기
        let highestScore = 0;
        let topCharacters: string[] = [];

        Object.entries(scores).forEach(([charName, score]) => {
          if (score > highestScore) {
            highestScore = score;
            topCharacters = [charName];
          } else if (score === highestScore) {
            topCharacters.push(charName);
          }
        });

        // 동점일 경우 그 중 하나를 선택
        const selectedCharName =
          topCharacters[Math.floor(Math.random() * topCharacters.length)];

        // 잘 맞는 캐릭터 선정 (메인 캐릭터 제외하고 상위 2개)
        let compatibleCharacters: string[] = [];

        const sortedScores = Object.entries(scores)
          .filter(([name]) => name !== selectedCharName)
          .sort((a, b) => b[1] - a[1]);

        // 상위 2개 캐릭터 선택
        compatibleCharacters = sortedScores.slice(0, 2).map(([name]) => name);

        // 잘 안맞는 캐릭터 (최하위 1개)
        const incompatibleCharacter = sortedScores[sortedScores.length - 1][0];

        // 해당 이름의 캐릭터 객체 반환 (잘 맞는/안 맞는 캐릭터 정보 포함)
        const mainCharacter =
          characters.find((char) => char.name === selectedCharName) ||
          characters[0];

        return {
          ...mainCharacter,
          compatibleCharacters,
          incompatibleCharacter,
        };
      };

      const result = determineCharacter(newAnswers);
      setResult(result);
    }
  };

  const resetSurvey = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  const progressPercentage = (currentQuestion / questions.length) * 100;

  return (
    <div className="titan-card p-6 md:p-8">
      {!result ? (
        <>
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">
                질문 {currentQuestion + 1}/{questions.length}
              </span>
              <span className="text-muted">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            <div className="w-full bg-primary-light rounded-full h-2 overflow-hidden">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          <Question
            question={questions[currentQuestion].text}
            options={questions[currentQuestion].options}
            onAnswer={handleAnswer}
            questionIndex={currentQuestion}
          />
        </>
      ) : (
        <Result
          character={result.name}
          description={result.description}
          compatibleCharacters={result.compatibleCharacters}
          incompatibleCharacter={result.incompatibleCharacter}
          onReset={resetSurvey}
        />
      )}
    </div>
  );
}
