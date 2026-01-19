export const metadata = {
  title: 'Cookies Policy - Vision Arena',
  description: 'Vision Arena Cookies Policy and Cookie Management',
};

export default function CookiesPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 0' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem', color: '#111827' }}>
        쿠키 정책 (Cookies Policy)
      </h1>
      
      <div style={{ fontSize: '1rem', lineHeight: '1.8', color: '#374151' }}>
        <p style={{ marginBottom: '1rem', color: '#6b7280' }}>
          최종 업데이트: {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
            1. 쿠키란 무엇인가요?
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            쿠키는 웹사이트가 사용자의 컴퓨터나 모바일 기기에 저장하는 작은 텍스트 파일입니다. 
            쿠키는 사용자가 웹사이트를 방문할 때 브라우저를 통해 저장되며, 
            이후 방문 시 웹사이트가 사용자의 선호도와 설정을 기억할 수 있도록 도와줍니다.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
            2. Google AdSense 쿠키
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            본 사이트는 Google AdSense를 통해 광고를 게재하고 있으며, 
            Google은 사용자에게 맞춤형 광고를 제공하기 위해 쿠키를 사용합니다.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            <strong>Google AdSense가 사용하는 주요 쿠키:</strong>
          </p>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <strong>광고 맞춤 설정 쿠키:</strong> 사용자의 관심사에 맞는 광고를 표시하기 위해 사용됩니다.
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <strong>광고 효과 측정 쿠키:</strong> 광고 클릭 및 전환을 추적하여 광고 효과를 측정합니다.
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <strong>중복 광고 방지 쿠키:</strong> 같은 광고가 반복적으로 표시되는 것을 방지합니다.
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <strong>빈도 제한 쿠키:</strong> 특정 광고의 노출 빈도를 제한합니다.
            </li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
            3. 쿠키의 종류
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            <strong>필수 쿠키:</strong> 웹사이트의 기본 기능을 제공하기 위해 필요한 쿠키입니다. 
            이러한 쿠키 없이는 서비스를 제공할 수 없습니다.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            <strong>성능 쿠키:</strong> 웹사이트의 성능을 분석하고 개선하기 위해 사용되는 쿠키입니다.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            <strong>기능 쿠키:</strong> 사용자의 선호도와 설정을 기억하여 더 나은 사용자 경험을 제공하는 쿠키입니다.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            <strong>타겟팅 쿠키:</strong> 사용자의 관심사에 맞는 광고를 제공하기 위해 사용되는 쿠키입니다. 
            Google AdSense가 사용하는 쿠키가 이에 해당합니다.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
            4. 쿠키 관리 방법
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            사용자는 브라우저 설정을 통해 쿠키 사용을 제어할 수 있습니다. 
            쿠키를 거부하거나 삭제할 수 있으나, 이 경우 일부 서비스 이용에 제한이 있을 수 있습니다.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            <strong>주요 브라우저의 쿠키 설정 방법:</strong>
          </p>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <strong>Google Chrome:</strong> 설정 → 개인정보 및 보안 → 쿠키 및 기타 사이트 데이터
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <strong>Mozilla Firefox:</strong> 설정 → 개인정보 보호 → 쿠키 및 사이트 데이터
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <strong>Safari:</strong> 환경설정 → 개인정보 보호 → 쿠키 및 웹 사이트 데이터
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <strong>Microsoft Edge:</strong> 설정 → 쿠키 및 사이트 권한 → 쿠키 및 사이트 데이터
            </li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
            5. Google AdSense 쿠키 옵트아웃
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            Google AdSense의 맞춤형 광고 쿠키를 비활성화하려면 다음 링크를 방문하세요:
          </p>
          <p style={{ marginBottom: '1rem' }}>
            <a 
              href="https://www.google.com/settings/ads" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: '#3b82f6', textDecoration: 'underline' }}
            >
              Google 광고 설정
            </a>
          </p>
          <p style={{ marginBottom: '1rem' }}>
            또는 다음 링크에서 Google의 개인정보 처리방침 및 쿠키 정책을 확인할 수 있습니다:
          </p>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <a 
                href="https://policies.google.com/privacy" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#3b82f6', textDecoration: 'underline' }}
              >
                Google 개인정보 처리방침
              </a>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <a 
                href="https://policies.google.com/technologies/cookies" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#3b82f6', textDecoration: 'underline' }}
              >
                Google 쿠키 정책
              </a>
            </li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
            6. 쿠키 사용의 영향
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            쿠키를 비활성화하면 다음과 같은 영향이 있을 수 있습니다:
          </p>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>맞춤형 광고 대신 일반 광고가 표시될 수 있습니다.</li>
            <li style={{ marginBottom: '0.5rem' }}>일부 서비스 기능이 제한될 수 있습니다.</li>
            <li style={{ marginBottom: '0.5rem' }}>사용자 설정이 저장되지 않을 수 있습니다.</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
            7. 쿠키 정책 변경
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            본 쿠키 정책은 관련 법령 및 정책 변경에 따라 수정될 수 있으며, 
            변경 사항은 본 페이지에 게시하여 공지합니다.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
            8. 문의
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            쿠키 정책에 대한 문의사항이 있으시면 <a href="/contact" style={{ color: '#3b82f6', textDecoration: 'underline' }}>문의하기</a> 페이지를 통해 연락해 주세요.
          </p>
        </section>

        <div style={{ marginTop: '3rem', padding: '1.5rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
            <strong>참고:</strong> 본 쿠키 정책은 Google AdSense의 고품질 사이트 가이드라인을 준수하여 작성되었습니다. 
            자세한 내용은 <a href="https://adsense-ko.googleblog.com/2012/09/2.html" target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'underline' }}>Google AdSense 블로그</a>를 참고하세요.
          </p>
        </div>
      </div>
    </div>
  );
}

