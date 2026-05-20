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

function MDGlass({ children, className = '', style, padded = true, interactive = false, isMobile = false }: any) {
  return (
    <div
      className={`glass ${interactive ? 'interactive' : ''} ${className}`}
      style={{
        padding: padded ? 24 : 0,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function MDEnv({ children, style, scrollY = 0, isMobile = false, theme = 'sunset' }: any) {
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
      data-bg={theme}
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

  // ── Liquid Glass interactions ──────────────────────────────────
  useEffect(() => {
    if (!mounted) return;

    const cleanups: (() => void)[] = [];
    const isMob = window.innerWidth < 768;

    // ── Stagger reveal — ALL screen sizes ─────────────────────────
    const rows = document.querySelectorAll<HTMLElement>('[data-stagger-row]');
    const srIO = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          (en.target as HTMLElement).classList.add('sr-visible');
          srIO.unobserve(en.target);
        }
      });
    }, { threshold: 0.05 });
    rows.forEach(r => srIO.observe(r));
    cleanups.push(() => srIO.disconnect());

    // ── Typewriter — ALL screen sizes ─────────────────────────────
    const roleEl = document.getElementById('role-text');
    if (roleEl) {
      const roles = ['Junior Software Engineer', 'Fullstack Developer', 'TypeScript Enthusiast', 'OSS Contributor'];
      let ri = 0, ci = roles[0].length, del = true;
      let twTimer: ReturnType<typeof setTimeout>;
      const tick = () => {
        const w = roles[ri];
        if (!del) {
          ci++; roleEl.textContent = w.slice(0, ci);
          if (ci >= w.length) { del = true; twTimer = setTimeout(tick, 1400); return; }
        } else {
          ci--; roleEl.textContent = w.slice(0, ci);
          if (ci <= 0) { del = false; ri = (ri + 1) % roles.length; }
        }
        twTimer = setTimeout(tick, del ? 52 : 108);
      };
      twTimer = setTimeout(tick, 1000);
      cleanups.push(() => clearTimeout(twTimer));
    }

    // ── Page-load bubbles — fewer on mobile ───────────────────────
    const bubColors = ['rgba(255,150,100,0.5)', 'rgba(155,185,255,0.5)', 'rgba(255,205,120,0.5)', 'rgba(175,230,255,0.5)', 'rgba(200,155,255,0.5)'];
    const bubCount = isMob ? 5 : 10;
    for (let i = 0; i < bubCount; i++) {
      const p = document.createElement('div');
      const sz = 9 + Math.random() * 15;
      Object.assign(p.style, {
        position: 'fixed', bottom: '-20px', left: `${10 + Math.random() * 80}%`,
        width: sz + 'px', height: sz + 'px', borderRadius: '50%',
        background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.55), ${bubColors[i % bubColors.length]})`,
        border: '1px solid rgba(255,255,255,0.2)',
        pointerEvents: 'none', zIndex: '50', backdropFilter: 'blur(4px)',
      });
      document.body.appendChild(p);
      const dur = 1800 + Math.random() * 1800, delay = i * 160 + Math.random() * 400;
      p.animate([
        { transform: 'translateY(0) scale(0)', opacity: 0 },
        { transform: `translateY(-${65 + Math.random() * 25}vh) scale(1)`, opacity: 0.65, offset: 0.6 },
        { transform: `translateY(-${100 + Math.random() * 20}vh) scale(0.15)`, opacity: 0 },
      ], { duration: dur, delay, easing: 'cubic-bezier(.2,.8,.2,1)' });
      setTimeout(() => p.remove(), dur + delay + 100);
    }

    // ── MOBILE interactions ────────────────────────────────────────
    if (isMob) {
      // Card entrance: visible cards animate immediately, off-screen via IO
      document.querySelectorAll<HTMLElement>('.glass').forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          card.style.animation = `mc-card-enter .5s cubic-bezier(.4,0,.2,1) ${i * 55}ms both`;
        } else {
          const io = new IntersectionObserver(entries => {
            entries.forEach(en => {
              if (en.isIntersecting) {
                (en.target as HTMLElement).style.animation = 'mc-card-enter .5s cubic-bezier(.4,0,.2,1) both';
                io.unobserve(en.target);
              }
            });
          }, { threshold: 0.08 });
          io.observe(card);
          cleanups.push(() => io.disconnect());
        }
      });

      // Touch ripple on buttons
      document.querySelectorAll<HTMLElement>('.btn').forEach(btn => {
        const touch = (e: TouchEvent) => {
          const t = e.touches[0];
          const r = btn.getBoundingClientRect();
          const span = document.createElement('span');
          const sz = Math.max(r.width, r.height) * 2.2;
          Object.assign(span.style, {
            position: 'absolute', borderRadius: '50%', background: 'rgba(255,255,255,0.28)',
            transform: 'scale(0)', animation: 'ripple-out .72s cubic-bezier(.4,0,.2,1)',
            width: sz + 'px', height: sz + 'px',
            left: (t.clientX - r.left - sz / 2) + 'px',
            top: (t.clientY - r.top - sz / 2) + 'px',
            pointerEvents: 'none',
          });
          btn.appendChild(span);
          setTimeout(() => span.remove(), 760);
        };
        btn.addEventListener('touchstart', touch as EventListener, { passive: true });
        cleanups.push(() => btn.removeEventListener('touchstart', touch as EventListener));
      });

      // Press spring — glass cards scale on touch
      document.querySelectorAll<HTMLElement>('.glass').forEach(card => {
        const ts = () => {
          card.style.transition = 'transform .12s cubic-bezier(.3,1.5,.4,1)';
          card.style.transform = 'scale(0.972)';
        };
        const te = () => {
          card.style.transform = 'scale(1.008)';
          setTimeout(() => { card.style.transform = 'scale(1)'; }, 150);
        };
        card.addEventListener('touchstart', ts, { passive: true });
        card.addEventListener('touchend', te);
        card.addEventListener('touchcancel', te);
        cleanups.push(() => {
          card.removeEventListener('touchstart', ts);
          card.removeEventListener('touchend', te);
          card.removeEventListener('touchcancel', te);
        });
      });

      // Skill tag tap scramble
      const POOL_M = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      document.querySelectorAll<HTMLElement>('.tag[data-text]').forEach(tag => {
        const orig = tag.dataset.text!;
        let timer: ReturnType<typeof setInterval>;
        const scramble = () => {
          clearInterval(timer);
          let f = 0;
          timer = setInterval(() => {
            const shown = Math.floor(f / 3);
            tag.textContent = orig.split('').map((c, idx) => idx < shown ? c : POOL_M[Math.floor(Math.random() * POOL_M.length)]).join('');
            f++;
            if (f > orig.length * 3) { clearInterval(timer); tag.textContent = orig; }
          }, 24);
        };
        tag.addEventListener('touchstart', scramble, { passive: true });
        cleanups.push(() => tag.removeEventListener('touchstart', scramble));
      });

      return () => cleanups.forEach(fn => fn());
    }

    // ── DESKTOP interactions ───────────────────────────────────────

    // Cursor glow (warm radial that lags behind mouse)
    const glow = document.createElement('div');
    Object.assign(glow.style, {
      position: 'fixed', width: '140px', height: '140px', borderRadius: '50%',
      pointerEvents: 'none', zIndex: '9', transform: 'translate(-50%,-50%)',
      background: 'radial-gradient(circle,rgba(255,220,160,0.13) 0%,transparent 70%)',
      mixBlendMode: 'screen', willChange: 'left,top',
    });
    document.body.appendChild(glow);
    let gtx = -300, gty = -300, gcx = -300, gcy = -300, glowRaf = 0;
    const onMM = (e: MouseEvent) => { gtx = e.clientX; gty = e.clientY; };
    document.addEventListener('mousemove', onMM);
    const glowTick = () => {
      gcx += (gtx - gcx) * 0.1; gcy += (gty - gcy) * 0.1;
      glow.style.left = gcx + 'px'; glow.style.top = gcy + 'px';
      glowRaf = requestAnimationFrame(glowTick);
    };
    glowTick();
    cleanups.push(() => {
      document.removeEventListener('mousemove', onMM);
      cancelAnimationFrame(glowRaf);
      glow.remove();
    });

    // Tilt 3D + cursor specular on every .glass.interactive card
    document.querySelectorAll<HTMLElement>('.glass.interactive').forEach(el => {
      const mm = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        el.style.transform = `perspective(900px) translateY(-4px) rotateX(${(.5 - py) * 9}deg) rotateY(${(px - .5) * 9}deg)`;
        el.style.setProperty('--mx', px * 100 + '%');
        el.style.setProperty('--my', py * 100 + '%');
      };
      const ml = () => { el.style.transform = ''; };
      el.addEventListener('mousemove', mm as EventListener);
      el.addEventListener('mouseleave', ml);
      cleanups.push(() => {
        el.removeEventListener('mousemove', mm as EventListener);
        el.removeEventListener('mouseleave', ml);
      });
    });

    // Ripple on .btn clicks
    document.querySelectorAll<HTMLElement>('.btn').forEach(btn => {
      const click = (e: MouseEvent) => {
        const r = btn.getBoundingClientRect();
        const span = document.createElement('span');
        const sz = Math.max(r.width, r.height) * 2.2;
        Object.assign(span.style, {
          position: 'absolute', borderRadius: '50%', background: 'rgba(255,255,255,0.3)',
          transform: 'scale(0)', animation: 'ripple-out .72s cubic-bezier(.4,0,.2,1)',
          width: sz + 'px', height: sz + 'px',
          left: (e.clientX - r.left - sz / 2) + 'px',
          top: (e.clientY - r.top - sz / 2) + 'px',
          pointerEvents: 'none',
        });
        btn.appendChild(span);
        setTimeout(() => span.remove(), 760);
      };
      btn.addEventListener('click', click as EventListener);
      cleanups.push(() => btn.removeEventListener('click', click as EventListener));
    });

    // Magnetic Résumé button
    const resumeBtn = document.querySelector<HTMLElement>('.btn-primary');
    if (resumeBtn?.parentElement) {
      const par = resumeBtn.parentElement;
      const magMM = (e: MouseEvent) => {
        const r = resumeBtn.getBoundingClientRect();
        resumeBtn.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.3}px,${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
      };
      const magML = () => { resumeBtn.style.transform = ''; };
      par.addEventListener('mousemove', magMM as EventListener);
      par.addEventListener('mouseleave', magML);
      cleanups.push(() => {
        par.removeEventListener('mousemove', magMM as EventListener);
        par.removeEventListener('mouseleave', magML);
      });
    }

    // Skill tag text scramble on hover
    const POOL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    document.querySelectorAll<HTMLElement>('.tag[data-text]').forEach(tag => {
      const orig = tag.dataset.text!;
      let timer: ReturnType<typeof setInterval>;
      const enter = () => {
        clearInterval(timer);
        let f = 0;
        timer = setInterval(() => {
          const shown = Math.floor(f / 3);
          tag.textContent = orig.split('').map((c, i) => i < shown ? c : POOL[Math.floor(Math.random() * POOL.length)]).join('');
          f++;
          if (f > orig.length * 3) { clearInterval(timer); tag.textContent = orig; }
        }, 24);
      };
      tag.addEventListener('mouseenter', enter);
      cleanups.push(() => tag.removeEventListener('mouseenter', enter));
    });

    return () => cleanups.forEach(fn => fn());
  }, [mounted]); // re-run after DOM populates (mounted: false→true)

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
          <div
            className="glass thin interactive"
            style={{
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
          </div>
          {!isMobile && (
            <div className="glass thin interactive" style={{ padding: 6, display: 'flex', gap: 2 }}>
              {MD_NAV.map((t, i) => (
                <span
                  key={t}
                  className="control-chip"
                  style={{
                    background: i === 0 ? 'rgba(255,255,255,0.55)' : 'transparent',
                    color: i === 0 ? '#0f172a' : 'var(--ink-on-glass)',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
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
          @keyframes caret-blink { 50% { opacity: 0; } }
          .tw-caret {
            display: inline-block; width: 2px; height: .82em;
            background: rgba(160,200,255,0.85); vertical-align: -1px;
            animation: caret-blink 1s steps(2) infinite; margin-left: 2px;
            border-radius: 1px;
          }
          [data-stagger-row] {
            opacity: 0;
            transform: translateX(-18px);
            transition: opacity .52s cubic-bezier(.4,0,.2,1), transform .52s cubic-bezier(.4,0,.2,1);
            transition-delay: calc(var(--sr-i, 0) * 80ms);
          }
          [data-stagger-row].sr-visible {
            opacity: 1 !important;
            transform: translateX(0) !important;
          }
          @keyframes mc-card-enter {
            from { opacity: 0; transform: translateY(24px); }
          }
          @keyframes mc-hero-enter {
            from { opacity: 0; transform: translateY(16px) scale(0.98); }
          }
          @keyframes mc-nav-enter {
            from { opacity: 0; transform: translateY(-12px); }
          }
        `}</style>

        <div className="glass interactive" style={{
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
                  <span id="role-text">Junior Software Engineer</span>
                  <span className="tw-caret" />
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
            <button className="btn btn-primary" style={{ width: isMobile ? '100%' : '140px' }}>
              ↓ Résumé
            </button>
            <button className="btn btn-ghost" style={{ width: isMobile ? '100%' : '140px' }}>
              ✉ Email
            </button>
          </div>
        </div>

        <div className="glass interactive" style={{ padding: isMobile ? '18px 16px' : '22px 26px' }}>
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
              <span className="eyebrow">§ 01</span>
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
                    <span key={t} className="tag" data-text={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass interactive" style={{ padding: isMobile ? '18px 16px' : '22px 26px' }}>
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
              <span className="eyebrow">§ 02</span>
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
              data-stagger-row=""
              style={{
                '--sr-i': i,
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '88px 1fr 240px 32px',
                gap: isMobile ? 12 : 20,
                padding: isMobile ? '12px 0' : '18px 0',
                borderBottom: i < MD_PROJECTS.length - 1 ? `1px solid ${MD.hairline}` : 'none',
                alignItems: 'flex-start',
              } as React.CSSProperties}
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
                  <span key={t} className="tag">
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
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.1fr 1fr', gap: 14 }}>
          <div className="glass interactive" style={{ padding: isMobile ? '18px 16px' : '22px 26px' }}>
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
                <span className="eyebrow">§ 03</span>
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
          </div>

          <div className="glass interactive" style={{ padding: isMobile ? '18px 16px' : '22px 26px' }}>
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
                <span className="eyebrow">§ 04</span>
                <span style={{ fontFamily: MD.serif, fontSize: isMobile ? 18 : 26, letterSpacing: '-0.01em' }}>
                  Achievements
                </span>
              </div>
              <span style={{ fontFamily: MD.mono, fontSize: isMobile ? 9 : 11, color: MD.mute, whiteSpace: 'nowrap' }}>06 highlights</span>
            </div>
            {MD_ACHIEVEMENTS.map((a, i) => (
              <div
                key={i}
                data-stagger-row=""
                style={{
                  '--sr-i': i,
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '72px 1fr 48px',
                  gap: isMobile ? 8 : 12,
                  padding: isMobile ? '10px 0' : '14px 0',
                  borderBottom: i < MD_ACHIEVEMENTS.length - 1 ? `1px solid ${MD.hairline}` : 'none',
                  alignItems: 'flex-start',
                } as React.CSSProperties}
              >
                <span className="badge" style={{
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.28)',
                  color: 'var(--ink-on-glass)',
                  fontSize: 10,
                  fontFamily: MD.mono,
                  letterSpacing: '.1em',
                  textTransform: 'uppercase',
                  padding: '3px 8px',
                  minWidth: 'auto',
                }}>
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
          </div>
        </div>

        <div className="glass interactive" style={{ padding: isMobile ? '20px 16px' : '30px 32px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr', gap: isMobile ? 16 : 24, alignItems: 'center' }}>
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
        </div>

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
