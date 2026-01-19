'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();

  const categories = [
    { name: 'Overview', path: '/leaderboard/' },
    { name: 'Text', path: '/leaderboard/text' },
    { name: 'WebDev', path: '/leaderboard/webdev' },
    { name: 'Vision', path: '/leaderboard/vision' },
    { name: 'Text-to-Image', path: '/leaderboard/text-to-image' },
    { name: 'Image Edit', path: '/leaderboard/image-edit' },
    { name: 'Search', path: '/leaderboard/search' },
    { name: 'Text-to-Video', path: '/leaderboard/text-to-video' },
    { name: 'Image-to-Video', path: '/leaderboard/image-to-video' },
  ];

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: '260px',
      right: 0,
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e5e7eb',
      padding: '0',
      zIndex: 1001,
      height: '40px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    }}>
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        maxWidth: '100%',
        margin: '0 auto',
        height: '40px',
        padding: '0 2rem',
      }}>
        {/* 카테고리 링크들 */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0',
          overflowX: 'auto',
          flex: 1,
          marginLeft: '1rem',
        }}>
          {categories.map((category) => {
            const isActive = pathname === category.path || 
              (category.path === '/leaderboard/' && pathname === '/leaderboard');
            
            return (
              <Link
                key={category.name}
                href={category.path}
                style={{
                  padding: '0.25rem 1rem',
                  textDecoration: 'none',
                  color: isActive ? '#3b82f6' : '#374151',
                  fontWeight: isActive ? '500' : '400',
                  fontSize: '0.9375rem',
                  whiteSpace: 'nowrap',
                  backgroundColor: isActive ? '#f3f4f6' : 'transparent',
                  borderRadius: isActive ? '0.375rem' : '0',
                  transition: 'all 0.15s ease-in-out',
                  display: 'inline-block',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#3b82f6';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#374151';
                  }
                }}
              >
                {category.name}
              </Link>
            );
          })}
      </div>
      </nav>
    </header>
  );
};

export default Header;
