import React, { useEffect, useState } from "react";

interface QuestionProps {
  question: string;
  options: string[];
  onAnswer: (answer: string) => void;
  questionIndex: number;
}

// 진격의 거인 명대사 배열
const famousQuotes = [
  "저기 바깥 세계에는 자유가 있다.",
  "이 세상은 잔혹하다... 그래서 아름답다.",
  "인류의 적은 거인이 아니라 인간이다.",
  "네가 이긴다면 살 수 있다. 지면 죽는다. 싸우지 않으면 이길 수 없다!",
  "다 죽여버릴 거야... 한 놈도 남김없이...",
  "어떤 꿈을 위해 술 취한 채로 죽어나가는 것도 좋겠지만, 그런 꿈 때문에 내가 죽게 되는 건 참을 수 없어.",
  "내 특기는 부하를 죽이는 데 재능이 있다고 들은 적이 있다.",
  "신뢰란 쌍방향이 아니면 성립되지 않는다.",
  "내가 너희들에게 물려준 건, 등에 날개가 달린 자유가 아니라, 발밑의 단단한 대지다.",
  "현실이 잔혹하다면, 비현실적이 되면 된다.",
  "죽은 자의 숫자보다 산 자들의 기억 속에 그들이 어떻게 살았는지가 더 중요하다.",
  "세상의 잔혹함을 알고도 그것을 부정하는 자, 스스로 눈을 감는 자에게 어떤 해결책도 떠오르지 않을 것이다.",
  "싸워! 이겨! 살아!",
  "우리는 이 자리에서 죽고! 다음으로 살아갈 자들에게 의미를 맡긴다",
  "병사여 분노하라! 병사여 외쳐라!",
  "병사여!! 싸워라!!",
];

export function Question({
  question,
  options,
  onAnswer,
  questionIndex,
}: QuestionProps) {
  // 클라이언트 사이드에서만 렌더링되도록 상태 설정
  const [quote, setQuote] = useState<string>("");
  const [mounted, setMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // 컴포넌트가 마운트된 후에만 랜덤 명언 선택
  useEffect(() => {
    setMounted(true);
    const randomOffset = Math.floor(Math.random() * 3);
    const quoteIndex = (questionIndex + randomOffset) % famousQuotes.length;
    setQuote(famousQuotes[quoteIndex]);
  }, [questionIndex]);

  // 중복 클릭 방지 및 이벤트 처리 최적화
  const handleAnswerClick = (e: React.MouseEvent, option: string) => {
    e.preventDefault();
    
    // 이미 처리 중이면 중복 실행 방지
    if (isProcessing) return;
    
    setIsProcessing(true);
    
    // 답변 처리
    onAnswer(option);
    
    // 일정 시간 후 처리 상태 초기화 (다음 질문에서 다시 클릭 가능하도록)
    setTimeout(() => {
      setIsProcessing(false);
    }, 500);
  };

  return (
    <div className="space-y-6">
      <h2 className="titan-header text-xl font-bold">{question}</h2>

      <div className="space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            className={`titan-button w-full text-left p-3 rounded-md flex items-center hover:bg-opacity-90 transition-all ${
              isProcessing ? "opacity-70 pointer-events-none" : ""
            }`}
            onClick={(e) => handleAnswerClick(e, option)}
            disabled={isProcessing}
          >
            <div className="mr-3 w-7 h-7 flex items-center justify-center rounded-full border-2 border-accent text-accent font-bold">
              {index + 1}
            </div>
            <span>{option}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 text-xs text-muted italic text-center p-4 bg-primary-light bg-opacity-30 rounded-md">
        &ldquo;{mounted ? quote : "저기 바깥 세계에는 자유가 있다."}&rdquo;
      </div>
    </div>
  );
}
