'use client';

import { useEffect } from 'react';

interface AdSenseProps {
  /**
   * 광고 슬롯 ID (선택사항)
   * AdSense 대시보드에서 생성한 광고 단위의 슬롯 ID
   */
  adSlot?: string;
  /**
   * 광고 형식
   * 'auto': 자동 광고 (기본값)
   * 'display': 디스플레이 광고
   * 'in-article': 기사 내 광고
   * 'in-feed': 피드 내 광고
   */
  format?: 'auto' | 'display' | 'in-article' | 'in-feed';
  /**
   * 광고 스타일 (인라인 스타일)
   */
  style?: React.CSSProperties;
  /**
   * 광고 클래스명
   */
  className?: string;
  /**
   * 광고 크기 (예: '728x90', '300x250', 'responsive')
   */
  adFormat?: string;
  /**
   * 반응형 광고 여부
   */
  responsive?: boolean;
  /**
   * 광고 위치 설명 (디버깅용)
   */
  position?: string;
}

/**
 * Google AdSense 광고 컴포넌트
 * 
 * 사용 예시:
 * ```tsx
 * <AdSense 
 *   format="display" 
 *   responsive 
 *   style={{ margin: '20px auto', textAlign: 'center' }}
 * />
 * ```
 */
const AdSense: React.FC<AdSenseProps> = ({
  adSlot,
  format = 'auto',
  style,
  className,
  adFormat = 'auto',
  responsive = true,
  position,
}) => {
  useEffect(() => {
    try {
      // AdSense 스크립트가 로드된 후 광고 초기화
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense 초기화 오류:', err);
    }
  }, []);

  const defaultStyle: React.CSSProperties = {
    display: 'block',
    textAlign: 'center',
    minHeight: responsive ? '250px' : '100px',
    margin: '20px 0',
    ...style,
  };

  const adProps: any = {
    className: 'adsbygoogle',
    style: {
      display: 'block',
      ...(adFormat !== 'auto' && !responsive && { width: adFormat.split('x')[0] + 'px', height: adFormat.split('x')[1] + 'px' }),
    },
    'data-ad-client': 'ca-pub-9356840362376703',
    'data-ad-slot': adSlot,
    'data-ad-format': responsive ? 'auto' : adFormat,
    'data-full-width-responsive': responsive ? 'true' : 'false',
  };

  // format에 따라 추가 속성 설정
  if (format === 'in-article') {
    adProps['data-ad-layout'] = 'in-article';
  } else if (format === 'in-feed') {
    adProps['data-ad-layout'] = 'in-feed';
  }

  return (
    <div style={defaultStyle} className={className}>
      {position && (
        <div style={{ fontSize: '12px', color: '#999', marginBottom: '5px' }}>
          {position}
        </div>
      )}
      <ins {...adProps} />
    </div>
  );
};

export default AdSense;

