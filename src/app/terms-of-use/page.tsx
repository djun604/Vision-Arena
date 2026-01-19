export const metadata = {
  title: 'Terms of Use - Vision Arena',
  description: 'Vision Arena Terms of Use and Service Agreement',
};

export default function TermsOfUsePage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 0' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem', color: '#111827' }}>
        이용약관 (Terms of Use)
      </h1>
      
      <div style={{ fontSize: '1rem', lineHeight: '1.8', color: '#374151' }}>
        <p style={{ marginBottom: '1rem', color: '#6b7280' }}>
          최종 업데이트: {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
            1. 서비스 소개
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            Vision Arena는 AI 비전 모델의 성능을 평가하고 비교할 수 있는 통합 벤치마크 플랫폼입니다. 
            본 서비스를 통해 다양한 양자화 및 압축 기술을 가진 모델들의 성능을 체계적으로 분석하고 비교할 수 있습니다.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
            2. 서비스 이용
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            본 서비스를 이용함으로써 다음 약관에 동의하는 것으로 간주됩니다:
          </p>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>서비스는 "있는 그대로" 제공되며, 명시적 또는 묵시적인 보증을 제공하지 않습니다.</li>
            <li style={{ marginBottom: '0.5rem' }}>서비스 이용 시 발생하는 모든 책임은 이용자에게 있습니다.</li>
            <li style={{ marginBottom: '0.5rem' }}>서비스 제공자는 서비스의 중단, 변경, 종료에 대한 책임을 지지 않습니다.</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
            3. Google AdSense
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            본 사이트는 Google AdSense를 통해 광고를 게재하고 있습니다. 
            Google AdSense는 사용자의 관심사에 맞는 광고를 제공하기 위해 쿠키를 사용할 수 있습니다.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            Google AdSense의 개인정보 처리방침은 다음 링크에서 확인할 수 있습니다:
          </p>
          <p style={{ marginBottom: '1rem' }}>
            <a 
              href="https://policies.google.com/privacy" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: '#3b82f6', textDecoration: 'underline' }}
            >
              Google 개인정보 처리방침
            </a>
          </p>
          <p style={{ marginBottom: '1rem' }}>
            Google AdSense의 이용약관은 다음 링크에서 확인할 수 있습니다:
          </p>
          <p style={{ marginBottom: '1rem' }}>
            <a 
              href="https://policies.google.com/terms" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: '#3b82f6', textDecoration: 'underline' }}
            >
              Google 서비스 약관
            </a>
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
            4. 지적재산권
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            본 서비스의 모든 콘텐츠, 디자인, 로고, 텍스트는 Vision Arena의 지적재산권에 속합니다. 
            무단 복제, 배포, 수정을 금지합니다.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
            5. 면책조항
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            서비스 제공자는 다음에 대해 책임을 지지 않습니다:
          </p>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>서비스 이용 중 발생한 손해</li>
            <li style={{ marginBottom: '0.5rem' }}>서비스의 중단, 지연, 오류</li>
            <li style={{ marginBottom: '0.5rem' }}>제3자의 불법적인 접근 또는 데이터 유출</li>
            <li style={{ marginBottom: '0.5rem' }}>광고 콘텐츠의 정확성 또는 적절성</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
            6. 약관 변경
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            서비스 제공자는 사전 고지 없이 본 약관을 변경할 수 있습니다. 
            변경된 약관은 본 페이지에 게시된 시점부터 효력을 발생합니다.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
            7. 문의
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            본 약관에 대한 문의사항이 있으시면 <a href="/contact" style={{ color: '#3b82f6', textDecoration: 'underline' }}>문의하기</a> 페이지를 통해 연락해 주세요.
          </p>
        </section>

        <div style={{ marginTop: '3rem', padding: '1.5rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
            <strong>참고:</strong> 본 약관은 Google AdSense의 고품질 사이트 가이드라인을 준수하여 작성되었습니다. 
            자세한 내용은 <a href="https://adsense-ko.googleblog.com/2012/09/2.html" target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'underline' }}>Google AdSense 블로그</a>를 참고하세요.
          </p>
        </div>
      </div>
    </div>
  );
}

