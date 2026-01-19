'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside style={{
      position: 'fixed',
      left: 0,
      top: 0,
      width: '260px',
      height: '100vh',
      backgroundColor: '#ffffff',
      borderRight: '1px solid #e5e7eb',
      display: 'flex',
      flexDirection: 'column',
      padding: '0',
      zIndex: 1002,
      overflowY: 'auto',
    }}>
      {/* 로고 영역 */}
      <div style={{ 
        height: '56px',
        padding: '0 1.5rem', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.75rem',
      }}>
        <Image
          src="/logo.png"
          alt="Logo"
          width={34}
          height={28}
          style={{ flexShrink: 0 }}
        />
        <span style={{
          fontSize: '1.5rem',
          fontWeight: '500',
          color: '#111827',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          lineHeight: '1',
          display: 'flex',
          alignItems: 'center',
          letterSpacing: '-0.02em',
        }}>
          Vision Arena
        </span>
      </div>

      {/* 메인 네비게이션 */}
      <nav style={{ flex: 1, padding: '0 0.75rem' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li style={{ marginBottom: '0.25rem' }}>
            <Link
              href="/leaderboard"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                color: pathname?.startsWith('/leaderboard') ? '#3b82f6' : '#374151',
                backgroundColor: pathname?.startsWith('/leaderboard') ? '#e0f2fe' : 'transparent',
                fontSize: '0.9375rem',
                fontWeight: pathname?.startsWith('/leaderboard') ? '500' : '400',
                transition: 'all 0.15s ease-in-out',
              }}
              onMouseEnter={(e) => {
                if (!pathname?.startsWith('/leaderboard')) {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                  e.currentTarget.style.color = '#1f2937';
                }
              }}
              onMouseLeave={(e) => {
                if (!pathname?.startsWith('/leaderboard')) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#374151';
                }
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                <path d="M4 22h16"></path>
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
              </svg>
              <span>Leaderboard</span>
              {pathname?.startsWith('/leaderboard') && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: 'auto' }}>
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              )}
            </Link>
          </li>
                <li style={{ marginBottom: '0.25rem' }}>
                  <Link
                    href="/model"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      textDecoration: 'none',
                      color: pathname?.startsWith('/model') ? '#3b82f6' : '#374151',
                      backgroundColor: pathname?.startsWith('/model') ? '#e0f2fe' : 'transparent',
                      fontSize: '0.9375rem',
                      fontWeight: pathname?.startsWith('/model') ? '500' : '400',
                      transition: 'all 0.15s ease-in-out',
                    }}
                    onMouseEnter={(e) => {
                      if (!pathname?.startsWith('/model')) {
                        e.currentTarget.style.backgroundColor = '#f3f4f6';
                        e.currentTarget.style.color = '#1f2937';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!pathname?.startsWith('/model')) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#374151';
                      }
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="9" y1="3" x2="9" y2="21"></line>
                      <line x1="15" y1="3" x2="15" y2="21"></line>
                      <line x1="3" y1="9" x2="21" y2="9"></line>
                      <line x1="3" y1="15" x2="21" y2="15"></line>
                    </svg>
                    <span>Model</span>
                    {pathname?.startsWith('/model') && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: 'auto' }}>
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    )}
                  </Link>
                </li>
                <li style={{ marginBottom: '0.25rem' }}>
                  <Link
                    href="/run-evaluate"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      textDecoration: 'none',
                      color: pathname?.startsWith('/run-evaluate') ? '#3b82f6' : '#374151',
                      backgroundColor: pathname?.startsWith('/run-evaluate') ? '#e0f2fe' : 'transparent',
                      fontSize: '0.9375rem',
                      fontWeight: pathname?.startsWith('/run-evaluate') ? '500' : '400',
                      transition: 'all 0.15s ease-in-out',
                    }}
                    onMouseEnter={(e) => {
                      if (!pathname?.startsWith('/run-evaluate')) {
                        e.currentTarget.style.backgroundColor = '#f3f4f6';
                        e.currentTarget.style.color = '#1f2937';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!pathname?.startsWith('/run-evaluate')) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#374151';
                      }
                    }}
                  >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                    <path d="M2 17l10 5 10-5"></path>
                    <path d="M2 12l10 5 10-5"></path>
                  </svg>
                    <span>Run / Evaluate</span>
                    {pathname?.startsWith('/run-evaluate') && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: 'auto' }}>
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    )}
                  </Link>
                </li>
          <li style={{ marginBottom: '0.25rem' }}>
            <Link
              href="/guide"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                color: pathname?.startsWith('/guide') ? '#3b82f6' : '#374151',
                backgroundColor: pathname?.startsWith('/guide') ? '#e0f2fe' : 'transparent',
                fontSize: '0.9375rem',
                fontWeight: pathname?.startsWith('/guide') ? '500' : '400',
                transition: 'all 0.15s ease-in-out',
              }}
              onMouseEnter={(e) => {
                if (!pathname?.startsWith('/guide')) {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                  e.currentTarget.style.color = '#1f2937';
                }
              }}
              onMouseLeave={(e) => {
                if (!pathname?.startsWith('/guide')) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#374151';
                }
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
              <span>Guide</span>
              {pathname?.startsWith('/guide') && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: 'auto' }}>
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              )}
            </Link>
          </li>
          <li style={{ marginTop: '1rem', marginBottom: '0.25rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
            <Link
              href="/admin"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                color: pathname?.startsWith('/admin') ? '#3b82f6' : '#374151',
                backgroundColor: pathname?.startsWith('/admin') ? '#e0f2fe' : 'transparent',
                fontSize: '0.9375rem',
                fontWeight: pathname?.startsWith('/admin') ? '500' : '400',
                transition: 'all 0.15s ease-in-out',
              }}
              onMouseEnter={(e) => {
                if (!pathname?.startsWith('/admin')) {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                  e.currentTarget.style.color = '#1f2937';
                }
              }}
              onMouseLeave={(e) => {
                if (!pathname?.startsWith('/admin')) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#374151';
                }
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <span>Admin</span>
              {pathname?.startsWith('/admin') && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: 'auto' }}>
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              )}
            </Link>
          </li>
        </ul>
      </nav>

      {/* 하단 링크 */}
      <div style={{ padding: '1rem 0.75rem', borderTop: '1px solid #e5e7eb' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li style={{ marginBottom: '0.5rem' }}>
            <Link
              href="/terms-of-use"
              style={{
                display: 'block',
                padding: '0.5rem 0.75rem',
                textDecoration: 'none',
                color: '#6b7280',
                fontSize: '0.8125rem',
                fontWeight: '400',
                transition: 'color 0.15s ease-in-out',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#374151'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
            >
              Terms of Use
            </Link>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <Link
              href="/privacy-policy"
              style={{
                display: 'block',
                padding: '0.5rem 0.75rem',
                textDecoration: 'none',
                color: '#6b7280',
                fontSize: '0.8125rem',
                fontWeight: '400',
                transition: 'color 0.15s ease-in-out',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#374151'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
            >
              Privacy Policy
            </Link>
          </li>
          <li>
            <button
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '0.5rem 0.75rem',
                background: 'none',
                border: 'none',
                color: '#6b7280',
                fontSize: '0.8125rem',
                fontWeight: '400',
                cursor: 'pointer',
                transition: 'color 0.15s ease-in-out',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#374151'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
            >
              Cookies
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
