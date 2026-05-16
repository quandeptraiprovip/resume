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

function MDGlass({ children, style, padded = true }: any) {
  return (
    <div
      style={{
        background: 'rgba(18,22,40,0.42)',
        backdropFilter: 'blur(28px) saturate(180%)',
        WebkitBackdropFilter: 'blur(28px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.16)',
        borderRadius: 24,
        boxShadow:
          'inset 0 1px 0 rgba(255,255,255,0.16), 0 24px 60px -24px rgba(0,0,0,0.55)',
        color: MD.ink,
        padding: padded ? 24 : 0,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function MDEnv({ children, style, scrollY, isMobile }: any) {
  const scrollProgress = Math.min(scrollY / 800, 1);

  const bg = `
    radial-gradient(800px 500px at ${20 + scrollProgress * 5}% ${80 - scrollProgress * 15}%, rgba(${255 - scrollProgress * 50},${180 - scrollProgress * 80},${120 - scrollProgress * 70},${0.45 - scrollProgress * 0.15}) 0%, transparent 60%),
    radial-gradient(900px 600px at ${90 - scrollProgress * 10}% ${20 + scrollProgress * 10}%, rgba(${180 + scrollProgress * 40},${200 - scrollProgress * 80},${255 - scrollProgress * 100},${0.35 - scrollProgress * 0.15}) 0%, transparent 55%),
    radial-gradient(600px 400px at 70% 70%, rgba(255,140,140,0.25) 0%, transparent 55%),
    linear-gradient(180deg, #1d2a4c 0%, #3a4a7c 30%, #6a5a7c 55%, #8a6a5c 75%, #c89a7a 100%)
  `;

  const isMobileDevice = isMobile || typeof window !== 'undefined' && window.innerWidth < 768;

  const sunMultiplier = isMobileDevice ? 0.4 : 0.3;
  const parallaxMultiplier = isMobileDevice ? 1.2 : 1;

  const sunY = Math.min(scrollY * sunMultiplier, isMobileDevice ? 150 : 120);
  const sunOpacity = Math.max(0.5, 1 - scrollY * 0.0008);
  const glowOpacity = Math.max(0.35, 0.85 - scrollY * 0.0006);

  const sunSize = isMobileDevice ? 140 : 180;
  const sunInnerSize = isMobileDevice ? 90 : 120;

  const mountain1Translate = scrollY * 0.25 * parallaxMultiplier;
  const mountain2Translate = scrollY * 0.35 * parallaxMultiplier;
  const mountain3Translate = scrollY * 0.45 * parallaxMultiplier;

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
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {/* Floating Fire-like Light Sparks - OPTIMIZED */}
        {[...Array(isMobileDevice ? 8 : 12)].map((_, i) => {
          const baseSize = isMobileDevice ? 10 : 8;
          const orbSize = baseSize + Math.sin(scrollY / 80 + i) * 2;

          // Scroll-based flickering
          const flickerIntensity = 0.35 + Math.sin(scrollY / 100 + i * 0.7) * 0.3;
          const scrollReactOpacity = isMobileDevice
            ? 0.8 + (scrollProgress * 0.2) + flickerIntensity * 0.1
            : 0.7 + (scrollProgress * 0.25) + flickerIntensity;

          const scrollYOffset = scrollY * (isMobileDevice ? 0.06 : 0.1 + i * 0.02);

          let r, g, b;
          if (i % 4 === 0) {
            r = 255;
            g = Math.floor(140 + scrollProgress * 80);
            b = Math.floor(50 + scrollProgress * 60);
          } else if (i % 4 === 1) {
            r = 255;
            g = Math.floor(100 + scrollProgress * 60);
            b = Math.floor(80 + scrollProgress * 100);
          } else if (i % 4 === 2) {
            r = Math.floor(150 + scrollProgress * 50);
            g = Math.floor(200 + scrollProgress * 40);
            b = 255;
          } else {
            r = Math.floor(255 - scrollProgress * 20);
            g = Math.floor(255 - scrollProgress * 20);
            b = Math.floor(240 - scrollProgress * 20);
          }

          const animDuration = 4 + (i % 3) * 1.5;
          const delay = i * 0.15;
          const topPosition = isMobileDevice ? 140 + i * 55 : 120 + i * 60;

          return (
            <div
              key={`spark-${i}`}
              style={{
                position: 'absolute',
                left: `${5 + (i % (isMobileDevice ? 4 : 6)) * (isMobileDevice ? 20 : 15)}%`,
                top: `${topPosition + scrollYOffset + Math.sin(scrollY / 200 + i) * 30}px`,
                width: orbSize,
                height: orbSize,
                borderRadius: '50%',
                background: `radial-gradient(circle, rgba(${r},${g},${b},${scrollReactOpacity}), transparent 60%)`,
                filter: `blur(${isMobileDevice ? 8 : 8}px)`,
                boxShadow: `0 0 ${orbSize * 5 + flickerIntensity * 10}px rgba(${r},${g},${b},${scrollReactOpacity * 0.85}),
                           0 0 ${orbSize * 10 + flickerIntensity * 15}px rgba(${r},${g},${b},${scrollReactOpacity * 0.5})`,
                opacity: Math.max(isMobileDevice ? 0.75 : 0.6, scrollReactOpacity),
                pointerEvents: 'none',
                willChange: 'transform',
                animation: `spark-float-${i % 3} ${animDuration}s ease-in-out infinite`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}

        {/* Fire Trail Particles - OPTIMIZED */}
        {[...Array(isMobileDevice ? 6 : 8)].map((_, i) => {
          const fireFlicker = Math.sin(scrollY / 120 + i * 0.5) * 0.3;
          const scrollYOffset = scrollY * (isMobileDevice ? 0.05 : 0.08 + i * 0.015);
          const trailOpacity = 0.65 + fireFlicker * 0.15 + scrollProgress * 0.15;
          const trailSize = isMobileDevice ? 7 : 7;

          const trailR = Math.floor(255);
          const trailG = Math.floor(120 + scrollProgress * 100);
          const trailB = Math.floor(40 + scrollProgress * 80);

          const trailTop = isMobileDevice ? 250 + i * 65 : 200 + i * 40;

          return (
            <div
              key={`trail-${i}`}
              style={{
                position: 'absolute',
                left: `${8 + i * (isMobileDevice ? 18 : 14)}%`,
                top: `${trailTop + scrollYOffset + Math.sin(scrollY / 250 + i) * 35}px`,
                width: trailSize,
                height: trailSize,
                borderRadius: '50%',
                background: `radial-gradient(circle, rgba(${trailR},${trailG},${trailB},${trailOpacity}), transparent 50%)`,
                filter: `blur(${isMobileDevice ? 6 : 5}px)`,
                boxShadow: `0 0 ${trailSize * 5 + fireFlicker * 8}px rgba(${trailR},${trailG},${trailB},${trailOpacity * 0.9}),
                           0 0 ${trailSize * 10 + fireFlicker * 12}px rgba(${trailR},${trailG},${trailB},${trailOpacity * 0.5})`,
                opacity: Math.max(0.6, trailOpacity),
                pointerEvents: 'none',
                willChange: 'transform',
                animation: `spark-float-${i % 2} ${3.5 + i * 0.5}s ease-in-out infinite`,
              }}
            />
          );
        })}

        {/* Extra Bright Spark Accents - OPTIMIZED */}
        {[...Array(isMobileDevice ? 5 : 6)].map((_, i) => {
          const sparkFlicker = Math.sin(scrollY / 100 + i) * 0.35;
          const scrollYOffset = scrollY * (isMobileDevice ? 0.08 : 0.12 + i * 0.025);
          const sparkOpacity = 0.75 + sparkFlicker * 0.15 + scrollProgress * 0.15;
          const sparkSize = isMobileDevice ? 7 : 6;

          const sparkR = 255;
          const sparkG = Math.floor(160 + scrollProgress * 90);
          const sparkB = Math.floor(60 + scrollProgress * 100);

          const accentTop = isMobileDevice ? 340 + i * 70 : 300 + i * 60;

          return (
            <div
              key={`accent-${i}`}
              style={{
                position: 'absolute',
                left: `${15 + i * (isMobileDevice ? 18 : 12)}%`,
                top: `${accentTop + scrollYOffset}px`,
                width: sparkSize,
                height: sparkSize,
                borderRadius: '50%',
                background: `radial-gradient(circle, rgba(${sparkR},${sparkG},${sparkB},${sparkOpacity}), transparent 40%)`,
                filter: `blur(${isMobileDevice ? 5 : 4}px)`,
                boxShadow: `0 0 ${sparkSize * 6 + sparkFlicker * 12}px rgba(${sparkR},${sparkG},${sparkB},${sparkOpacity * 0.9}),
                           0 0 ${sparkSize * 12 + sparkFlicker * 18}px rgba(${sparkR},${sparkG},${sparkB},${sparkOpacity * 0.5})`,
                opacity: Math.max(0.65, sparkOpacity),
                pointerEvents: 'none',
                willChange: 'transform',
                animation: `spark-twinkle-${i % 2} ${2 + i * 0.3}s ease-in-out infinite`,
              }}
            />
          );
        })}

        <style>{`
          /* Fire Spark Float Animations - Upward with subtle drift */
          @keyframes spark-float-0 {
            0% { transform: translateY(0px) translateX(0px); }
            50% { transform: translateY(-60px) translateX(25px); }
            100% { transform: translateY(0px) translateX(0px); }
          }

          @keyframes spark-float-1 {
            0% { transform: translateY(0px) translateX(0px); }
            50% { transform: translateY(-50px) translateX(-30px); }
            100% { transform: translateY(0px) translateX(0px); }
          }

          @keyframes spark-float-2 {
            0% { transform: translateY(0px) translateX(0px); }
            50% { transform: translateY(-70px) translateX(15px); }
            100% { transform: translateY(0px) translateX(0px); }
          }

          /* Twinkling effect for accent sparks */
          @keyframes spark-twinkle-0 {
            0%, 100% { transform: scale(1) translateY(-20px); }
            25% { transform: scale(1.2) translateY(-40px); }
            50% { transform: scale(0.8) translateY(-60px); }
            75% { transform: scale(1.1) translateY(-30px); }
          }

          @keyframes spark-twinkle-1 {
            0%, 100% { transform: scale(0.9) translateY(-10px); }
            25% { transform: scale(1.1) translateY(-50px); }
            50% { transform: scale(0.9) translateY(-70px); }
            75% { transform: scale(1.15) translateY(-35px); }
          }
        `}</style>

        <div
          style={{
            position: 'absolute',
            right: `calc(${isMobileDevice ? 15 : 12}% - ${scrollY * 0.15}px)`,
            top: `calc(${isMobileDevice ? 8 : 6}% + ${sunY}px)`,
            width: sunSize,
            height: sunSize,
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(${255 - scrollProgress * 40},${220 - scrollProgress * 50},${160 - scrollProgress * 40},${glowOpacity}), rgba(${255 - scrollProgress * 50},${180 - scrollProgress * 80},120,0) 70%)`,
            filter: `blur(${isMobileDevice ? 10 : 12}px)`,
            opacity: sunOpacity,
            boxShadow: `0 0 ${isMobileDevice ? 60 : 80}px rgba(${255 - scrollProgress * 40},${200 - scrollProgress * 60},120,${glowOpacity * 0.6})`,
            transition: 'all 0.1s ease-out',
          }}
        />

        <div
          style={{
            position: 'absolute',
            right: `calc(${isMobileDevice ? 12 : 10}% - ${scrollY * 0.12}px)`,
            top: `calc(${isMobileDevice ? 10 : 8}% + ${sunY * 0.8}px)`,
            width: sunInnerSize,
            height: sunInnerSize,
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(255,${240 - scrollProgress * 40},${200 - scrollProgress * 30},${Math.min(glowOpacity * 0.4, 0.3)}), transparent 60%)`,
            filter: 'blur(20px)',
            opacity: sunOpacity * 0.5,
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
            transform: `translateY(${mountain1Translate}px)`,
            filter: `drop-shadow(0 0 ${scrollProgress * 30}px rgba(255,${200 - scrollProgress * 100},120,${scrollProgress * 0.4}))`,
          }}
        >
          <path
            d="M0,460 L120,320 L240,420 L380,260 L520,380 L660,240 L800,360 L940,280 L1080,360 L1180,300 L1180,780 L0,780 Z"
            fill={`rgba(${10 + scrollProgress * 30},${16 + scrollProgress * 40},${32 + scrollProgress * 50},0.55)`}
          />
        </svg>

        <svg
          viewBox="0 0 1180 780"
          preserveAspectRatio="none"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: Math.min(0.5, 0.45 + scrollY * 0.0002),
            pointerEvents: 'none',
            transform: `translateY(${mountain2Translate}px)`,
            filter: `drop-shadow(0 0 ${scrollProgress * 25}px rgba(255,${200 - scrollProgress * 80},140,${scrollProgress * 0.3}))`,
          }}
        >
          <path
            d="M0,560 L160,460 L320,530 L500,420 L680,510 L860,440 L1060,510 L1180,470 L1180,780 L0,780 Z"
            fill={`rgba(${10 + scrollProgress * 25},${16 + scrollProgress * 35},${32 + scrollProgress * 40},0.45)`}
          />
        </svg>

        <svg
          viewBox="0 0 1180 780"
          preserveAspectRatio="none"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: Math.min(0.6, 0.38 + scrollY * 0.0003),
            pointerEvents: 'none',
            transform: `translateY(${mountain3Translate}px)`,
            filter: `drop-shadow(0 0 ${scrollProgress * 20}px rgba(255,${200 - scrollProgress * 70},160,${scrollProgress * 0.25}))`,
          }}
        >
          <path
            d="M0,660 L200,580 L420,630 L640,560 L880,620 L1080,580 L1180,610 L1180,780 L0,780 Z"
            fill={`rgba(${10 + scrollProgress * 20},${16 + scrollProgress * 30},${32 + scrollProgress * 30},0.38)`}
          />
        </svg>

        {[...Array(isMobileDevice ? 6 : 12)].map((_, i) => {
          const randomLeft = (i * 8.33 + Math.random() * 3) % 100;
          const randomTop = Math.random() * 50;
          const randomSize = 1.5 + Math.random() * 2.5;
          const glowIntensity = 0.3 + Math.random() * 0.6;
          return (
            <div
              key={`star-${i}`}
              style={{
                position: 'absolute',
                width: randomSize,
                height: randomSize,
                borderRadius: '50%',
                background: `rgba(${255 - scrollProgress * 100},${255 - scrollProgress * 80},${220 - scrollProgress * 40},${glowIntensity})`,
                left: `${randomLeft}%`,
                top: `${randomTop}%`,
                opacity: Math.max(0.05, (1 - scrollY * 0.006) * (0.8 + Math.sin(scrollY / 100 + i) * 0.2)),
                boxShadow: `0 0 ${6 + Math.random() * 10}px rgba(${255 - scrollProgress * 100},${255 - scrollProgress * 80},${220 - scrollProgress * 40},${glowIntensity * 0.8})`,
                transition: 'opacity 0.2s ease-out',
                filter: `blur(${0.3 + scrollProgress * 0.3}px)`,
              }}
            />
          );
        })}
      </div>

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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  const padding = isMobile ? 14 : 32;
  const gap = isMobile ? 10 : 14;
  const skillsCols = isMobile ? 2 : 4;
  const heading1Size = isMobile ? 28 : 44;
  const heading2Size = isMobile ? 20 : 26;
  const heading3Size = isMobile ? 18 : 22;

  return (
    <MDEnv scrollY={scrollY} isMobile={isMobile}>
      <div
        ref={containerRef}
        style={{
          padding: `${padding}px`,
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: gap,
          maxWidth: 1180,
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        {/* nav bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: isMobile ? 8 : 0 }}>
          <MDGlass
            padded={false}
            style={{
              borderRadius: 999,
              padding: isMobile ? '6px 12px' : '8px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: MD.green,
                boxShadow: `0 0 10px ${MD.green}`,
              }}
            />
            <span style={{ fontFamily: MD.serif, fontSize: isMobile ? 13 : 17, letterSpacing: '-0.01em' }}>
              Your Name
            </span>
          </MDGlass>
          <MDGlass
            padded={false}
            style={{ borderRadius: 999, padding: isMobile ? 4 : 6, display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}
          >
            {MD_NAV.map((t, i) => (
              <span
                key={t}
                style={{
                  padding: isMobile ? '5px 8px' : '7px 14px',
                  borderRadius: 999,
                  fontSize: isMobile ? 9 : 12,
                  color: MD.ink,
                  background: i === 0 ? 'rgba(255,255,255,0.18)' : 'transparent',
                  fontWeight: i === 0 ? 500 : 400,
                }}
              >
                {t}
              </span>
            ))}
          </MDGlass>
        </div>

        {/* identity capsule */}
        <MDGlass style={{ padding: isMobile ? '16px 16px' : '22px 26px', display: 'flex', alignItems: 'center', gap: isMobile ? 14 : 22, marginTop: isMobile ? 40 : 80, flexDirection: isMobile ? 'column' : 'row', textAlign: isMobile ? 'center' : 'left' }}>
          <div
            style={{
              width: isMobile ? 62 : 72,
              height: isMobile ? 62 : 72,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #5b8cff, #ff9ec7)',
              flexShrink: 0,
              boxShadow:
                'inset 0 2px 0 rgba(255,255,255,0.4), 0 6px 20px rgba(0,0,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: MD.serif,
              fontSize: isMobile ? 24 : 30,
              color: '#fff',
            }}
          >
            yn
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: isMobile ? 10 : 14, flexWrap: 'wrap', justifyContent: isMobile ? 'center' : 'flex-start' }}>
              <h1
                style={{
                  fontFamily: MD.serif,
                  fontWeight: 400,
                  fontSize: heading1Size,
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  margin: 0,
                }}
              >
                Your Name
              </h1>
              <span style={{ fontSize: isMobile ? 12 : 14, color: MD.inkSoft }}>— Junior Software Engineer</span>
            </div>
            <p
              style={{
                fontSize: isMobile ? 12 : 14,
                color: MD.inkSoft,
                margin: '6px 0 0',
                lineHeight: 1.5,
                maxWidth: 680,
              }}
            >
              Two years building for the web, mostly fullstack TypeScript. Based in Hà Nội · UTC+7.
              Looking for a team that ships often and reads code together.
            </p>
          </div>
          {!isMobile && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 }}>
              <span
                style={{
                  background: '#fff',
                  color: '#1a1a2e',
                  padding: '10px 18px',
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 500,
                  textAlign: 'center',
                }}
              >
                ↓ Résumé.pdf
              </span>
              <span
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  padding: '10px 18px',
                  borderRadius: 999,
                  fontSize: 13,
                  color: MD.ink,
                  border: '1px solid rgba(255,255,255,0.2)',
                  textAlign: 'center',
                }}
              >
                ✉ hello@yourname.dev
              </span>
            </div>
          )}
          {isMobile && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
              <span
                style={{
                  background: '#fff',
                  color: '#1a1a2e',
                  padding: '10px 14px',
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 500,
                  textAlign: 'center',
                }}
              >
                ↓ Résumé.pdf
              </span>
              <span
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  padding: '10px 14px',
                  borderRadius: 999,
                  fontSize: 12,
                  color: MD.ink,
                  border: '1px solid rgba(255,255,255,0.2)',
                  textAlign: 'center',
                }}
              >
                ✉ hello@yourname.dev
              </span>
            </div>
          )}
        </MDGlass>

        {/* SKILLS */}
        <MDGlass style={{ padding: isMobile ? '16px' : '22px 26px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              paddingBottom: 14,
              borderBottom: `1px solid ${MD.hairline}`,
              flexWrap: 'wrap',
              gap: 10,
            }}
          >
            <div style={{ display: 'flex', gap: 10, alignItems: 'baseline', flexWrap: 'wrap' }}>
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
              <span style={{ fontFamily: MD.serif, fontSize: heading2Size, letterSpacing: '-0.01em' }}>
                Skills &amp; stack
              </span>
            </div>
            {!isMobile && (
              <span style={{ fontFamily: MD.mono, fontSize: 11, color: MD.mute }}>
                4 categories · 20+ tools
              </span>
            )}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${skillsCols},1fr)`, gap: isMobile ? 14 : 20, paddingTop: 14 }}>
            {MD_SKILLS.map((s) => (
              <div key={s.group} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div
                  style={{
                    fontFamily: MD.serif,
                    fontSize: isMobile ? 16 : 22,
                    color: MD.ink,
                    lineHeight: 1,
                    fontStyle: 'italic',
                  }}
                >
                  {s.group}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {s.items.map((t) => (
                    <span
                      key={t}
                      style={{
                        background: MD.chipBg,
                        backdropFilter: 'blur(6px)',
                        border: MD.chipBd,
                        padding: isMobile ? '3px 8px' : '4px 10px',
                        borderRadius: 999,
                        fontSize: isMobile ? 10 : 11,
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

        {/* PROJECTS */}
        <MDGlass style={{ padding: isMobile ? '16px' : '22px 26px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              paddingBottom: 14,
              borderBottom: `1px solid ${MD.hairline}`,
              flexWrap: 'wrap',
              gap: 10,
            }}
          >
            <div style={{ display: 'flex', gap: 10, alignItems: 'baseline', flexWrap: 'wrap' }}>
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
              <span style={{ fontFamily: MD.serif, fontSize: heading2Size, letterSpacing: '-0.01em' }}>
                Selected work
              </span>
            </div>
            {!isMobile && (
              <span style={{ fontFamily: MD.mono, fontSize: 11, color: MD.mute }}>
                05 projects · 2024 — 2026
              </span>
            )}
          </div>
          {MD_PROJECTS.map((p, i) => (
            <div
              key={p.n}
              style={{
                display: isMobile ? 'flex' : 'grid',
                flexDirection: isMobile ? 'column' : 'row',
                gridTemplateColumns: isMobile ? undefined : '88px 1fr 240px 32px',
                gap: isMobile ? 12 : 20,
                padding: isMobile ? '12px 0' : '18px 0',
                borderBottom: i < MD_PROJECTS.length - 1 ? `1px solid ${MD.hairline}` : 'none',
                alignItems: isMobile ? 'stretch' : 'center',
              }}
            >
              <div
                style={{
                  height: isMobile ? 100 : 72,
                  borderRadius: 12,
                  background: p.grad,
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)',
                  flexShrink: 0,
                  minWidth: isMobile ? undefined : 88,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    right: 8,
                    bottom: 4,
                    fontFamily: MD.serif,
                    fontSize: isMobile ? 32 : 30,
                    color: '#fff',
                    opacity: 0.9,
                    lineHeight: 1,
                  }}
                >
                  {p.n}
                </div>
                {isMobile && (
                  <div style={{ position: 'absolute', left: 8, top: 8, fontFamily: MD.mono, fontSize: 10, letterSpacing: '.18em', color: '#fff' }}>
                    {p.y}
                  </div>
                )}
              </div>
              <div>
                {!isMobile && (
                  <div style={{ display: 'flex', gap: 10, alignItems: 'baseline', marginBottom: 6 }}>
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
                )}
                {isMobile && (
                  <span style={{ fontFamily: MD.mono, fontSize: 9, color: MD.warm, display: 'block', marginBottom: 4 }}>
                    {p.kind}
                  </span>
                )}
                <div style={{ fontFamily: MD.serif, fontSize: isMobile ? 18 : 24, color: MD.ink, lineHeight: 1.1 }}>
                  {p.t}
                </div>
                <div
                  style={{
                    fontSize: isMobile ? 12 : 13,
                    color: MD.inkSoft,
                    marginTop: 4,
                    lineHeight: 1.45,
                    maxWidth: 560,
                  }}
                >
                  {p.desc}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: isMobile ? 'flex-start' : 'center' }}>
                {p.stack.map((t) => (
                  <span
                    key={t}
                    style={{
                      background: MD.chipBg,
                      border: MD.chipBd,
                      padding: isMobile ? '3px 8px' : '3px 9px',
                      borderRadius: 999,
                      fontSize: isMobile ? 9 : 11,
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
        </MDGlass>

        {/* EDUCATION + ACHIEVEMENTS */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.1fr 1fr', gap: 14 }}>
          {/* EDUCATION */}
          <MDGlass style={{ padding: isMobile ? '16px' : '22px 26px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                paddingBottom: 14,
                borderBottom: `1px solid ${MD.hairline}`,
                flexWrap: 'wrap',
                gap: 10,
              }}
            >
              <div style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
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
                <span style={{ fontFamily: MD.serif, fontSize: heading2Size, letterSpacing: '-0.01em' }}>
                  Education
                </span>
              </div>
            </div>
            {MD_EDUCATION.map((e, i) => (
              <div
                key={i}
                style={{
                  padding: isMobile ? '12px 0' : '16px 0',
                  borderBottom: i < MD_EDUCATION.length - 1 ? `1px solid ${MD.hairline}` : 'none',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    gap: 10,
                    flexWrap: 'wrap',
                  }}
                >
                  <span
                    style={{
                      fontFamily: MD.mono,
                      fontSize: isMobile ? 9 : 10,
                      letterSpacing: '.16em',
                      textTransform: 'uppercase',
                      color: MD.cool,
                    }}
                  >
                    {e.period}
                  </span>
                  {!isMobile && (
                    <span style={{ fontFamily: MD.mono, fontSize: 10, color: MD.mute }}>
                      {e.grade}
                    </span>
                  )}
                </div>
                <div style={{ fontFamily: MD.serif, fontSize: heading3Size, marginTop: 4, lineHeight: 1.2 }}>
                  {e.degree}
                </div>
                <div style={{ fontSize: isMobile ? 11 : 12, color: MD.inkSoft, marginTop: 2, fontStyle: 'italic' }}>
                  {e.school}
                </div>
                <ul
                  style={{
                    margin: '8px 0 0',
                    padding: 0,
                    listStyle: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                  }}
                >
                  {e.notes.map((n) => (
                    <li
                      key={n}
                      style={{
                        fontSize: isMobile ? 11 : 12,
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
                          top: 6,
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

          {/* ACHIEVEMENTS */}
          <MDGlass style={{ padding: isMobile ? '16px' : '22px 26px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                paddingBottom: 14,
                borderBottom: `1px solid ${MD.hairline}`,
                flexWrap: 'wrap',
                gap: 10,
              }}
            >
              <div style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
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
                <span style={{ fontFamily: MD.serif, fontSize: heading2Size, letterSpacing: '-0.01em' }}>
                  Achievements
                </span>
              </div>
              {!isMobile && <span style={{ fontFamily: MD.mono, fontSize: 11, color: MD.mute }}>06 highlights</span>}
            </div>
            {MD_ACHIEVEMENTS.map((a, i) => (
              <div
                key={i}
                style={{
                  display: isMobile ? 'flex' : 'grid',
                  flexDirection: isMobile ? 'column' : 'row',
                  gridTemplateColumns: isMobile ? undefined : '72px 1fr 48px',
                  gap: isMobile ? 8 : 12,
                  padding: isMobile ? '10px 0' : '14px 0',
                  borderBottom: i < MD_ACHIEVEMENTS.length - 1 ? `1px solid ${MD.hairline}` : 'none',
                  alignItems: 'stretch',
                }}
              >
                <span
                  style={{
                    background: MD.chipBg,
                    border: MD.chipBd,
                    padding: '3px 6px',
                    borderRadius: 6,
                    fontSize: isMobile ? 8 : 10,
                    color: MD.cool,
                    fontFamily: MD.mono,
                    letterSpacing: '.1em',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    minWidth: isMobile ? 'auto' : 72,
                  }}
                >
                  {a.kind}
                </span>
                <div>
                  <div style={{ fontFamily: MD.serif, fontSize: isMobile ? 16 : 18, lineHeight: 1.2 }}>
                    {a.title}
                  </div>
                  <div
                    style={{
                      fontSize: isMobile ? 10 : 11,
                      color: MD.mute,
                      marginTop: 2,
                      fontFamily: MD.mono,
                      letterSpacing: '.04em',
                    }}
                  >
                    {a.org}
                  </div>
                </div>
                {!isMobile && <span style={{ fontFamily: MD.mono, fontSize: 11, color: MD.mute, textAlign: 'right' }}>{a.year}</span>}
                {isMobile && <span style={{ fontFamily: MD.mono, fontSize: 10, color: MD.mute }}>{a.year}</span>}
              </div>
            ))}
          </MDGlass>
        </div>

        {/* CONTACT */}
        <MDGlass style={{ padding: isMobile ? '20px 16px' : '30px 32px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr', gap: isMobile ? 16 : 24, alignItems: isMobile ? 'stretch' : 'center' }}>
          <div>
            <span style={{ fontFamily: MD.mono, fontSize: isMobile ? 9 : 11, letterSpacing: '.18em', color: MD.mute }}>
              § 05 — Reach
            </span>
            <div
              style={{
                fontFamily: MD.serif,
                fontSize: isMobile ? 36 : 56,
                lineHeight: 0.95,
                marginTop: 8,
                letterSpacing: '-0.02em',
              }}
            >
              Let's <span style={{ fontStyle: 'italic', color: MD.warm }}>talk</span>.
            </div>
            <div style={{ fontFamily: MD.serif, fontSize: isMobile ? 16 : 24, color: MD.inkSoft, marginTop: 6 }}>
              hello@yourname.dev
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
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
                }}
              >
                <span
                  style={{
                    fontFamily: MD.mono,
                    fontSize: isMobile ? 9 : 10,
                    letterSpacing: '.16em',
                    color: MD.mute,
                    textTransform: 'uppercase',
                  }}
                >
                  {k}
                </span>
                <span style={{ fontSize: isMobile ? 11 : 13, color: MD.ink }}>{isMobile ? v.split('/').pop() : v} ↗</span>
              </div>
            ))}
          </div>
        </MDGlass>

        {/* footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '12px 8px 0',
            fontFamily: MD.mono,
            fontSize: isMobile ? 8 : 10,
            letterSpacing: '.16em',
            color: MD.muteSoft,
            textTransform: 'uppercase',
            flexWrap: isMobile ? 'wrap' : 'nowrap',
            gap: isMobile ? 8 : 0,
          }}
        >
          <span>Your Name · 2026 · Hà Nội</span>
          {!isMobile && <span>Set in Instrument Serif &amp; Geist</span>}
        </div>
      </div>
    </MDEnv>
  );
}
