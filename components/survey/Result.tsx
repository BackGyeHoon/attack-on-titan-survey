import React, { useState, useEffect } from "react";

interface ResultProps {
  character: string;
  description: string;
  image?: string;
  onReset: () => void;
  compatibleCharacters?: string[];
  incompatibleCharacter?: string;
}

// 캐릭터별 명언
const characterQuotes: Record<string, string[]> = {
  "에렌 예거": [
    "싸우지 않으면 이길 수 없다!",
    "나는 태어났을 때부터 자유로웠다.",
    "나는 특별해. 왜냐하면 이 세상에 태어났으니까.",
    "나는 앞으로 나아갈 것이다. 자유를 얻기 위해 적이라도 짓밟으며.",
    "죽을 때까지 계속 앞으로 나아가는 사람만이 진정한 자유를 얻을 수 있다.",
    "그날의 일을 절대로 잊지 않겠다고 다짐했어. 그날 세상은 내게 상기시켰지. 이 감옥에 갇혀 있다는 걸... 가축의 굴욕을...",
    "왜... 왜 내가 이런 기분일까... 내가 이 세상에서 가장 자유로운 사람 아니었나?",
  ],
  "미카사 아커만": [
    "세상은 잔혹해. 그렇기 때문에 아름답다.",
    "이 세상은 잔인하지만, 당신이 있으면 충분해요.",
    "당신이 싸울 때 나도 싸울게요.",
    "에렌, 돌아와.",
    "그만둬... 더 이상은 못 봐.",
  ],
  "아르민 알레르트": [
    "포기한다는 것은 죽은 사람들의 희생을 버리는 것이다.",
    "미래는 항상 바뀔 수 있어.",
    "지금 해결할 수 없는 문제는 내일의 내가 해결할 수 있다.",
    "우리가 졌다고 진 게 아니야. 싸우지 않은 자만이 진 것이다.",
    "사람은 누구나 술에 취해 죽어가는 꿈을 꿔. 하지만 꿈이 현실이 되고 당신 때문에 죽어간다면 사람들은 자신의 꿈을 저버리게 될 거야.",
    "좋은 사람이라는 건 무슨 의미일까... 그건 모든 사람에게 좋은 사람인가? 아니면 몇몇 중요한 사람에게만?",
    "거짓말쟁이가 되는 것도 때로는 필요한 자질이야.",
  ],
  "리바이 아커만": [
    "실수해도 괜찮아. 다음에 살아있지 않을 거니까.",
    "선택에는 후회 없이.",
    "죽은 자들의 말을 들어. 그들은 말하고 있어... 그들의 인생에 의미가 있었나고 묻고 있지.",
    "우리가 어떻게 진격의 거인과 싸울 수 있겠어, 모두 완전히 겁에 질려 있는데.",
    "내 몸은 무수히 베이고 찢겼지만 아직도 움직여. 그런데 넌 뭐가 무서워서 그 칼을 버리는 거지?",
    "딱 두 가지 선택이 있어. 조용히 죽든지, 아니면 싸워서 이기든지.",
    "성공의 길은 항상 고통과 죽음으로 뒤덮여 있지.",
  ],
  "엘빈 스미스": [
    "인류는 포기하지 않는 한 패배하지 않는다!",
    "때로는 인류의 승리를 위해 인간성을 버려야 할 때가 있다.",
    "꿈을 포기하고 죽어라, 동료들을 이끌고 죽어라...",
    "인간이 거인을 이기려면 인간성을 버려야 한다고 깨달았습니다.",
    "우리의 죽음이 미래를 바꿀 수 있다면, 죽음은 의미를 갖습니다.",
    "승자가 역사를 쓴다는 말이 있지. 우리가 승자임을 증명해 보자.",
    "모든 사람들은 언젠가 죽는다. 그 누구도 죽음을 알 수 없다. 그것이 삶의 의미가 전혀 없다는 뜻일까? 아니다! 우리가 태어난 것은 의미가 있다!",
    "병사여! 분노하라! 병사여! 외쳐라! 병사여! 싸워라! 병사여!! 승리하라!!",
  ],
  "한지 조에": [
    "안녕, 아름다운 표본!",
    "우리가 거인에 대해 아는 것보다 모르는 것이 더 많아.",
    "과학은 호기심에서 시작되죠.",
    "우리가 알고 있는 게 뭔지 생각하면, 실은 하나도 모르고 있는 걸 깨닫게 되죠.",
    "실패는 과학적 발견의 초석이죠! 다음에는 더 큰 폭발이 일어나도록 노력하겠습니다.",
    "적이 아니라고? 그럼 우린 뭐지? 친구라고? 어째서 친구가 서로를 죽이지?",
    "이봐, 내가 미쳤다는 소리 할 생각이면 그만해. 내가 미쳤다는 걸 이미 알고 있으니까.",
    "죽음은 인생에서 유일하게 확실한 결과야. 죽음이 있기에 우리는 의미를 찾을 수 있는 거지.",
  ],
  "지크 예거": [
    "잘 생각해보세요. 우리가 태어나지 않았다면, 이런 고통도 없었을 것입니다.",
    "구원은 없다. 그것만이 진실이다.",
    "없었던 생명은 고통받지 않는다. 그것이 바로 구원이다.",
    "우리 엘디아인들의 비참한 역사는 이제 끝나야 한다.",
    "난 너를 구하러 왔어, 에렌.",
    "진정한 구원이란 무엇일까? 그것은 아직 태어나지 않은 아이들에게 있지 않을까?",
    "이 세상은 잔인해, 에렌. 내가 먼저 일을 시작했으니 끝내는 것도 내가 할게.",
    "모든 것에는 때가 있어. 이제 우리 차례야.",
  ],
  "라이너 브라운": [
    "우리들은 전사가 되는 거다! 세계에서 가장 강한 전사가 되는 거야!",
    "누가 봐도 좋게 보이지 않는 일들을 우리는 해냈어.",
    "저는 더이상 전사가 될 자격이 없습니다.",
    "이제 누가 옳고 그른지는 중요하지 않아. 멈출 수 있는 사람이 없어.",
    "무슨 일이 있어도 난 돌아갈 거야. 마레로...",
    "왜 마르코가 죽었는데 내가 살아있는 거지?",
    "여기 있는 모두들은 미친 놈들이야. 우리가 거인들을 죽이려고 몰려다니는 거 아니면, 우리는 서로를 죽이려고 하잖아.",
    "나는 ... 가장 비참한 녀석이었어.",
  ],
  "애니 레온하트": [
    "세상은 잔인해. 하지만 나는 더 잔인해질 수밖에 없어.",
    "나는 온 세상을 적으로 돌렸어.",
    "난 그저 집에 돌아가고 싶을 뿐이야.",
    "난 인간이 아니야. 괴물이야.",
    "아무것도 증명할 가치가 없어... 더 이상 중요하지 않아.",
    "모든 것이 무너지는 지금... 나만은 인간이고 싶었어.",
    "그럼에도 불구하고, 나는 사람이 되고 싶었어.",
    "내 아버지가 틀렸다는 걸 증명하고 싶었던 것뿐이야.",
  ],
  "베르톨트 후버": [
    "누구도 이런 일이 일어나길 원하지 않았어.",
    "아무도 틀리지 않았어... 다만 세계가 잔인할 뿐이야.",
    "난 더 이상 무고한 사람이 아냐... 하지만 나는 계속 나아가야 해.",
    "진심으로 미안해... 하지만 이제 난 선택했어.",
    "누군가는 더러운 일도 해야 하니까.",
    "좋은 사람인가, 나쁜 사람인가... 그것은 관점의 문제일 뿐이야.",
    "아무리 큰 힘을 가졌어도, 그것을 사용할 의지가 없다면 쓸모가 없어.",
    "너희들에게는 미안하게 생각해. 하지만 나는 계속해서 살아갈 거야.",
  ],
  "히스토리아 레이스": [
    "난 최악의 소녀야. 가장 좋아하는 사람도 구하지 못한 소녀.",
    "이제부터 난 그냥 평범한 인간으로 살아갈 거야.",
    "난 크리스타가 아니야. 난 히스토리아야!",
    "우리가 태어났다는 것 자체로도 기적이야.",
    "그건 간단해. 당신이 나의 적이라면 난 당신의 적이 될 수밖에 없어.",
    "난 더 이상 거짓말로 살지 않을 거야. 난 히스토리아 레이스로 살 거야.",
    "내 인생은 내가 선택한 대로 살 거야.",
    "난 히스토리아 레이스. 내 인생을 자랑스럽게 살 것이다!",
  ],
  "그리샤 예거": [
    "에렌, 이 기억들을 통해 진실을 알게 될 거야.",
    "난 그저 누구나 자유롭게 살 수 있는 세상을 원했을 뿐이야.",
    "복수를 위해 살아왔지만, 지금은 그저 가족을 지키고 싶어.",
    "역사는 반복된다. 하지만 우리는 그 사슬을 끊을 수 있어.",
    "때로는 악마가 되어야만 결과를 바꿀 수 있다.",
    "난 파라디의 희망이자 저주였지.",
    "진실을 알게 되면 너도 이해하게 될 거야. 왜 이런 선택을 했는지.",
    "이 세상의 진실을 알게 되면, 모든 것이 변할 거야.",
  ],
  "카를라 예거": [
    "미카사를 소중히 여겨주렴. 너희는 이제 가족이야.",
    "에렌, 조사병단은 안 돼. 위험해!",
    "가족을 지키는 것만큼 중요한 것은 없단다.",
    "평범한 일상이 얼마나 소중한지 알게 될 거야.",
    "아무리 세상이 잔인해도, 가족이 있으면 견딜 수 있어.",
    "내 사랑은 언제나 너희와 함께 있을 거야.",
    "때로는 싸우는 것보다 살아남는 것이 더 큰 용기를 필요로 해.",
  ],
  "프록 폴스타": [
    "악마를 물리치려면 더 큰 악마가 필요하다.",
    "엘디아의 새 시대를 위해 우리는 싸운다!",
    "에렌 예거는 우리의 유일한 희망이다.",
    "동료들의 죽음이 헛되지 않게 하겠다.",
    "내가 살아남은 건 이유가 있어. 복원파를 이끌기 위해.",
    "지옥 속에서도 악마와 함께라면 천국을 만들 수 있어.",
    "전쟁에서는 승자만이 정의다. 그 외에는 아무것도 중요하지 않아.",
    "타협은 없다. 적들은 모두 제거해야 해.",
  ],
  "케니 아커만": [
    "모두가 광기에 취해 있어. 술, 여자, 신... 모두가 뭔가에 미쳐있지.",
    "내 동생은 아이를 지키려다 죽었고, 나는 그 아이를 가르쳤다.",
    "누구나 한 번쯤은 미친 듯이 취해보고 싶지 않나?",
    "난 리바이에게 살아남는 법을 가르쳤어. 그게 내가 할 수 있는 전부였지.",
    "우리는 모두 꿈을 쫓는다. 하지만 결국 그 꿈은 우리를 배신해.",
    "모든 사람에겐 광기가 있어. 그게 우리를 인간으로 만드는 거지.",
    "나도 한때는 꿈이 있었어... 그냥 누군가를 위해 살아보고 싶었지.",
    "죽음 앞에서 우리는 모두 똑같아. 강한 자도, 약한 자도.",
  ],
  "도트 픽시스": [
    "술에 취한 채로 거인들과 싸우는 건 어떨까?",
    "인류가 포기하는 순간, 그것이 바로 진정한 패배다.",
    "때로는 무모해 보이는 결정이 최선의 선택일 수 있다.",
    "우리가 지키려는 것은 단순한 벽이 아니라 인류의 존엄성이다.",
    "공포 앞에서도 우리는 전진해야 한다. 그것이 인간의 의무다.",
    "역경 속에서 빛나는 것이 진정한 용기다.",
    "영웅은 특별한 사람이 아니라, 특별한 상황에서 최선을 다하는 사람이다.",
    "나는 항상 전장에서 죽고 싶었다. 좋은 술 한 잔과 함께라면 더할 나위 없지.",
  ],
  유미르: [
    "히스토리아, 넌 네 인생을 자랑스럽게 살아.",
    "60년 동안 악몽 같은 시간을 보냈어. 하지만 이제는 내 선택으로 살 거야.",
    "가짜 이름으로 살아도 결국 중요한 건 진짜 너 자신이야.",
    "내가 후회하는 건 오직 하나, 너와 함께 하지 못한다는 것.",
    "진정한 자유는 스스로 선택할 수 있을 때 찾아와.",
    "누구나 자기 자신을 위해 살 권리가 있어.",
    "넌 그 누구도 아닌 너 자신으로 살아가.",
    "때로는 포기하는 것도 용기가 필요해. 하지만 나는 너를 선택했어.",
  ],
  "포르코 갤리아드": [
    "마레의 전사로서 내 의무를 다하겠다.",
    "내 동생의 희생을 헛되게 하지 않겠어.",
    "라이너 같은 약한 녀석이 어떻게 전사가 된 거지?",
    "난 턱 거인의 힘으로 모든 적을 물리칠 것이다.",
    "승리를 위해서라면 어떤 희생도 감수하겠다.",
    "마르셀... 난 네가 남긴 유산을 지킬게.",
    "마레를 위해 싸우는 것이 나의 사명이다.",
    "힘은 책임감과 함께 와야 한다. 그걸 잊지 않겠어.",
  ],
  "코니 스프링거": [
    "내가 좀 바보 같은 말을 많이 하지만, 친구들을 위해서라면 무엇이든 할 수 있어.",
    "두렵다고? 그래, 모두가 두려워. 하지만 그럼에도 우리는 싸워야 해.",
    "세상이 미쳐가는 건지, 우리가 미쳐가는 건지 모르겠어.",
    "우린 단짓 평범한 사람들이었을 뿐이야. 하지만 지금은 군인이야.",
    "때론 웃음이 최고의. 무기가 될 수 있어.",
    "우리가 살아남으면 다시 예전처럼 웃을 수 있을까?",
    "엄마... 난 좋은 군인이 되었어. 이제 돌아갈게.",
    "세상이 무너져도 친구들과 함께라면 어떻게든 버틸 수 있어.",
  ],
  "사샤 블라우스": [
    "고기다!",
    "빵 한 조각을 자신도 굶주리면서 나눠주는 사람이야말로 진정한 영웅이야.",
    "배고프면 어떤 일도 제대로 할 수 없어.",
    "이 세상에서 음식만큼 소중한 건 없어.",
    "모두가 배불리 먹을 수 있는 세상이 왔으면 좋겠어.",
    "난 그냥 자유롭게 사냥하고 맛있는 걸 먹으며 살고 싶었을 뿐이야.",
    "죽어가는 적에게도 연민을 느끼는 건 인간의 마음이야.",
    "가족들에게 돌아가서 맛있는 고기를 함께 먹고 싶어.",
  ],
  "장 키르슈타인": [
    "이렇게 살다 죽기는 싫어. 내 인생을 바꿀 거야.",
    "난 내 삶을 소중히 여겨. 그래서 더 강해지려고 해.",
    "미카사, 네 머리가 너무 예뻐.",
    "에렌이 잘못된 길로 가고 있어. 우린 그를 막아야 해.",
    "내가 왜 조사병단에 들어왔는지 모르겠어... 하지만 이제 돌이킬 수 없어.",
    "솔직히 말하면 난 항상 두려워. 하지만 그럼에도 여기 있잖아.",
    "나도 영웅이 되고 싶었던 적이 있었어. 이젠 그냥 살아남고 싶을 뿐이야.",
    "때로는 자기 자신을 믿는 것보다 동료를 믿는 게 더 중요해.",
  ],
  "가비 브라운": [
    "나는 마레의 명예 마레인이 될 거야!",
    "악마의 자손들은 모두 파라디 섬으로 돌아가야 해.",
    "넌 내 적이었지만, 이제는 이해해. 우리가 얼마나 비슷한지.",
    "세상은 우리가 생각했던 것과 달라.",
    "어른들이 가르쳐준 진실이 거짓일 수도 있어.",
    "이 총은 내가 적들을 물리치는 무기야. 절대 놓지 않을 거야.",
    "그 순간 깨달았어. 우리가 얼마나 같은 사람들인지.",
    "복수는 또 다른 복수를 낳을 뿐이야.",
  ],
  "팔코 그라이스": [
    "난 마레에 충성을 다하겠어.",
    "가비, 진정해. 우리 모두 같은 사람들이야.",
    "어른들의 전쟁에 아이들이 끌려들어가야 하는 게 맞는 걸까?",
    "난 그저 가족을 위해 전사가 되고 싶었을 뿐이야.",
    "나는 거인의 힘을 미워하지 않아. 그 힘으로 모두를 지킬 수 있다면.",
    "세상에 악도 선도 없어. 그저 다른 관점만 있을 뿐이야.",
    "그냥 평범하게 살고 싶었는데, 운명은 그렇게 두지 않았어.",
    "나도 언젠가 용기 있는 선택을 할 수 있을까?",
  ],
  "피크 핑거": [
    "난 항상 딱 맞는 선택을 해왔어.",
    "전략적으로 생각하면, 결국 우리는 같은 목표를 가지고 있어.",
    "짐승형 거인의 힘은 모든 지형에서의 적응력을 주지.",
    "지크를 믿기로 한 건 내 직감이야. 그리고 내 직감은 틀린 적이 없어.",
    "마레에 충성하지만, 그건 내가 맹목적이라는 뜻은 아니야.",
    "긴 시간 거인의 형태로 있으면, 인간으로 돌아오고 싶지 않을 때도 있어.",
    "우리 모두 도구일 뿐이야. 중요한 건 누구의 손에 있느냐지.",
    "평화는 언젠가 찾아올 거야. 하지만 그 전에 우리가 해야 할 일이 있어.",
  ],
};

// 공통 명언
const commonQuotes = [
  "우리는, 벽 안에 갇혀있는 가축이었다.",
  "다 죽여버릴 거야... 한 놈도 남김없이...",
  "내가 너희들에게 물려준 건, 등에 날개가 달린 자유가 아니라, 발밑의 단단한 대지다.",
  "죽은 자의 숫자보다, 산 자들의 기억 속에 그들이 어떻게 살았는지가 더 중요하다.",
  "세상의 잔혹함을 알고도 그것을 부정하는 자, 스스로 눈을 감는 자에게 어떤 해결책도 떠오르지 않을 것이다.",
  "싸워! 이겨! 살아!",
  "이 잔인한 세상에서 살아남는 유일한 방법은 싸우는 것뿐이다.",
  "자유에는 대가가 따른다.",
  "우리는 선택의 결과로만 살아갈 수 있다.",
  "죽은 자는 이야기하지 않는다. 그러남 그들의 선택은 살아남은 자들에게 의미를 준다.",
];

export function Result({
  character,
  description,
  image,
  onReset,
  compatibleCharacters = [],
  incompatibleCharacter = "",
}: ResultProps) {
  const [imageError, setImageError] = useState(false);
  const [characterQuote, setCharacterQuote] =
    useState<string>("싸워! 이겨! 살아!");
  const [mounted, setMounted] = useState(false);

  // 클라이언트 사이드에서만 명언 선택
  useEffect(() => {
    setMounted(true);
    // 해당 캐릭터의 명언이 있으면 그 중에서 랜덤 선택, 없으면 공통 명언에서 선택
    const quotes = characterQuotes[character] || commonQuotes;
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCharacterQuote(quotes[randomIndex]);
  }, [character]);

  // 기본 이미지 매핑 (실제 프로젝트에서는 더 나은 이미지를 사용하세요)
  const getDefaultImage = (name: string) => {
    const characterMap: Record<string, string> = {
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
      // 실제 배포 시 더 많은 캐릭터 이미지 추가
    };

    // 기본 이미지가 없을 경우 null 반환
    return characterMap[name] || null;
  };

  // 속성 매핑 (캐릭터별 주요 특성)
  const getAttributes = (name: string) => {
    const attributeMap: Record<
      string,
      {
        strength: number;
        intelligence: number;
        leadership: number;
        compassion: number;
      }
    > = {
      "에렌 예거": {
        strength: 8,
        intelligence: 7,
        leadership: 7,
        compassion: 6,
      },
      "미카사 아커만": {
        strength: 10,
        intelligence: 7,
        leadership: 6,
        compassion: 8,
      },
      "아르민 알레르트": {
        strength: 5,
        intelligence: 10,
        leadership: 8,
        compassion: 9,
      },
      "리바이 아커만": {
        strength: 10,
        intelligence: 8,
        leadership: 9,
        compassion: 7,
      },
      "엘빈 스미스": {
        strength: 8,
        intelligence: 10,
        leadership: 10,
        compassion: 7,
      },
      "한지 조에": {
        strength: 7,
        intelligence: 10,
        leadership: 8,
        compassion: 8,
      },
      "지크 예거": {
        strength: 8,
        intelligence: 9,
        leadership: 9,
        compassion: 6,
      },
      "라이너 브라운": {
        strength: 9,
        intelligence: 7,
        leadership: 8,
        compassion: 8,
      },
      "애니 레온하트": {
        strength: 9,
        intelligence: 8,
        leadership: 7,
        compassion: 6,
      },
      "베르톨트 후버": {
        strength: 9,
        intelligence: 7,
        leadership: 6,
        compassion: 7,
      },
      "히스토리아 레이스": {
        strength: 6,
        intelligence: 7,
        leadership: 8,
        compassion: 9,
      },
      "코니 스프링거": {
        strength: 7,
        intelligence: 6,
        leadership: 6,
        compassion: 8,
      },
      "사샤 블라우스": {
        strength: 7,
        intelligence: 7,
        leadership: 5,
        compassion: 8,
      },
      "장 키르슈타인": {
        strength: 8,
        intelligence: 8,
        leadership: 8,
        compassion: 7,
      },
      "가비 브라운": {
        strength: 7,
        intelligence: 7,
        leadership: 6,
        compassion: 5,
      },
      "팔코 그라이스": {
        strength: 6,
        intelligence: 7,
        leadership: 6,
        compassion: 9,
      },
      "피크 핑거": {
        strength: 8,
        intelligence: 9,
        leadership: 7,
        compassion: 7,
      },
      "그리샤 예거": {
        strength: 7,
        intelligence: 9,
        leadership: 8,
        compassion: 7,
      },
      "카를라 예거": {
        strength: 4,
        intelligence: 7,
        leadership: 5,
        compassion: 10,
      },
      "프록 폴스타": {
        strength: 7,
        intelligence: 6,
        leadership: 7,
        compassion: 3,
      },
      "케니 아커만": {
        strength: 9,
        intelligence: 8,
        leadership: 7,
        compassion: 4,
      },
      "도트 픽시스": {
        strength: 6,
        intelligence: 9,
        leadership: 9,
        compassion: 7,
      },
      유미르: {
        strength: 8,
        intelligence: 7,
        leadership: 6,
        compassion: 7,
      },
      "포르코 갤리아드": {
        strength: 9,
        intelligence: 7,
        leadership: 7,
        compassion: 6,
      },
    };

    return (
      attributeMap[name] || {
        strength: 7,
        intelligence: 7,
        leadership: 7,
        compassion: 7,
      }
    );
  };

  const characterImg = image || getDefaultImage(character);
  const attributes = getAttributes(character);

  const defaultQuote = "싸워! 이겨! 살아!";

  // 캐릭터 관계 데이터 - 잘 맞는 캐릭터와 안 맞는 캐릭터를 정의
  const characterRelationships: Record<
    string,
    { 
      compatible: string[]; 
      incompatible: string;
      compatibleReasons: Record<string, string>;
      incompatibleReason: string;
    }
  > = {
    "에렌 예거": {
      compatible: ["미카사 아커만", "아르민 알레르트"],
      incompatible: "지크 예거",
      compatibleReasons: {
        "미카사 아커만": "어린 시절부터 깊은 유대감을 가진 가족과 같은 존재입니다. 미카사의 절대적인 충성심과 에렌의 결단력이 조화를 이룹니다.",
        "아르민 알레르트": "마음을 터놓는 오랜 친구로, 아르민의 지적 능력과 에렌의 추진력이 완벽한 균형을 이룹니다."
      },
      incompatibleReason: "근본적으로 다른 세계관을 가지고 있어, 둘의 철학적 차이가 큰 갈등을 불러일으킵니다."
    },
    "미카사 아커만": {
      compatible: ["에렌 예거", "아르민 알레르트"],
      incompatible: "애니 레온하트",
      compatibleReasons: {
        "에렌 예거": "깊은 애정과 보호 본능을 가지고 있으며, 에렌에 대한 헌신적인 충성심을 가지고 있습니다.",
        "아르민 알레르트": "서로의 부족한 점을 보완해주는 좋은 팀워크를 가지고 있습니다. 아르민의 전략과 미카사의 전투 능력이 완벽하게 조화됩니다."
      },
      incompatibleReason: "에렌을 위협하는 존재로 인식하며, 서로의 가치관과 목표가 명확히 충돌합니다."
    },
    "아르민 알레르트": {
      compatible: ["에렌 예거", "미카사 아커만"],
      incompatible: "베르톨트 후버",
      compatibleReasons: {
        "에렌 예거": "어릴 적부터 친구로서 서로의 꿈을 공유해왔으며, 에렌의 힘과 아르민의 지혜가 완벽한 조합을 이룹니다.",
        "미카사 아커만": "서로의 장점을 존중하며, 아르민의 전략적 사고와 미카사의 전투 능력이 효과적으로 조화를 이룹니다."
      },
      incompatibleReason: "코로살 거인의 능력을 물려받은 복잡한 관계로, 서로의 과거와 정체성이 충돌합니다."
    },
    "리바이 아커만": {
      compatible: ["한지 조에", "엘빈 스미스"],
      incompatible: "케니 아커만",
      compatibleReasons: {
        "한지 조에": "서로의 강점을 보완해주는 균형 잡힌 관계입니다.",
        "엘빈 스미스": "서로의 강점을 보완해주는 균형 잡힌 관계입니다."
      },
      incompatibleReason: "가치관과 목표의 차이로 인해 충돌이 자주 발생합니다."
    },
    "엘빈 스미스": {
      compatible: ["리바이 아커만", "한지 조에"],
      incompatible: "지크 예거",
      compatibleReasons: {
        "리바이 아커만": "서로의 강점을 보완해주는 균형 잡힌 관계입니다.",
        "한지 조에": "서로의 강점을 보완해주는 균형 잡힌 관계입니다."
      },
      incompatibleReason: "가치관과 목표의 차이로 인해 충돌이 자주 발생합니다."
    },
    "한지 조에": {
      compatible: ["리바이 아커만", "엘빈 스미스"],
      incompatible: "피크 핑거",
      compatibleReasons: {
        "리바이 아커만": "서로의 강점을 보완해주는 균형 잡힌 관계입니다.",
        "엘빈 스미스": "서로의 강점을 보완해주는 균형 잡힌 관계입니다."
      },
      incompatibleReason: "가치관과 목표의 차이로 인해 충돌이 자주 발생합니다."
    },
    "지크 예거": {
      compatible: ["피크 핑거", "포르코 갤리아드"],
      incompatible: "에렌 예거",
      compatibleReasons: {
        "피크 핑거": "서로의 강점을 보완해주는 균형 잡힌 관계입니다.",
        "포르코 갤리아드": "서로의 강점을 보완해주는 균형 잡힌 관계입니다."
      },
      incompatibleReason: "가치관과 목표의 차이로 인해 충돌이 자주 발생합니다."
    },
    "라이너 브라운": {
      compatible: ["베르톨트 후버", "애니 레온하트"],
      incompatible: "에렌 예거",
      compatibleReasons: {
        "베르톨트 후버": "서로의 강점을 보완해주는 균형 잡힌 관계입니다.",
        "애니 레온하트": "서로의 강점을 보완해주는 균형 잡힌 관계입니다."
      },
      incompatibleReason: "가치관과 목표의 차이로 인해 충돌이 자주 발생합니다."
    },
    "애니 레온하트": {
      compatible: ["라이너 브라운", "베르톨트 후버"],
      incompatible: "미카사 아커만",
      compatibleReasons: {
        "라이너 브라운": "서로의 강점을 보완해주는 균형 잡힌 관계입니다.",
        "베르톨트 후버": "서로의 강점을 보완해주는 균형 잡힌 관계입니다."
      },
      incompatibleReason: "가치관과 목표의 차이로 인해 충돌이 자주 발생합니다."
    },
    "베르톨트 후버": {
      compatible: ["라이너 브라운", "애니 레온하트"],
      incompatible: "아르민 알레르트",
      compatibleReasons: {
        "라이너 브라운": "서로의 강점을 보완해주는 균형 잡힌 관계입니다.",
        "애니 레온하트": "서로의 강점을 보완해주는 균형 잡힌 관계입니다."
      },
      incompatibleReason: "가치관과 목표의 차이로 인해 충돌이 자주 발생합니다."
    },
    "히스토리아 레이스": {
      compatible: ["유미르", "프록 폴스타"],
      incompatible: "리바이 아커만",
      compatibleReasons: {
        "유미르": "서로의 강점을 보완해주는 균형 잡힌 관계입니다.",
        "프록 폴스타": "서로의 강점을 보완해주는 균형 잡힌 관계입니다."
      },
      incompatibleReason: "가치관과 목표의 차이로 인해 충돌이 자주 발생합니다."
    },
    "가비 브라운": {
      compatible: ["팔코 그라이스", "라이너 브라운"],
      incompatible: "사샤 블라우스",
      compatibleReasons: {
        "팔코 그라이스": "서로의 강점을 보완해주는 균형 잡힌 관계입니다.",
        "라이너 브라운": "서로의 강점을 보완해주는 균형 잡힌 관계입니다."
      },
      incompatibleReason: "가치관과 목표의 차이로 인해 충돌이 자주 발생합니다."
    },
    "팔코 그라이스": {
      compatible: ["가비 브라운", "라이너 브라운"],
      incompatible: "포르코 갤리아드",
      compatibleReasons: {
        "가비 브라운": "서로의 강점을 보완해주는 균형 잡힌 관계입니다.",
        "라이너 브라운": "서로의 강점을 보완해주는 균형 잡힌 관계입니다."
      },
      incompatibleReason: "가치관과 목표의 차이로 인해 충돌이 자주 발생합니다."
    },
    "피크 핑거": {
      compatible: ["지크 예거", "포르코 갤리아드"],
      incompatible: "코니 스프링거",
      compatibleReasons: {
        "지크 예거": "서로의 강점을 보완해주는 균형 잡힌 관계입니다.",
        "포르코 갤리아드": "서로의 강점을 보완해주는 균형 잡힌 관계입니다."
      },
      incompatibleReason: "가치관과 목표의 차이로 인해 충돌이 자주 발생합니다."
    },
    "코니 스프링거": {
      compatible: ["사샤 블라우스", "장 키르슈타인"],
      incompatible: "라이너 브라운",
      compatibleReasons: {
        "사샤 블라우스": "서로의 강점을 보완해주는 균형 잡힌 관계입니다.",
        "장 키르슈타인": "서로의 강점을 보완해주는 균형 잡힌 관계입니다."
      },
      incompatibleReason: "가치관과 목표의 차이로 인해 충돌이 자주 발생합니다."
    },
    "사샤 블라우스": {
      compatible: ["코니 스프링거", "니콜로"],
      incompatible: "가비 브라운",
      compatibleReasons: {
        "코니 스프링거": "서로의 강점을 보완해주는 균형 잡힌 관계입니다.",
        "니콜로": "서로의 강점을 보완해주는 균형 잡힌 관계입니다."
      },
      incompatibleReason: "가치관과 목표의 차이로 인해 충돌이 자주 발생합니다."
    },
    "장 키르슈타인": {
      compatible: ["마르코 보트", "미카사 아커만"],
      incompatible: "에렌 예거",
      compatibleReasons: {
        "마르코 보트": "서로의 강점을 보완해주는 균형 잡힌 관계입니다.",
        "미카사 아커만": "서로의 강점을 보완해주는 균형 잡힌 관계입니다."
      },
      incompatibleReason: "가치관과 목표의 차이로 인해 충돌이 자주 발생합니다."
    },
    "그리샤 예거": {
      compatible: ["카를라 예거", "지크 예거"],
      incompatible: "프리다 레이스",
      compatibleReasons: {
        "카를라 예거": "서로의 강점을 보완해주는 균형 잡힌 관계입니다.",
        "지크 예거": "서로의 강점을 보완해주는 균형 잡힌 관계입니다."
      },
      incompatibleReason: "가치관과 목표의 차이로 인해 충돌이 자주 발생합니다."
    },
    "카를라 예거": {
      compatible: ["그리샤 예거", "에렌 예거"],
      incompatible: "키이스 샤디스",
      compatibleReasons: {
        "그리샤 예거": "서로의 강점을 보완해주는 균형 잡힌 관계입니다.",
        "에렌 예거": "서로의 강점을 보완해주는 균형 잡힌 관계입니다."
      },
      incompatibleReason: "가치관과 목표의 차이로 인해 충돌이 자주 발생합니다."
    },
    "프록 폴스타": {
      compatible: ["에렌 예거", "히스토리아 레이스"],
      incompatible: "아르민 알레르트",
      compatibleReasons: {
        "에렌 예거": "서로의 강점을 보완해주는 균형 잡힌 관계입니다.",
        "히스토리아 레이스": "서로의 강점을 보완해주는 균형 잡힌 관계입니다."
      },
      incompatibleReason: "가치관과 목표의 차이로 인해 충돌이 자주 발생합니다."
    },
    "케니 아커만": {
      compatible: ["리바이 아커만", "유리 레이스"],
      incompatible: "에렌 예거",
      compatibleReasons: {
        "리바이 아커만": "서로의 강점을 보완해주는 균형 잡힌 관계입니다.",
        "유리 레이스": "서로의 강점을 보완해주는 균형 잡힌 관계입니다."
      },
      incompatibleReason: "가치관과 목표의 차이로 인해 충돌이 자주 발생합니다."
    },
    "도트 픽시스": {
      compatible: ["키이스 샤디스", "한지 조에"],
      incompatible: "에렌 예거",
      compatibleReasons: {
        "키이스 샤디스": "서로의 강점을 보완해주는 균형 잡힌 관계입니다.",
        "한지 조에": "서로의 강점을 보완해주는 균형 잡힌 관계입니다."
      },
      incompatibleReason: "가치관과 목표의 차이로 인해 충돌이 자주 발생합니다."
    },
    유미르: {
      compatible: ["히스토리아 레이스", "라이너 브라운"],
      incompatible: "프록 폴스타",
      compatibleReasons: {
        "히스토리아 레이스": "서로의 강점을 보완해주는 균형 잡힌 관계입니다.",
        "라이너 브라운": "서로의 강점을 보완해주는 균형 잡힌 관계입니다."
      },
      incompatibleReason: "가치관과 목표의 차이로 인해 충돌이 자주 발생합니다."
    },
    "포르코 갤리아드": {
      compatible: ["피크 핑거", "지크 예거"],
      incompatible: "라이너 브라운",
      compatibleReasons: {
        "피크 핑거": "서로의 강점을 보완해주는 균형 잡힌 관계입니다.",
        "지크 예거": "서로의 강점을 보완해주는 균형 잡힌 관계입니다."
      },
      incompatibleReason: "가치관과 목표의 차이로 인해 충돌이 자주 발생합니다."
    },
  };

  // 입력 캐릭터에 대한 관계 정보 가져오기
  const getRelationships = (name: string) => {
    const defaultRelationships = {
      compatible: ["미카사 아커만", "아르민 알레르트"],
      incompatible: "지크 예거",
      compatibleReasons: {
        "미카사 아커만": "함께할 때 더 강해지는 관계입니다.",
        "아르민 알레르트": "서로의 강점을 보완해주는 균형 잡힌 관계입니다."
      },
      incompatibleReason: "가치관과 목표의 차이로 인해 충돌이 자주 발생합니다."
    };

    return characterRelationships[name] || defaultRelationships;
  };

  // 관계 정보 가져오기
  const relationships = getRelationships(character);

  // 실제 표시할 잘 맞는 캐릭터들과 안 맞는 캐릭터
  const displayCompatible =
    compatibleCharacters.length > 0
      ? compatibleCharacters
      : relationships.compatible;
  const displayIncompatible =
    incompatibleCharacter || relationships.incompatible;

  // 호환 이유 및 비호환 이유 가져오기
  const getCompatibleReason = (compatChar: string) => {
    if (compatibleCharacters.length > 0) {
      return "함께할 때 더 강해지는 관계입니다.";
    }
    return relationships.compatibleReasons[compatChar] || "서로 잘 맞는 궁합을 가지고 있습니다.";
  };

  const getIncompatibleReason = () => {
    if (incompatibleCharacter) {
      return "가치관과 목표의 차이로 인해 충돌이 자주 발생합니다.";
    }
    return relationships.incompatibleReason || "서로 상극인 관계로, 함께하면 갈등이 발생할 수 있습니다.";
  };

  return (
    <div className="text-center">
      <div className="flex items-center justify-center mb-6">
        <div className="h-px bg-primary flex-grow"></div>
        <h2 className="titan-header text-2xl mx-4">결과</h2>
        <div className="h-px bg-primary flex-grow"></div>
      </div>

      <div className="mb-8">
        <h2 className="titan-header text-xl mb-6">{character}</h2>

        {!imageError && characterImg ? (
          <div className="avatar-container mb-6">
            <img
              src={characterImg}
              alt={character}
              className="avatar-image"
              onError={() => setImageError(true)}
            />
          </div>
        ) : (
          <div className="avatar-container mb-6 flex items-center justify-center">
            <span className="text-4xl font-bold text-primary">
              {character[0] || "?"}
            </span>
          </div>
        )}

        <div className="mb-8 p-5 bg-primary-light bg-opacity-30 rounded-md">
          <p className="text-muted italic mb-3 font-medium">
            "{mounted ? characterQuote : defaultQuote}"
          </p>
          <p className="text-foreground">{description}</p>
        </div>

        <div className="mb-8">
          <h3 className="titan-header text-lg mb-4">주요 특성</h3>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">전투력</span>
                <span className="text-sm text-primary font-medium">
                  {attributes.strength}/10
                </span>
              </div>
              <div className="stat-bar-container">
                <div
                  className="stat-bar stat-bar-strength"
                  style={{ width: `${attributes.strength * 10}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">지능</span>
                <span className="text-sm text-accent font-medium">
                  {attributes.intelligence}/10
                </span>
              </div>
              <div className="stat-bar-container">
                <div
                  className="stat-bar stat-bar-intelligence"
                  style={{ width: `${attributes.intelligence * 10}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">리더십</span>
                <span className="text-sm text-green-500 font-medium">
                  {attributes.leadership}/10
                </span>
              </div>
              <div className="stat-bar-container">
                <div
                  className="stat-bar stat-bar-leadership"
                  style={{ width: `${attributes.leadership * 10}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">공감능력</span>
                <span className="text-sm text-yellow-500 font-medium">
                  {attributes.compassion}/10
                </span>
              </div>
              <div className="stat-bar-container">
                <div
                  className="stat-bar stat-bar-compassion"
                  style={{ width: `${attributes.compassion * 10}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* 캐릭터 상성 정보 추가 */}
        <div className="mb-8">
          <h3 className="titan-header text-lg mb-4">캐릭터 상성</h3>

          <div className="p-4 bg-white bg-opacity-15 rounded-md mb-4 border-2 border-green-500">
            <h4 className="text-green-500 text-base font-bold mb-2">
              잘 맞는 캐릭터
            </h4>
            <div className="flex flex-wrap justify-center gap-4">
              {displayCompatible.map((compatChar, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center bg-white bg-opacity-20 px-3 py-3 rounded-md shadow-md border border-green-400"
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-2 bg-gray-200 border-2 border-green-400">
                    {getDefaultImage(compatChar) ? (
                      <img
                        src={getDefaultImage(compatChar) || ""}
                        alt={compatChar}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          if (target.parentElement) {
                            target.parentElement.innerHTML =
                              compatChar[0] || "?";
                            target.parentElement.className +=
                              " flex items-center justify-center text-lg font-bold";
                          }
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-lg font-bold">
                        {compatChar[0] || "?"}
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-medium text-center text-white">
                    {compatChar}
                  </span>
                  <p className="text-xs text-white mt-2 text-center px-1">
                    {getCompatibleReason(compatChar)}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-xs text-white mt-2 bg-green-600 bg-opacity-80 p-2 rounded-md">
              이 캐릭터들과 함께하면 더 큰 시너지를 발휘할 수 있습니다.
            </p>
          </div>

          <div className="p-4 bg-white bg-opacity-15 rounded-md border-2 border-red-500">
            <h4 className="text-red-500 text-base font-bold mb-2">
              잘 안 맞는 캐릭터
            </h4>
            <div className="flex justify-center">
              <div className="flex flex-col items-center bg-white bg-opacity-20 px-4 py-3 rounded-md shadow-md border border-red-400">
                <div className="w-16 h-16 rounded-full overflow-hidden mb-2 bg-gray-200 border-2 border-red-400">
                  {getDefaultImage(displayIncompatible) ? (
                    <img
                      src={getDefaultImage(displayIncompatible) || ""}
                      alt={displayIncompatible}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        if (target.parentElement) {
                          target.parentElement.innerHTML =
                            displayIncompatible[0] || "?";
                          target.parentElement.className +=
                            " flex items-center justify-center text-lg font-bold";
                        }
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-lg font-bold">
                      {displayIncompatible[0] || "?"}
                    </div>
                  )}
                </div>
                <span className="text-sm font-medium text-white">
                  {displayIncompatible}
                </span>
                <p className="text-xs text-white mt-2 text-center px-1">
                  {getIncompatibleReason()}
                </p>
              </div>
            </div>
            <p className="text-xs text-white mt-2 bg-red-600 bg-opacity-80 p-2 rounded-md">
              이 캐릭터와는 가치관이나 행동방식에서 충돌이 있을 수 있습니다.
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={onReset}
        className="titan-button px-6 py-3 rounded-md flex items-center mx-auto"
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
    </div>
  );
}
