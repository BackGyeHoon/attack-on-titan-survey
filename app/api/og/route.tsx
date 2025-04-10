import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

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
  "유미르": "/images/ymir.webp",
  "포르코 갤리아드": "/images/porco.webp",
  "마르코 보트": "/images/marco.webp",
};

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    // URL에서 캐릭터 파라미터 추출
    const { searchParams } = new URL(request.url);
    const character = searchParams.get('char') || '';
    
    // 기본 이미지 경로
    let imagePath = '/images/og-image.webp';
    
    // 캐릭터 이름이 있고 해당 이미지가 있으면 그걸 사용
    if (character && characterImageMap[character]) {
      imagePath = characterImageMap[character];
    }
    
    // 이미지의 전체 URL
    const imageUrl = new URL(imagePath, 'https://' + request.headers.get('host')).toString();
    
    // 캐릭터 이름 디코딩
    const characterName = character ? decodeURIComponent(character) : '진격의 거인 캐릭터 테스트';
    
    // OG 이미지 응답 생성
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: '#1a1a1a',
            color: '#fff',
            fontFamily: '"Pretendard", sans-serif',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* 배경 이미지 */}
          <img
            src={imageUrl}
            alt={characterName}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.5,
            }}
          />
          
          {/* 캐릭터 이름 */}
          <div
            style={{
              position: 'absolute',
              bottom: 60,
              fontSize: 60,
              fontWeight: 'bold',
              textAlign: 'center',
              padding: '20px 40px',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              borderRadius: 20,
              maxWidth: '80%',
            }}
          >
            {characterName}
          </div>
          
          {/* 사이트 제목 */}
          <div
            style={{
              position: 'absolute',
              top: 60,
              fontSize: 40,
              fontWeight: 'bold',
              textAlign: 'center',
              padding: '20px 40px',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              borderRadius: 20,
            }}
          >
            진격의 거인 캐릭터 테스트
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    // 에러 발생 시 기본 이미지로 fallback
    console.error('OG 이미지 생성 중 오류:', error);
    return new Response('OG 이미지 생성에 실패했습니다', { status: 500 });
  }
} 