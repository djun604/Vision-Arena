export const metadata = {
  title: 'Privacy Policy - Vision Arena',
  description: 'Vision Arena Privacy Policy and Data Protection',
};

export default function PrivacyPolicyPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 0' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem', color: '#111827' }}>
        개인정보 처리방침 (Privacy Policy)
      </h1>
      
      <div style={{ fontSize: '1rem', lineHeight: '1.8', color: '#374151' }}>
        <p style={{ marginBottom: '1rem', color: '#6b7280' }}>
          최종 업데이트: {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
            1. 개인정보의 처리 목적
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            Vision Arena는 다음의 목적을 위하여 개인정보를 처리합니다:
          </p>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>서비스 제공 및 운영</li>
            <li style={{ marginBottom: '0.5rem' }}>사용자 문의 및 지원</li>
            <li style={{ marginBottom: '0.5rem' }}>서비스 개선 및 통계 분석</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
            2. Google AdSense 및 쿠키
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            본 사이트는 Google AdSense를 통해 광고를 게재하고 있습니다. 
            Google AdSense는 사용자에게 맞춤형 광고를 제공하기 위해 쿠키를 사용합니다.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            <strong>Google AdSense가 사용하는 쿠키:</strong>
          </p>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>사용자의 관심사에 맞는 광고를 표시하기 위한 쿠키</li>
            <li style={{ marginBottom: '0.5rem' }}>광고 효과 측정을 위한 쿠키</li>
            <li style={{ marginBottom: '0.5rem' }}>중복 광고 방지를 위한 쿠키</li>
          </ul>
          <p style={{ marginBottom: '1rem' }}>
            Google의 개인정보 처리방침 및 쿠키 정책은 다음 링크에서 확인할 수 있습니다:
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
            3. 수집하는 개인정보 항목
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            본 서비스는 다음과 같은 정보를 수집할 수 있습니다:
          </p>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>자동 수집 정보: IP 주소, 쿠키, 방문 기록, 브라우저 정보</li>
            <li style={{ marginBottom: '0.5rem' }}>사용자 제공 정보: 문의 시 제공하는 이름, 이메일 주소</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
            4. 개인정보의 보유 및 이용 기간
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            수집된 개인정보는 서비스 제공 기간 동안 보유하며, 서비스 종료 시 즉시 파기합니다. 
            단, 관련 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관합니다.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
            5. 개인정보의 제3자 제공
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            본 서비스는 Google AdSense를 통해 광고를 게재하고 있으며, 
            Google은 사용자의 쿠키 정보를 활용하여 맞춤형 광고를 제공합니다.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            Google AdSense의 데이터 사용에 대한 자세한 내용은 
            <a 
              href="https://policies.google.com/technologies/partner-sites" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: '#3b82f6', textDecoration: 'underline' }}
            >
              Google 파트너 사이트 정책
            </a>을 참고하세요.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
            6. 개인정보 보호를 위한 조치
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            본 서비스는 개인정보 보호를 위해 다음과 같은 조치를 취하고 있습니다:
          </p>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>개인정보 처리 최소화 원칙 준수</li>
            <li style={{ marginBottom: '0.5rem' }}>안전한 데이터 전송을 위한 보안 조치</li>
            <li style={{ marginBottom: '0.5rem' }}>정기적인 보안 점검 및 업데이트</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
            7. 사용자의 권리
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            사용자는 다음의 권리를 행사할 수 있습니다:
          </p>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>개인정보 열람 요구</li>
            <li style={{ marginBottom: '0.5rem' }}>개인정보 정정·삭제 요구</li>
            <li style={{ marginBottom: '0.5rem' }}>개인정보 처리정지 요구</li>
            <li style={{ marginBottom: '0.5rem' }}>쿠키 설정 변경 (브라우저 설정에서 가능)</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
            8. 쿠키 관리
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            사용자는 브라우저 설정을 통해 쿠키 사용을 제어할 수 있습니다. 
            쿠키를 거부할 경우 일부 서비스 이용에 제한이 있을 수 있습니다.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            주요 브라우저의 쿠키 설정 방법:
          </p>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>Chrome: 설정 → 개인정보 및 보안 → 쿠키 및 기타 사이트 데이터</li>
            <li style={{ marginBottom: '0.5rem' }}>Firefox: 설정 → 개인정보 보호 → 쿠키 및 사이트 데이터</li>
            <li style={{ marginBottom: '0.5rem' }}>Safari: 환경설정 → 개인정보 보호 → 쿠키 및 웹 사이트 데이터</li>
            <li style={{ marginBottom: '0.5rem' }}>Edge: 설정 → 쿠키 및 사이트 권한 → 쿠키 및 사이트 데이터</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
            9. 개인정보 처리방침 변경
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            본 개인정보 처리방침은 관련 법령 및 정책 변경에 따라 변경될 수 있으며, 
            변경 사항은 본 페이지에 게시하여 공지합니다.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
            10. 문의
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            개인정보 처리방침에 대한 문의사항이 있으시면 <a href="/contact" style={{ color: '#3b82f6', textDecoration: 'underline' }}>문의하기</a> 페이지를 통해 연락해 주세요.
          </p>
        </section>

        <div style={{ marginTop: '3rem', padding: '1.5rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
            <strong>참고:</strong> 본 개인정보 처리방침은 Google AdSense의 고품질 사이트 가이드라인을 준수하여 작성되었습니다. 
            자세한 내용은 <a href="https://adsense-ko.googleblog.com/2012/09/2.html" target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'underline' }}>Google AdSense 블로그</a>를 참고하세요.
          </p>
        </div>
      </div>
    </div>
  );
}

