"use client";

import { useState, useEffect, useCallback } from "react";
import { Question } from "../components/survey/Question";
import { Result } from "../components/survey/Result";

// 간단한 설문 데이터
const questions = [
  {
    id: 1,
    text: "친구가 갑자기 갈등 상황에 처했다고 연락이 왔을 때, 당신의 첫 반응은?",
    options: [
      "상황을 자세히 물어보고 실질적인 해결책을 함께 찾는다",
      "즉시 달려가서 친구 편에서 직접 상황에 개입한다",
      "어떤 판단도 하지 않고 친구의 감정을 이해하고 공감한다",
      "객관적인 시각으로 상황을 분석하고 논리적인 조언을 한다",
    ],
  },
  {
    id: 2,
    text: "학교나 직장에서 팀 프로젝트를 할 때 당신의 역할은?",
    options: [
      "새로운 아이디어를 제시하고 방향성을 설계하는 기획자",
      "목표를 설정하고 팀을 이끄는 결단력 있는 리더",
      "갈등을 중재하고 모두의 의견을 조율하는 중재자",
      "주어진 일을 묵묵히 완수하고 실무를 담당하는 실행자",
    ],
  },
  {
    id: 3,
    text: "주말에 가장 하고 싶은 활동은?",
    options: [
      "아무도 가보지 않은 곳을 탐험하거나 스릴 넘치는 활동을 즐긴다",
      "사회를 위한 봉사활동이나 의미 있는 프로젝트에 참여한다",
      "가족이나 친한 친구들과 함께 대화하며 시간을 보낸다",
      "책읽기, 그림그리기 등 혼자서 조용히 취미활동을 즐긴다",
    ],
  },
  {
    id: 4,
    text: "사람들이 당신을 처음 만났을 때 어떤 인상을 받는다고 생각하나요?",
    options: [
      "누구나 따르고 싶은 리더십이 있는 카리스마 있는 사람",
      "신뢰할 수 있고 약속을 지키는 정직한 사람",
      "박학다식하고 깊은 생각을 가진 지적인 사람",
      "긍정적이고 활기찬 에너지가 넘치는 활발한 사람",
      "침착하고 계산적이며 상황을 냉정하게 보는 사람",
    ],
  },
  {
    id: 5,
    text: "중요한 선택의 기로에 섰을 때, 당신은 주로 어떻게 결정하나요?",
    options: [
      "모든 선택지의 장단점을 종이에 적어보고 분석한다",
      "마음이 끌리는 방향과 직감을 가장 중요하게 생각한다",
      "신뢰하는 주변 사람들에게 의견을 구하고 참고한다",
      "과거에 비슷한 상황에서 어떤 결과가 있었는지 참고한다",
      "궁극적인 목표 달성에 어떤 선택이 더 유리한지 고려한다",
    ],
  },
  {
    id: 6,
    text: "인생에서 가장 두려운 상황은 무엇인가요?",
    options: [
      "내가 사랑하는 사람이 내 곁을 떠나는 것",
      "자신의 삶에 대한 통제권을 잃고 선택의 자유를 빼앗기는 것",
      "오랫동안 준비하고 노력한 일에서 실패하는 것",
      "급격한 변화에 적응하지 못하고 뒤처지는 것",
      "가장 신뢰했던 사람에게 배신당하는 것",
    ],
  },
  {
    id: 7,
    text: "스트레스를 받을 때 당신은 어떻게 대처하나요?",
    options: [
      "문제의 원인을 분석하고 해결책을 찾아 실행한다",
      "격렬한 운동이나 활동으로 에너지를 발산한다",
      "친한 사람들과 대화하며 감정을 나눈다",
      "혼자만의 시간을 갖고 내면을 들여다본다",
      "일상에서 벗어나 새로운 경험을 통해 기분 전환한다",
    ],
  },
  {
    id: 8,
    text: "당신이 생각하는 이상적인 리더의 모습은?",
    options: [
      "명확한 비전을 제시하고 대담한 결정을 내리는 카리스마적 리더",
      "구성원들의 성장을 돕고 팀워크를 중시하는 섬김의 리더",
      "논리적 분석과 전략적 사고로 최적의 방향을 찾는 지적인 리더",
      "솔선수범하며 원칙과, 책임감, 정의를 중시하는 모범적 리더",
      "변화와 혁신을 두려워하지 않고 새로운 길을 개척하는 도전적 리더",
    ],
  },
  {
    id: 9,
    text: "당신에게 가장 중요한 가치는 무엇인가요?",
    options: [
      "자유와 독립성",
      "가족과 사랑하는 사람들과의 관계",
      "정의와 진실",
      "성취와 성공",
      "안정과 평화",
    ],
  },
  {
    id: 10,
    text: "미지의 상황이나 새로운 도전에 직면했을 때, 당신의 태도는?",
    options: [
      "새로운 가능성에 흥분하며 적극적으로 도전한다",
      "위험과 이득을 철저히 분석한 후 행동한다",
      "경험 많은 사람들의 조언을 구하고 신중하게 접근한다",
      "자신의 직관과 능력을 믿고 상황에 맞게 유연하게 대응한다",
      "기존의 경험과 지식을 바탕으로 체계적으로 접근한다",
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
  const [cracksVisible, setCracksVisible] = useState<number[]>([]);

  // 파편 효과 생성 함수
  const createDebrisEffect = useCallback(() => {
    if (typeof document === 'undefined') return;
    
    const container = document.getElementById('survey-container');
    if (!container) return;
    
    // 각 질문마다 다른 수의 파편 생성 (진행도에 따라 더 많이 생성)
    const baseDebris = 3 + Math.floor((currentQuestion / questions.length) * 10); // 3~13개
    const numberOfDebris = baseDebris + Math.floor(Math.random() * 5); // 약간의 랜덤성 추가
    
    for (let i = 0; i < numberOfDebris; i++) {
      const debris = document.createElement('div');
      debris.className = 'wall-debris';
      
      // 랜덤 위치와 크기 (화면 전체에 분산)
      const size = Math.floor(Math.random() * 8) + 4; // 4px ~ 12px
      debris.style.width = `${size}px`;
      debris.style.height = `${size}px`;
      
      // 더 넓은 범위에 파편 분산
      const section = currentQuestion % 4; // 화면을 4개 구역으로 나눔
      const sectionWidth = 100 / 4;
      const leftBase = section * sectionWidth;
      debris.style.left = `${leftBase + Math.random() * sectionWidth}%`;
      debris.style.top = `${10 + Math.random() * 70}%`; // 좀 더 넓은 범위
      
      // 랜덤 색상 (벽돌 색상 변형)
      const hue = Math.floor(Math.random() * 30) + 20; // 20-50 (갈색 계열)
      const saturation = Math.floor(Math.random() * 30) + 20; // 20-50%
      const lightness = Math.floor(Math.random() * 20) + 40; // 40-60%
      debris.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      
      // 파편 회전 및 낙하 방향 설정 (CSS 변수 활용)
      const fallX = (Math.random() - 0.5) * 100; // -50px ~ 50px
      const fallY = 50 + Math.random() * 100; // 50px ~ 150px
      const rotation = Math.random() * 360; // 0-360도
      debris.style.setProperty('--fall-x', `${fallX}px`);
      debris.style.setProperty('--fall-y', `${fallY}px`);
      debris.style.setProperty('--rotation', `${rotation}deg`);
      
      // 랜덤 지연 시간
      debris.style.animationDelay = `${Math.random() * 0.5}s`;
      
      container.appendChild(debris);
      
      // 애니메이션 종료 후 요소 제거
      setTimeout(() => {
        if (container.contains(debris)) {
          container.removeChild(debris);
        }
      }, 3000);
    }
  }, [currentQuestion]);

  // 벽 무너짐 애니메이션 처리 함수
  const handleWallTransition = useCallback((newClass: string) => {
    if (progressClass === newClass) return;
    
    document.body.classList.add('progress-transition');
    
    // 파편 효과 생성
    createDebrisEffect();
    
    // 새로운 균열 생성
    if (currentQuestion > 0 && !result) {
      const newCracks = [...cracksVisible];
      if (!newCracks.includes(currentQuestion)) {
        newCracks.push(currentQuestion);
        setCracksVisible(newCracks);
      }
    }
    
    // 애니메이션이 완료된 후 클래스 변경
    setTimeout(() => {
      setProgressClass(newClass);
      document.body.classList.remove('progress-transition');
    }, 1200); // 애니메이션 지속 시간과 맞춤
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion, cracksVisible, progressClass, result]);

  // 진행률에 따라 벽 무너짐 효과
  useEffect(() => {
    if (result) {
      handleWallTransition("question-progress-100");
      return;
    }

    // 각 질문마다 벽 무너짐 효과 적용
    handleWallTransition(`question-progress-${currentQuestion}`);
  }, [currentQuestion, result, handleWallTransition]);

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
      // 답변 후 새로운 균열 효과 추가
      const newCrack = Math.floor(Math.random() * 5) + 1; // 1-5 사이의 새 균열 번호
      setCracksVisible(prev => [...prev, newCrack].slice(0, currentQuestion + 2));
      
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 마지막 질문에 답변했을 때

      // 먼저 결과를 계산하고 상태 설정 (지연 없이 즉시 계산)
      const result = determineCharacter(newAnswers);
      setResult(result);
      
      // 결과가 설정된 후 무너짐 효과 실행 (애니메이션만 적용, 로직 처리는 영향 없음)
      setTimeout(() => {
        createMassiveCollapse();
      }, 10);
    }
  };

  // 대량의 벽 무너짐 효과 생성 함수
  const createMassiveCollapse = () => {
    if (typeof document === 'undefined') return;
    
    // 모든 균열을 표시
    setCracksVisible([1, 2, 3, 4, 5]);
    
    // 화면 흔들림 효과
    document.body.classList.add('massive-collapse');
    
    // 대량의 파편 생성
    const container = document.getElementById('survey-container');
    if (!container) return;
    
    // 화면 여러 위치에 다양한 크기의 파편 생성 (100~150개)
    const numberOfDebris = 100 + Math.floor(Math.random() * 50);
    
    // 파편 생성 함수
    const createDebrisWithDelay = (index: number, delay: number) => {
      setTimeout(() => {
        const debris = document.createElement('div');
        debris.className = 'wall-debris';
        
        // 크기 다양화 (더 큰 파편 포함)
        const size = Math.floor(Math.random() * 15) + 5; // 5px ~ 20px
        debris.style.width = `${size}px`;
        debris.style.height = `${size}px`;
        
        // 화면 전체에 랜덤하게 분산
        debris.style.left = `${Math.random() * 100}%`;
        debris.style.top = `${Math.random() * 100}%`;
        
        // 다양한 색상 (벽돌 색상 변형)
        const hue = Math.floor(Math.random() * 30) + 20; // 20-50 (갈색 계열)
        const saturation = Math.floor(Math.random() * 30) + 20; // 20-50%
        const lightness = Math.floor(Math.random() * 20) + 40; // 40-60%
        debris.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        
        // 파편 회전 및 낙하 방향 설정 (CSS 변수 활용)
        const fallX = (Math.random() - 0.5) * 200; // -100px ~ 100px
        const fallY = 100 + Math.random() * 300; // 100px ~ 400px
        const rotation = Math.random() * 720 - 360; // -360도 ~ 360도
        debris.style.setProperty('--fall-x', `${fallX}px`);
        debris.style.setProperty('--fall-y', `${fallY}px`);
        debris.style.setProperty('--rotation', `${rotation}deg`);
        
        // 파편 애니메이션 속도 다양화
        const duration = 1 + Math.random() * 3; // 1s ~ 4s
        debris.style.animationDuration = `${duration}s`;
        
        container.appendChild(debris);
        
        // 애니메이션 종료 후 요소 제거
        setTimeout(() => {
          if (container.contains(debris)) {
            container.removeChild(debris);
          }
        }, duration * 1000 + 500);
      }, delay);
    };
    
    // 파편을 시간차를 두고 순차적으로 생성 (0~500ms 사이 랜덤 지연)
    for (let i = 0; i < numberOfDebris; i++) {
      const delay = Math.random() * 500;
      createDebrisWithDelay(i, delay);
    }
    
    // 화면 흔들림 효과 제거
    setTimeout(() => {
      document.body.classList.remove('massive-collapse');
    }, 2000);
  };
  
  const determineCharacter = (userAnswers: string[]) => {
    // 답변 패턴에 기반한 간단한 점수 시스템
    const scores: Record<string, number> = {};

    // 초기화
    characters.forEach((char) => {
      scores[char.name] = 0;
    });

    // 각 질문별 응답에 따른 점수 할당
    // 질문 1: 갈등 상황에 대한 반응
    if (userAnswers[0] === "상황을 자세히 물어보고 실질적인 해결책을 함께 찾는다") {
      scores["아르민 알레르트"] += 2;
      scores["엘빈 스미스"] += 1;
      scores["한지 조에"] += 1;
      scores["장 키르슈타인"] += 1;
    } else if (userAnswers[0] === "즉시 달려가서 친구 편에서 직접 상황에 개입한다") {
      scores["에렌 예거"] += 2;
      scores["미카사 아커만"] += 2;
      scores["가비 브라운"] += 1;
    } else if (userAnswers[0] === "어떤 판단도 하지 않고 친구의 감정을 이해하고 공감한다") {
      scores["미카사 아커만"] += 1;
      scores["히스토리아 레이스"] += 2;
      scores["팔코 그라이스"] += 2;
      scores["사샤 블라우스"] += 1;
    } else if (userAnswers[0] === "객관적인 시각으로 상황을 분석하고 논리적인 조언을 한다") {
      scores["아르민 알레르트"] += 1;
      scores["지크 예거"] += 3;
      scores["피크 핑거"] += 1;
      scores["도트 픽시스"] += 1;
    }

    // 질문 2: 팀 프로젝트 역할
    if (userAnswers[1] === "새로운 아이디어를 제시하고 방향성을 설계하는 기획자") {
      scores["아르민 알레르트"] += 3;
      scores["한지 조에"] += 2;
      scores["지크 예거"] += 1;
    } else if (userAnswers[1] === "목표를 설정하고 팀을 이끄는 결단력 있는 리더") {
      scores["에렌 예거"] += 2;
      scores["엘빈 스미스"] += 3;
      scores["리바이 아커만"] += 2;
      scores["프록 폴스타"] += 1;
    } else if (userAnswers[1] === "갈등을 중재하고 모두의 의견을 조율하는 중재자") {
      scores["히스토리아 레이스"] += 2;
      scores["마르코 보트"] += 3;
      scores["팔코 그라이스"] += 2;
      scores["도트 픽시스"] += 1;
    } else if (userAnswers[1] === "주어진 일을 묵묵히 완수하고 실무를 담당하는 실행자") {
      scores["미카사 아커만"] += 2;
      scores["베르톨트 후버"] += 2;
      scores["피크 핑거"] += 3;
      scores["유미르"] += 1;
    }

    // 질문 3: 주말 활동
    if (userAnswers[2] === "아무도 가보지 않은 곳을 탐험하거나 스릴 넘치는 활동을 즐긴다") {
      scores["에렌 예거"] += 3;
      scores["한지 조에"] += 2;
      scores["코니 스프링거"] += 1;
    } else if (userAnswers[2] === "사회를 위한 봉사활동이나 의미 있는 프로젝트에 참여한다") {
      scores["엘빈 스미스"] += 2;
      scores["히스토리아 레이스"] += 2;
      scores["그리샤 예거"] += 2;
    } else if (userAnswers[2] === "가족이나 친한 친구들과 함께 대화하며 시간을 보낸다") {
      scores["미카사 아커만"] += 2;
      scores["코니 스프링거"] += 2;
      scores["사샤 블라우스"] += 3;
      scores["카를라 예거"] += 3;
    } else if (userAnswers[2] === "책읽기, 그림그리기 등 혼자서 조용히 취미활동을 즐긴다") {
      scores["아르민 알레르트"] += 2;
      scores["애니 레온하트"] += 3;
      scores["리바이 아커만"] += 1;
    }

    // 질문 4: 첫인상
    if (userAnswers[3] === "누구나 따르고 싶은 리더십이 있는 카리스마 있는 사람") {
      scores["엘빈 스미스"] += 3;
      scores["리바이 아커만"] += 2;
      scores["프록 폴스타"] += 1;
    } else if (userAnswers[3] === "신뢰할 수 있고 약속을 지키는 정직한 사람") {
      scores["미카사 아커만"] += 2;
      scores["팔코 그라이스"] += 2;
      scores["마르코 보트"] += 3;
    } else if (userAnswers[3] === "박학다식하고 깊은 생각을 가진 지적인 사람") {
      scores["아르민 알레르트"] += 3;
      scores["한지 조에"] += 2;
      scores["도트 픽시스"] += 1;
    } else if (userAnswers[3] === "긍정적이고 활기찬 에너지가 넘치는 활발한 사람") {
      scores["에렌 예거"] += 2;
      scores["사샤 블라우스"] += 3;
      scores["코니 스프링거"] += 2;
      scores["가비 브라운"] += 1;
    } else if (userAnswers[3] === "침착하고 계산적이며 상황을 냉정하게 보는 사람") {
      scores["지크 예거"] += 3;
      scores["애니 레온하트"] += 2;
      scores["피크 핑거"] += 2;
    }

    // 질문 5: 결정 방식
    if (userAnswers[4] === "모든 선택지의 장단점을 종이에 적어보고 분석한다") {
      scores["아르민 알레르트"] += 3;
      scores["지크 예거"] += 2;
      scores["피크 핑거"] += 2;
    } else if (userAnswers[4] === "마음이 끌리는 방향과 직감을 가장 중요하게 생각한다") {
      scores["에렌 예거"] += 3;
      scores["사샤 블라우스"] += 2;
      scores["유미르"] += 1;
    } else if (userAnswers[4] === "신뢰하는 주변 사람들에게 의견을 구하고 참고한다") {
      scores["히스토리아 레이스"] += 3;
      scores["팔코 그라이스"] += 2;
      scores["베르톨트 후버"] += 1;
    } else if (userAnswers[4] === "과거에 비슷한 상황에서 어떤 결과가 있었는지 참고한다") {
      scores["리바이 아커만"] += 2;
      scores["케니 아커만"] += 3;
      scores["도트 픽시스"] += 2;
    } else if (userAnswers[4] === "궁극적인 목표 달성에 어떤 선택이 더 유리한지 고려한다") {
      scores["엘빈 스미스"] += 3;
      scores["지크 예거"] += 2;
      scores["그리샤 예거"] += 1;
    }

    // 질문 6: 두려운 상황
    if (userAnswers[5] === "내가 사랑하는 사람이 내 곁을 떠나는 것") {
      scores["미카사 아커만"] += 3;
      scores["카를라 예거"] += 2;
      scores["히스토리아 레이스"] += 1;
    } else if (userAnswers[5] === "자신의 삶에 대한 통제권을 잃고 선택의 자유를 빼앗기는 것") {
      scores["에렌 예거"] += 3;
      scores["유미르"] += 2;
      scores["리바이 아커만"] += 1;
    } else if (userAnswers[5] === "오랫동안 준비하고 노력한 일에서 실패하는 것") {
      scores["엘빈 스미스"] += 2;
      scores["라이너 브라운"] += 3;
      scores["가비 브라운"] += 2;
    } else if (userAnswers[5] === "급격한 변화에 적응하지 못하고 뒤처지는 것") {
      scores["아르민 알레르트"] += 2;
      scores["베르톨트 후버"] += 2;
      scores["도트 픽시스"] += 2;
    } else if (userAnswers[5] === "가장 신뢰했던 사람에게 배신당하는 것") {
      scores["애니 레온하트"] += 3;
      scores["포르코 갤리아드"] += 2;
      scores["장 키르슈타인"] += 2;
    }
    
    // 질문 7: 스트레스 대처 방식
    if (userAnswers[6] === "문제의 원인을 분석하고 해결책을 찾아 실행한다") {
      scores["아르민 알레르트"] += 3;
      scores["엘빈 스미스"] += 2;
      scores["피크 핑거"] += 2;
      scores["한지 조에"] += 1;
    } else if (userAnswers[6] === "격렬한 운동이나 활동으로 에너지를 발산한다") {
      scores["에렌 예거"] += 2;
      scores["미카사 아커만"] += 2;
      scores["리바이 아커만"] += 3;
      scores["가비 브라운"] += 1;
    } else if (userAnswers[6] === "친한 사람들과 대화하며 감정을 나눈다") {
      scores["코니 스프링거"] += 3;
      scores["사샤 블라우스"] += 2;
      scores["히스토리아 레이스"] += 2;
      scores["팔코 그라이스"] += 1;
    } else if (userAnswers[6] === "혼자만의 시간을 갖고 내면을 들여다본다") {
      scores["애니 레온하트"] += 3;
      scores["지크 예거"] += 2;
      scores["베르톨트 후버"] += 2;
      scores["유미르"] += 1;
    } else if (userAnswers[6] === "일상에서 벗어나 새로운 경험을 통해 기분 전환한다") {
      scores["한지 조에"] += 3;
      scores["코니 스프링거"] += 2;
      scores["사샤 블라우스"] += 2;
      scores["장 키르슈타인"] += 1;
    }
    
    // 질문 8:, 이상적인 리더상
    if (userAnswers[7] === "명확한 비전을 제시하고 대담한 결정을 내리는 카리스마적 리더") {
      scores["에렌 예거"] += 2;
      scores["엘빈 스미스"] += 3;
      scores["프록 폴스타"] += 2;
      scores["지크 예거"] += 1;
    } else if (userAnswers[7] === "구성원들의 성장을 돕고 팀워크를 중시하는 섬김의 리더") {
      scores["히스토리아 레이스"] += 3;
      scores["마르코 보트"] += 2;
      scores["팔코 그라이스"] += 2;
      scores["그리샤 예거"] += 1;
    } else if (userAnswers[7] === "논리적 분석과 전략적 사고로 최적의 방향을 찾는 지적인 리더") {
      scores["아르민 알레르트"] += 3;
      scores["지크 예거"] += 2;
      scores["한지 조에"] += 2;
      scores["피크 핑거"] += 1;
    } else if (userAnswers[7] === "솔선수범하며, 원칙과 책임감, 정의를 중시하는 모범적 리더") {
      scores["리바이 아커만"] += 3;
      scores["미카사 아커만"] += 2;
      scores["도트 픽시스"] += 2;
      scores["엘빈 스미스"] += 1;
    } else if (userAnswers[7] === "변화와 혁신을 두려워하지 않고 새로운 길을 개척하는 도전적 리더") {
      scores["에렌 예거"] += 3;
      scores["한지 조에"] += 2;
      scores ["가비 브라운"] += 2;
      scores["엘빈 스미스"] += 1;
    }
    
    // 질문 9: 중요한 가치
    if (userAnswers[8] === "자유와 독립성") {
      scores["에렌 예거"] += 3;
      scores["유미르"] += 3;
      scores["케니 아커만"] += 2;
      scores["한지 조에"] += 1;
    } else if (userAnswers[8] === "가족과 사랑하는 사람들과의 관계") {
      scores["미카사 아커만"] += 3;
      scores["카를라 예거"] += 3;
      scores["팔코 그라이스"] += 2;
      scores["히스토리아 레이스"] += 1;
    } else if (userAnswers[8] === "정의와 진실") {
      scores["엘빈 스미스"] += 3;
      scores["리바이 아커만"] += 2;
      scores["아르민 알레르트"] += 2;
      scores["에렌 예거"] += 1;
    } else if (userAnswers[8] === "성취와 성공") {
      scores["가비 브라운"] += 3;
      scores["라이너 브라운"] += 2;
      scores["포르코 갤리아드"] += 2;
      scores["피크 핑거"] += 1;
    } else if (userAnswers[8] === "안정과 평화") {
      scores["도트 픽시스"] += 3;
      scores["베르톨트 후버"] += 2;
      scores["마르코 보트"] += 2;
      scores["팔코 그라이스"] += 1;
    }
    
    // 질문 10: 새로운 도전에 대한 태도
    if (userAnswers[9] === "새로운 가능성에 흥분하며 적극적으로 도전한다") {
      scores["에렌 예거"] += 3;
      scores["한지 조에"] += 3;
      scores["가비 브라운"] += 2;
      scores["코니 스프링거"] += 1;
    } else if (userAnswers[9] === "위험과 이득을 철저히 분석한 후 행동한다") {
      scores["지크 예거"] += 3;
      scores["피크 핑거"] += 2;
      scores["아르민 알레르트"] += 2;
      scores["도트 픽시스"] += 1;
    } else if (userAnswers[9] === "경험 많은 사람들의 조언을 구하고 신중하게 접근한다") {
      scores["팔코 그라이스"] += 3;
      scores["베르톨트 후버"] += 2;
      scores["마르코 보트"] += 2;
      scores["히스토리아 레이스"] += 1;
    } else if (userAnswers[9] === "자신의 직관과 능력을 믿고 상황에 맞게 유연하게 대응한다") {
      scores["리바이 아커만"] += 3;
      scores["미카사 아커만"] += 2;
      scores["장 키르슈타인"] += 2;
      scores["사샤 블라우스"] += 1;
    } else if (userAnswers[9] === "기존의 경험과 지식을 바탕으로 체계적으로 접근한다") {
      scores["엘빈 스미스"] += 3;
      scores["아르민 알레르트"] += 2;
      scores["라이너 브라운"] += 2;
      scores["그리샤 예거"] += 1;
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

    // 동점일 경우 이름 순으로 정렬하여 항상 일관된 결과 제공
    topCharacters.sort();
    const selectedCharName = topCharacters[0];

    // 잘 맞는 캐릭터 선정 (메인 캐릭터 제외하고 상위 2개)
    let compatibleCharacters: string[] = [];

    const sortedScores = Object.entries(scores)
      .filter(([name]) => name !== selectedCharName)
      .sort((a, b) => b[1] - a[1]);

    // 상위 2개 캐릭터 선택
    compatibleCharacters = sortedScores.slice(0, 2).map(([name]) => name);

    // 잘 안맞는 캐릭터 (최하위 점수 가진 캐릭터들 중 하나)
    // 최하위 점수 찾기
    const lowestScore = sortedScores[sortedScores.length - 1][1];
    // 최하위 점수를 가진 캐릭터들 찾기
    let lowestScoringCharacters = sortedScores
      .filter(([name, score]) => score === lowestScore)
      .map(([name]) => name);
    
    // 캐릭터 점수 분산을 위해 lowestScore+1 점수를 가진 캐릭터들도 포함
    if (lowestScoringCharacters.length < 3 && sortedScores.length > 5) {
      const secondLowestScore = sortedScores
        .filter(([name, score]) => score > lowestScore)
        .pop()?.[1];
      
      if (secondLowestScore) {
        const moreCharacters = sortedScores
          .filter(([name, score]) => score === secondLowestScore)
          .map(([name]) => name);
        
        lowestScoringCharacters = [...lowestScoringCharacters, ...moreCharacters];
      }
    }
    
    // 항상 동일한 결과를 위해 이름순 정렬 후 첫 번째 선택
    lowestScoringCharacters.sort();
    const incompatibleCharacter = lowestScoringCharacters[0];

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

  const resetSurvey = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  const progressPercentage = (currentQuestion / questions.length) * 100;

  return (
    <div className="titan-card p-6 md:p-8" id="survey-container">
      {/* 벽 균열 효과 */}
      {[1, 2, 3, 4, 5].map((crackNum) => (
        <div 
          key={crackNum}
          className={`wall-crack crack-${crackNum} ${
            cracksVisible.includes(crackNum) || result ? 'visible' : 'hidden'
          }`}
          style={{
            opacity: cracksVisible.includes(crackNum) || result ? 1 : 0,
            transition: 'opacity 0.8s ease-in'
          }}
        ></div>
      ))}
      
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
