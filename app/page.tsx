'use client';

import { useState, useEffect, useRef } from 'react';

const MD = {
  ink: '#fff',
  inkSoft: 'rgba(255,255,255,0.78)',
  mute: 'rgba(255,255,255,0.55)',
  muteSoft: 'rgba(255,255,255,0.4)',
  hairline: 'rgba(255,255,255,0.12)',
  chipBg: 'rgba(255,255,255,0.08)',
  chipBd: '1px solid rgba(255,255,255,0.16)',
  warm: '#ffd6a8',
  cool: '#a8c8ff',
  green: '#7dffa1',
  ff: '"Geist","SF Pro Display","Inter",system-ui,sans-serif',
  serif: '"Instrument Serif","New York",Georgia,serif',
  mono: '"JetBrains Mono",ui-monospace,Menlo,monospace',
};

function MDGlass({ children, style, padded = true, interactive = false, isMobile = false }: any) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive || !ref.current || isMobile) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const gloss = isHovered && interactive && !isMobile
    ? `radial-gradient(600px 450px at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.12), transparent 70%)`
    : 'none';

  const isGrid = style?.display === 'grid';
  const contentStyle = isGrid ? { position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: style?.gridTemplateColumns, gap: style?.gap, alignItems: style?.alignItems } : { position: 'relative', zIndex: 1 };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: 'rgba(18,22,40,0.48)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: 20,
        boxShadow: isMobile
          ? 'inset 0 1px 0 rgba(255,255,255,0.12), 0 12px 32px rgba(0,0,0,0.4)'
          : isHovered && interactive
          ? 'inset 0 1px 0 rgba(255,255,255,0.2), 0 20px 60px rgba(0,0,0,0.4), 0 0 32px rgba(255,255,255,0.06)'
          : 'inset 0 1px 0 rgba(255,255,255,0.12), 0 12px 32px rgba(0,0,0,0.35)',
        color: MD.ink,
        padding: padded ? 24 : 0,
        transition: isMobile ? 'none' : 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative',
        overflow: 'hidden',
        ...(isGrid ? { padding: style?.padding } : {}),
        ...(!isGrid ? style : { display: style?.display }),
      }}
    >
      {interactive && !isMobile && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: gloss,
            pointerEvents: 'none',
            transition: 'background 0.2s ease-out',
          }}
        />
      )}
      <div style={contentStyle}>
        {children}
      </div>
    </div>
  );
}

function MDEnv({ children, style, scrollY = 0, isMobile = false }: any) {
  const scrollProgress = Math.min(scrollY / 800, 1);

  const bg = `
    radial-gradient(800px 500px at ${20 + scrollProgress * 5}% ${80 - scrollProgress * 15}%, rgba(${255 - scrollProgress * 50},${180 - scrollProgress * 80},${120 - scrollProgress * 70},${0.45 - scrollProgress * 0.15}) 0%, transparent 60%),
    radial-gradient(900px 600px at ${90 - scrollProgress * 10}% ${20 + scrollProgress * 10}%, rgba(${180 + scrollProgress * 40},${200 - scrollProgress * 80},${255 - scrollProgress * 100},${0.35 - scrollProgress * 0.15}) 0%, transparent 55%),
    radial-gradient(600px 400px at 70% 70%, rgba(255,140,140,0.25) 0%, transparent 55%),
    linear-gradient(180deg, #1d2a4c 0%, #3a4a7c 30%, #6a5a7c 55%, #8a6a5c 75%, #c89a7a 100%)
  `;

  const sunY = scrollY * (isMobile ? 0.08 : 0.12);
  const sunOpacity = Math.max(0.5, 1 - scrollY * 0.0006);

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        background: bg,
        color: MD.ink,
        fontFamily: MD.ff,
        overflow: 'hidden',
        position: 'relative',
        ...style,
      }}
    >
      <div
        style={{
          position: 'absolute',
          right: `calc(${isMobile ? 15 : 12}% - ${scrollY * 0.08}px)`,
          top: `calc(${isMobile ? 8 : 6}% + ${sunY}px)`,
          width: isMobile ? 100 : 140,
          height: isMobile ? 100 : 140,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(255,220,160,0.8), rgba(255,180,120,0) 70%)',
          filter: 'blur(8px)',
          pointerEvents: 'none',
          opacity: sunOpacity,
          transition: 'opacity 0.3s ease-out',
        }}
      />
      <svg
        viewBox="0 0 1180 780"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: Math.min(0.5, 0.42 + scrollY * 0.0002),
          pointerEvents: 'none',
          transform: `translateY(${scrollY * 0.25}px)`,
        }}
      >
        <path
          d="M0,460 L120,320 L240,420 L380,260 L520,380 L660,240 L800,360 L940,280 L1080,360 L1180,300 L1180,780 L0,780 Z"
          fill={`rgba(${10 + scrollProgress * 30},${16 + scrollProgress * 40},${32 + scrollProgress * 50},0.55)`}
        />
        <path
          d="M0,560 L160,460 L320,530 L500,420 L680,510 L860,440 L1060,510 L1180,470 L1180,780 L0,780 Z"
          fill={`rgba(${10 + scrollProgress * 25},${16 + scrollProgress * 35},${32 + scrollProgress * 40},0.45)`}
        />
        <path
          d="M0,660 L200,580 L420,630 L640,560 L880,620 L1080,580 L1180,610 L1180,780 L0,780 Z"
          fill={`rgba(${10 + scrollProgress * 20},${16 + scrollProgress * 30},${32 + scrollProgress * 30},0.38)`}
        />
      </svg>
      {children}
    </div>
  );
}

const MD_NAV = ['Work', 'Skills', 'Education', 'Achievements', 'Contact'];

const MD_SKILLS = [
  {
    group: 'Frontend',
    items: ['TypeScript', 'React', 'Next.js', 'Vue', 'Tailwind', 'Vite'],
  },
  {
    group: 'Backend',
    items: ['Node.js', 'tRPC', 'Python', 'FastAPI', 'REST/GraphQL'],
  },
  { group: 'Data', items: ['PostgreSQL', 'Redis', 'Prisma', 'SQL'] },
  { group: 'Infra', items: ['Docker', 'AWS', 'GitHub Actions', 'Vercel'] },
];

const MD_PROJECTS = [
  {
    n: '01',
    y: '2026',
    t: 'Project A',
    kind: 'Fullstack · case study',
    desc: 'A scheduling tool used internally; cut planning time in half.',
    stack: ['TS', 'Next', 'Postgres', 'tRPC'],
    grad: 'linear-gradient(135deg,#ff9ec7,#6b3eb5)',
  },
  {
    n: '02',
    y: '2025',
    t: 'Project B',
    kind: 'Frontend rewrite',
    desc: 'Replaced a legacy SPA with a typed, accessible Next app.',
    stack: ['React', 'Vite', 'Tailwind'],
    grad: 'linear-gradient(135deg,#a8c8ff,#5b8cff)',
  },
  {
    n: '03',
    y: '2025',
    t: 'Project C',
    kind: 'OSS library · 240★',
    desc: 'A tiny utility for safe URL parsing in TypeScript.',
    stack: ['Node', 'TS', 'Vitest'],
    grad: 'linear-gradient(135deg,#ffd6a8,#ff9a6b)',
  },
  {
    n: '04',
    y: '2024',
    t: 'Project D',
    kind: 'CLI tool',
    desc: 'Repo bootstrapper used by my team across new services.',
    stack: ['Go', 'Cobra'],
    grad: 'linear-gradient(135deg,#c8a8ff,#8a6bff)',
  },
  {
    n: '05',
    y: '2024',
    t: 'Project E',
    kind: 'Side-project',
    desc: 'A small reading-list app I still use every week.',
    stack: ['Python', 'FastAPI', 'SQLite'],
    grad: 'linear-gradient(135deg,#a8e0c8,#5ba88a)',
  },
];

const MD_EDUCATION = [
  {
    period: '2021 — 2025',
    school: 'VNU University of Engineering and Technology',
    degree: 'B.Sc. Computer Science',
    grade: 'GPA 3.6 / 4.0',
    notes: [
      'Final-year project: distributed task scheduler in Go (A grade)',
      'Coursework: Algorithms, OS, Compilers, Distributed Systems',
      'Member of CS Student Research Club',
    ],
  },
  {
    period: 'Summer 2024',
    school: 'Recurse-style internal program',
    degree: 'Self-directed engineering residency',
    grade: 'Cohort of 12',
    notes: [
      'Built and shipped 3 small tools to production',
      'Wrote weekly engineering notes; published 4 publicly',
    ],
  },
];

const MD_ACHIEVEMENTS = [
  { kind: 'Award', year: '2025', title: 'Top-3 · ICPC Hà Nội Regional', org: 'ACM ICPC' },
  { kind: 'Open source', year: '2025', title: 'safeurl · 240★ on GitHub', org: 'Personal · MIT' },
  { kind: 'Talk', year: '2025', title: 'Postgres patterns I keep reaching for', org: 'VietnamJS Meetup #18' },
  { kind: 'Cert', year: '2024', title: 'AWS Certified Cloud Practitioner', org: 'Amazon Web Services' },
  { kind: 'Scholarship', year: '2023', title: 'VNU Merit Scholarship', org: '2 semesters' },
  { kind: 'Writing', year: '2024', title: '7 essays · 12k+ reads', org: 'Personal blog' },
];

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const rafRef = useRef<number | null>(null);
  const scrollYRef = useRef(0);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(() => {
        setScrollY(scrollYRef.current);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  if (!mounted) return null;

  return (
    <MDEnv scrollY={scrollY} isMobile={isMobile}>
      <div
        style={{
          padding: isMobile ? '16px 16px 32px' : '24px 32px 40px',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? 12 : 14,
          maxWidth: 1180,
          margin: '0 auto',
        }}
      >
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', gap: isMobile ? 12 : 0 }}>
          <MDGlass
            padded={false}
            interactive={!isMobile}
            isMobile={isMobile}
            style={{
              borderRadius: 16,
              padding: isMobile ? '10px 12px' : '12px 16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 4,
            }}
          >
            <span style={{ fontFamily: MD.serif, fontSize: isMobile ? 14 : 18, letterSpacing: '-0.01em', fontWeight: 500 }}>
              Your Name
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: MD.green,
                  boxShadow: `0 0 10px ${MD.green}`,
                }}
              />
              <span
                style={{
                  fontFamily: MD.mono,
                  fontSize: isMobile ? 8 : 10,
                  letterSpacing: '.16em',
                  color: MD.mute,
                }}
              >
                OPEN · MAY '26
              </span>
            </div>
          </MDGlass>
          {!isMobile && (
            <MDGlass
              padded={false}
              interactive={!isMobile}
              isMobile={isMobile}
              style={{ borderRadius: 999, padding: 6, display: 'flex', gap: 2 }}
            >
              {MD_NAV.map((t, i) => (
                <span
                  key={t}
                  style={{
                    padding: '7px 14px',
                    borderRadius: 999,
                    fontSize: 12,
                    color: MD.ink,
                    background: i === 0 ? 'rgba(255,255,255,0.18)' : 'transparent',
                    fontWeight: i === 0 ? 500 : 400,
                  }}
                >
                  {t}
                </span>
              ))}
            </MDGlass>
          )}
        </div>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }
          @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
          }
          .avatar-glow {
            animation: float 6s ease-in-out infinite;
          }
        `}</style>

        <MDGlass interactive={!isMobile} isMobile={isMobile} style={{
          padding: isMobile ? '20px 16px' : '24px 28px',
          marginTop: isMobile ? 24 : 32,
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr auto',
          alignItems: 'center',
          gap: isMobile ? 16 : 24,
          position: 'relative',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: isMobile ? 'center' : 'flex-start',
            gap: isMobile ? 12 : 14,
            width: '100%',
          }}>
            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'center',
              gap: isMobile ? 14 : 16,
              width: '100%',
            }}>
              <div style={{
                width: isMobile ? 60 : 68,
                height: isMobile ? 60 : 68,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #667eea 100%)',
                backgroundSize: '200% 200%',
                flexShrink: 0,
                boxShadow:
                  'inset 0 2px 8px rgba(255,255,255,0.3), 0 16px 48px rgba(102,126,234,0.25), 0 0 24px rgba(240,147,251,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: MD.serif,
                fontSize: isMobile ? 28 : 32,
                fontWeight: 500,
                color: '#fff',
                position: 'relative',
                animation: 'float 6s ease-in-out infinite',
              }}>
                yn
              </div>

              <div style={{
                textAlign: isMobile ? 'center' : 'left',
                flex: 1,
              }}>
                <h1
                  style={{
                    fontFamily: MD.serif,
                    fontWeight: 400,
                    fontSize: isMobile ? 26 : 32,
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    margin: '0 0 3px',
                    color: MD.ink,
                  }}
                >
                  Your Name
                </h1>
                <p
                  style={{
                    fontFamily: MD.mono,
                    fontSize: isMobile ? 9 : 10,
                    letterSpacing: '.07em',
                    color: MD.cool,
                    margin: 0,
                    textTransform: 'uppercase',
                    fontWeight: 500,
                  }}
                >
                  Junior Software Engineer
                </p>
              </div>
            </div>

            <p
              style={{
                fontSize: isMobile ? 11 : 12,
                color: MD.inkSoft,
                margin: 0,
                lineHeight: 1.5,
                maxWidth: isMobile ? '100%' : '400px',
                textAlign: isMobile ? 'center' : 'left',
              }}
            >
              Two years building for the web, mostly fullstack TypeScript. Based in Hà Nội · UTC+7. Looking for a team that ships often and reads code together.
            </p>
          </div>

          <div style={{
            display: 'flex',
            gap: isMobile ? 8 : 10,
            flexDirection: 'column',
            width: isMobile ? '100%' : 'auto',
            flexShrink: 0,
          }}>
            <span
              style={{
                background: 'linear-gradient(135deg, #fff 0%, #f5f5f5 100%)',
                color: '#1a1a2e',
                padding: isMobile ? '9px 14px' : '8px 18px',
                borderRadius: 9,
                fontSize: isMobile ? 11 : 12,
                fontWeight: 500,
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 6px 16px rgba(255,255,255,0.12)',
                width: isMobile ? '100%' : '140px',
              }}
              onMouseEnter={(e: any) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(255,255,255,0.2)';
                }
              }}
              onMouseLeave={(e: any) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(255,255,255,0.12)';
                }
              }}
            >
              ↓ Résumé
            </span>
            <span
              style={{
                background: 'rgba(255,255,255,0.05)',
                color: MD.ink,
                padding: isMobile ? '9px 14px' : '8px 18px',
                borderRadius: 9,
                fontSize: isMobile ? 11 : 12,
                border: '1px solid rgba(255,255,255,0.14)',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                width: isMobile ? '100%' : '140px',
              }}
              onMouseEnter={(e: any) => {
                if (!isMobile) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.border = '1px solid rgba(255,255,255,0.22)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e: any) => {
                if (!isMobile) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.border = '1px solid rgba(255,255,255,0.14)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              ✉ Email
            </span>
          </div>
        </MDGlass>

        <MDGlass interactive={!isMobile} isMobile={isMobile} style={{ padding: isMobile ? '18px 16px' : '22px 26px' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              justifyContent: 'space-between',
              alignItems: isMobile ? 'flex-start' : 'baseline',
              paddingBottom: 14,
              borderBottom: `1px solid ${MD.hairline}`,
              gap: isMobile ? 8 : 0,
            }}
          >
            <div style={{ display: 'flex', gap: isMobile ? 8 : 14, alignItems: 'baseline' }}>
              <span
                style={{
                  fontFamily: MD.mono,
                  fontSize: isMobile ? 9 : 11,
                  letterSpacing: '.18em',
                  color: MD.mute,
                }}
              >
                § 01
              </span>
              <span style={{ fontFamily: MD.serif, fontSize: isMobile ? 18 : 26, letterSpacing: '-0.01em' }}>
                Skills &amp; stack
              </span>
            </div>
            <span style={{ fontFamily: MD.mono, fontSize: isMobile ? 9 : 11, color: MD.mute, whiteSpace: 'nowrap' }}>
              4 categories · 20+ tools
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: isMobile ? 14 : 20, paddingTop: 18 }}>
            {MD_SKILLS.map((s) => (
              <div key={s.group} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div
                  style={{
                    fontFamily: MD.serif,
                    fontSize: 22,
                    color: MD.ink,
                    lineHeight: 1,
                    fontStyle: 'italic',
                  }}
                >
                  {s.group}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {s.items.map((t) => (
                    <span
                      key={t}
                      style={{
                        background: MD.chipBg,
                        backdropFilter: 'blur(6px)',
                        border: MD.chipBd,
                        padding: '4px 10px',
                        borderRadius: 999,
                        fontSize: 11,
                        color: MD.ink,
                        fontFamily: MD.mono,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </MDGlass>

        <MDGlass interactive={!isMobile} isMobile={isMobile} style={{ padding: isMobile ? '18px 16px' : '22px 26px' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              justifyContent: 'space-between',
              alignItems: isMobile ? 'flex-start' : 'baseline',
              paddingBottom: 14,
              borderBottom: `1px solid ${MD.hairline}`,
              gap: isMobile ? 8 : 0,
            }}
          >
            <div style={{ display: 'flex', gap: isMobile ? 8 : 14, alignItems: 'baseline' }}>
              <span
                style={{
                  fontFamily: MD.mono,
                  fontSize: isMobile ? 9 : 11,
                  letterSpacing: '.18em',
                  color: MD.mute,
                }}
              >
                § 02
              </span>
              <span style={{ fontFamily: MD.serif, fontSize: isMobile ? 18 : 26, letterSpacing: '-0.01em' }}>
                Selected work
              </span>
            </div>
            <span style={{ fontFamily: MD.mono, fontSize: isMobile ? 9 : 11, color: MD.mute, whiteSpace: 'nowrap' }}>
              05 projects · 2024 — 2026
            </span>
          </div>
          {MD_PROJECTS.map((p, i) => (
            <div
              key={p.n}
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '88px 1fr 240px 32px',
                gap: isMobile ? 12 : 20,
                padding: isMobile ? '12px 0' : '18px 0',
                borderBottom: i < MD_PROJECTS.length - 1 ? `1px solid ${MD.hairline}` : 'none',
                alignItems: 'flex-start',
              }}
            >
              <div
                style={{
                  height: 72,
                  borderRadius: 12,
                  background: p.grad,
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    right: 8,
                    bottom: 4,
                    fontFamily: MD.serif,
                    fontSize: 30,
                    color: '#fff',
                    opacity: 0.9,
                    lineHeight: 1,
                  }}
                >
                  {p.n}
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
                  <span
                    style={{
                      fontFamily: MD.mono,
                      fontSize: 10,
                      letterSpacing: '.16em',
                      textTransform: 'uppercase',
                      color: MD.warm,
                    }}
                  >
                    {p.y}
                  </span>
                  <span
                    style={{
                      fontFamily: MD.mono,
                      fontSize: 10,
                      letterSpacing: '.16em',
                      textTransform: 'uppercase',
                      color: MD.mute,
                    }}
                  >
                    · {p.kind}
                  </span>
                </div>
                <div style={{ fontFamily: MD.serif, fontSize: 24, color: MD.ink, lineHeight: 1.1, marginTop: 3 }}>
                  {p.t}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: MD.inkSoft,
                    marginTop: 4,
                    lineHeight: 1.45,
                    maxWidth: 560,
                  }}
                >
                  {p.desc}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignSelf: 'center' }}>
                {p.stack.map((t) => (
                  <span
                    key={t}
                    style={{
                      background: MD.chipBg,
                      border: MD.chipBd,
                      padding: '3px 9px',
                      borderRadius: 999,
                      fontSize: 11,
                      color: MD.ink,
                      fontFamily: MD.mono,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.1)',
                  border: MD.chipBd,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 15,
                  color: MD.ink,
                  marginLeft: 'auto',
                }}
              >
                ↗
              </div>
            </div>
          ))}
        </MDGlass>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.1fr 1fr', gap: 14 }}>
          <MDGlass interactive={!isMobile} isMobile={isMobile} style={{ padding: isMobile ? '18px 16px' : '22px 26px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                paddingBottom: 14,
                borderBottom: `1px solid ${MD.hairline}`,
              }}
            >
              <div style={{ display: 'flex', gap: isMobile ? 8 : 14, alignItems: 'baseline' }}>
                <span
                  style={{
                    fontFamily: MD.mono,
                    fontSize: isMobile ? 9 : 11,
                    letterSpacing: '.18em',
                    color: MD.mute,
                  }}
                >
                  § 03
                </span>
                <span style={{ fontFamily: MD.serif, fontSize: isMobile ? 18 : 26, letterSpacing: '-0.01em' }}>
                  Education
                </span>
              </div>
            </div>
            {MD_EDUCATION.map((e, i) => (
              <div
                key={i}
                style={{
                  padding: '16px 0',
                  borderBottom: i < MD_EDUCATION.length - 1 ? `1px solid ${MD.hairline}` : 'none',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    gap: 14,
                  }}
                >
                  <span
                    style={{
                      fontFamily: MD.mono,
                      fontSize: 10,
                      letterSpacing: '.16em',
                      textTransform: 'uppercase',
                      color: MD.cool,
                    }}
                  >
                    {e.period}
                  </span>
                  <span style={{ fontFamily: MD.mono, fontSize: 10, color: MD.mute }}>
                    {e.grade}
                  </span>
                </div>
                <div style={{ fontFamily: MD.serif, fontSize: 22, marginTop: 4, lineHeight: 1.2 }}>
                  {e.degree}
                </div>
                <div style={{ fontSize: 12, color: MD.inkSoft, marginTop: 2, fontStyle: 'italic' }}>
                  {e.school}
                </div>
                <ul
                  style={{
                    margin: '10px 0 0',
                    padding: 0,
                    listStyle: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 5,
                  }}
                >
                  {e.notes.map((n) => (
                    <li
                      key={n}
                      style={{
                        fontSize: 12,
                        color: MD.inkSoft,
                        paddingLeft: 14,
                        position: 'relative',
                        lineHeight: 1.5,
                      }}
                    >
                      <span
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: 8,
                          width: 4,
                          height: 4,
                          borderRadius: '50%',
                          background: MD.warm,
                        }}
                      />
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </MDGlass>

          <MDGlass interactive={!isMobile} isMobile={isMobile} style={{ padding: isMobile ? '18px 16px' : '22px 26px' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'space-between',
                alignItems: isMobile ? 'flex-start' : 'baseline',
                paddingBottom: 14,
                borderBottom: `1px solid ${MD.hairline}`,
                gap: isMobile ? 8 : 0,
              }}
            >
              <div style={{ display: 'flex', gap: isMobile ? 8 : 14, alignItems: 'baseline' }}>
                <span
                  style={{
                    fontFamily: MD.mono,
                    fontSize: isMobile ? 9 : 11,
                    letterSpacing: '.18em',
                    color: MD.mute,
                  }}
                >
                  § 04
                </span>
                <span style={{ fontFamily: MD.serif, fontSize: isMobile ? 18 : 26, letterSpacing: '-0.01em' }}>
                  Achievements
                </span>
              </div>
              <span style={{ fontFamily: MD.mono, fontSize: isMobile ? 9 : 11, color: MD.mute, whiteSpace: 'nowrap' }}>06 highlights</span>
            </div>
            {MD_ACHIEVEMENTS.map((a, i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '72px 1fr 48px',
                  gap: isMobile ? 8 : 12,
                  padding: isMobile ? '10px 0' : '14px 0',
                  borderBottom: i < MD_ACHIEVEMENTS.length - 1 ? `1px solid ${MD.hairline}` : 'none',
                  alignItems: 'flex-start',
                }}
              >
                <span
                  style={{
                    background: MD.chipBg,
                    border: MD.chipBd,
                    padding: '3px 0',
                    borderRadius: 6,
                    fontSize: 10,
                    color: MD.cool,
                    fontFamily: MD.mono,
                    letterSpacing: '.1em',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                  }}
                >
                  {a.kind}
                </span>
                <div>
                  <div style={{ fontFamily: MD.serif, fontSize: 18, lineHeight: 1.2 }}>
                    {a.title}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: MD.mute,
                      marginTop: 2,
                      fontFamily: MD.mono,
                      letterSpacing: '.04em',
                    }}
                  >
                    {a.org}
                  </div>
                </div>
                <span style={{ fontFamily: MD.mono, fontSize: 11, color: MD.mute, textAlign: 'right' }}>
                  {a.year}
                </span>
              </div>
            ))}
          </MDGlass>
        </div>

        <MDGlass interactive={!isMobile} isMobile={isMobile} style={{ padding: isMobile ? '20px 16px' : '30px 32px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr', gap: isMobile ? 16 : 24, alignItems: 'center' }}>
          <div>
            <span style={{ fontFamily: MD.mono, fontSize: isMobile ? 9 : 11, letterSpacing: '.18em', color: MD.mute }}>
              § 05 — Reach
            </span>
            <div
              style={{
                fontFamily: MD.serif,
                fontSize: isMobile ? 32 : 56,
                lineHeight: 0.95,
                marginTop: 8,
                letterSpacing: '-0.02em',
              }}
            >
              Let's <span style={{ fontStyle: 'italic', color: MD.warm }}>talk</span>.
            </div>
            <div style={{ fontFamily: MD.serif, fontSize: isMobile ? 14 : 24, color: MD.inkSoft, marginTop: 6 }}>
              hello@yourname.dev
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              ['GitHub', 'github.com/yourname'],
              ['LinkedIn', 'linkedin.com/in/yourname'],
              ['Read.cv', 'read.cv/yourname'],
              ['Twitter / X', '@yourname'],
            ].map(([k, v]) => (
              <div
                key={k}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: isMobile ? '8px 12px' : '10px 14px',
                  borderRadius: 10,
                  background: 'rgba(255,255,255,0.06)',
                  border: MD.chipBd,
                  transition: 'all 0.3s ease-out',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e: any) => {
                  if (!isMobile) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
                    e.currentTarget.style.border = '1px solid rgba(255,255,255,0.24)';
                  }
                }}
                onMouseLeave={(e: any) => {
                  if (!isMobile) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.border = MD.chipBd;
                  }
                }}
              >
                <span
                  style={{
                    fontFamily: MD.mono,
                    fontSize: isMobile ? 8 : 10,
                    letterSpacing: '.16em',
                    color: MD.mute,
                    textTransform: 'uppercase',
                  }}
                >
                  {k}
                </span>
                <span style={{ fontSize: isMobile ? 11 : 13, color: MD.ink }}>{v} ↗</span>
              </div>
            ))}
          </div>
        </MDGlass>

        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            padding: isMobile ? '12px 0 0' : '18px 8px 0',
            fontFamily: MD.mono,
            fontSize: isMobile ? 8 : 10,
            letterSpacing: '.16em',
            color: MD.muteSoft,
            textTransform: 'uppercase',
            gap: isMobile ? 6 : 0,
            alignItems: isMobile ? 'flex-start' : 'center',
          }}
        >
          <span>Your Name · 2026 · Hà Nội</span>
          <span>Set in Instrument Serif &amp; Geist</span>
        </div>
      </div>
    </MDEnv>
  );
}
