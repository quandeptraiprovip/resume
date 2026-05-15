'use client';

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

function MDEnv({ children, style }: any) {
  const bg = `
    radial-gradient(800px 500px at 20% 80%, rgba(255,180,120,0.45) 0%, transparent 60%),
    radial-gradient(900px 600px at 90% 20%, rgba(180,200,255,0.35) 0%, transparent 55%),
    radial-gradient(600px 400px at 70% 70%, rgba(255,140,140,0.25) 0%, transparent 55%),
    linear-gradient(180deg, #1d2a4c 0%, #3a4a7c 30%, #6a5a7c 55%, #8a6a5c 75%, #c89a7a 100%)
  `;
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
          right: '12%',
          top: '6%',
          width: 160,
          height: 160,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(255,220,160,0.85), rgba(255,180,120,0) 70%)',
          filter: 'blur(6px)',
          pointerEvents: 'none',
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
          opacity: 0.42,
          pointerEvents: 'none',
        }}
      >
        <path
          d="M0,460 L120,320 L240,420 L380,260 L520,380 L660,240 L800,360 L940,280 L1080,360 L1180,300 L1180,780 L0,780 Z"
          fill="rgba(10,16,32,0.55)"
        />
        <path
          d="M0,560 L160,460 L320,530 L500,420 L680,510 L860,440 L1060,510 L1180,470 L1180,780 L0,780 Z"
          fill="rgba(10,16,32,0.45)"
        />
        <path
          d="M0,660 L200,580 L420,630 L640,560 L880,620 L1080,580 L1180,610 L1180,780 L0,780 Z"
          fill="rgba(10,16,32,0.38)"
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
  return (
    <MDEnv>
      <div
        style={{
          padding: '24px 32px 40px',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          maxWidth: 1180,
          margin: '0 auto',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <MDGlass
            padded={false}
            style={{
              borderRadius: 999,
              padding: '8px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: MD.green,
                boxShadow: `0 0 10px ${MD.green}`,
              }}
            />
            <span style={{ fontFamily: MD.serif, fontSize: 17, letterSpacing: '-0.01em' }}>
              Your Name
            </span>
            <span
              style={{
                fontFamily: MD.mono,
                fontSize: 10,
                letterSpacing: '.16em',
                color: MD.mute,
                marginLeft: 6,
              }}
            >
              OPEN · MAY '26
            </span>
          </MDGlass>
          <MDGlass
            padded={false}
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
        </div>

        <MDGlass style={{ padding: '22px 26px', display: 'flex', alignItems: 'center', gap: 22, marginTop: 80 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #5b8cff, #ff9ec7)',
              flexShrink: 0,
              boxShadow:
                'inset 0 2px 0 rgba(255,255,255,0.4), 0 6px 20px rgba(0,0,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: MD.serif,
              fontSize: 30,
              color: '#fff',
            }}
          >
            yn
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, flexWrap: 'wrap' }}>
              <h1
                style={{
                  fontFamily: MD.serif,
                  fontWeight: 400,
                  fontSize: 44,
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  margin: 0,
                }}
              >
                Your Name
              </h1>
              <span style={{ fontSize: 14, color: MD.inkSoft }}>— Junior Software Engineer</span>
            </div>
            <p
              style={{
                fontSize: 14,
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
        </MDGlass>

        <MDGlass style={{ padding: '22px 26px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              paddingBottom: 14,
              borderBottom: `1px solid ${MD.hairline}`,
            }}
          >
            <div style={{ display: 'flex', gap: 14, alignItems: 'baseline' }}>
              <span
                style={{
                  fontFamily: MD.mono,
                  fontSize: 11,
                  letterSpacing: '.18em',
                  color: MD.mute,
                }}
              >
                § 01
              </span>
              <span style={{ fontFamily: MD.serif, fontSize: 26, letterSpacing: '-0.01em' }}>
                Skills &amp; stack
              </span>
            </div>
            <span style={{ fontFamily: MD.mono, fontSize: 11, color: MD.mute }}>
              4 categories · 20+ tools
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20, paddingTop: 18 }}>
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

        <MDGlass style={{ padding: '22px 26px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              paddingBottom: 14,
              borderBottom: `1px solid ${MD.hairline}`,
            }}
          >
            <div style={{ display: 'flex', gap: 14, alignItems: 'baseline' }}>
              <span
                style={{
                  fontFamily: MD.mono,
                  fontSize: 11,
                  letterSpacing: '.18em',
                  color: MD.mute,
                }}
              >
                § 02
              </span>
              <span style={{ fontFamily: MD.serif, fontSize: 26, letterSpacing: '-0.01em' }}>
                Selected work
              </span>
            </div>
            <span style={{ fontFamily: MD.mono, fontSize: 11, color: MD.mute }}>
              05 projects · 2024 — 2026
            </span>
          </div>
          {MD_PROJECTS.map((p, i) => (
            <div
              key={p.n}
              style={{
                display: 'grid',
                gridTemplateColumns: '88px 1fr 240px 32px',
                gap: 20,
                padding: '18px 0',
                borderBottom: i < MD_PROJECTS.length - 1 ? `1px solid ${MD.hairline}` : 'none',
                alignItems: 'center',
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

        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 14 }}>
          <MDGlass style={{ padding: '22px 26px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                paddingBottom: 14,
                borderBottom: `1px solid ${MD.hairline}`,
              }}
            >
              <div style={{ display: 'flex', gap: 14, alignItems: 'baseline' }}>
                <span
                  style={{
                    fontFamily: MD.mono,
                    fontSize: 11,
                    letterSpacing: '.18em',
                    color: MD.mute,
                  }}
                >
                  § 03
                </span>
                <span style={{ fontFamily: MD.serif, fontSize: 26, letterSpacing: '-0.01em' }}>
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

          <MDGlass style={{ padding: '22px 26px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                paddingBottom: 14,
                borderBottom: `1px solid ${MD.hairline}`,
              }}
            >
              <div style={{ display: 'flex', gap: 14, alignItems: 'baseline' }}>
                <span
                  style={{
                    fontFamily: MD.mono,
                    fontSize: 11,
                    letterSpacing: '.18em',
                    color: MD.mute,
                  }}
                >
                  § 04
                </span>
                <span style={{ fontFamily: MD.serif, fontSize: 26, letterSpacing: '-0.01em' }}>
                  Achievements
                </span>
              </div>
              <span style={{ fontFamily: MD.mono, fontSize: 11, color: MD.mute }}>06 highlights</span>
            </div>
            {MD_ACHIEVEMENTS.map((a, i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '72px 1fr 48px',
                  gap: 12,
                  padding: '14px 0',
                  borderBottom: i < MD_ACHIEVEMENTS.length - 1 ? `1px solid ${MD.hairline}` : 'none',
                  alignItems: 'center',
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

        <MDGlass style={{ padding: '30px 32px', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24, alignItems: 'center' }}>
          <div>
            <span style={{ fontFamily: MD.mono, fontSize: 11, letterSpacing: '.18em', color: MD.mute }}>
              § 05 — Reach
            </span>
            <div
              style={{
                fontFamily: MD.serif,
                fontSize: 56,
                lineHeight: 0.95,
                marginTop: 8,
                letterSpacing: '-0.02em',
              }}
            >
              Let's <span style={{ fontStyle: 'italic', color: MD.warm }}>talk</span>.
            </div>
            <div style={{ fontFamily: MD.serif, fontSize: 24, color: MD.inkSoft, marginTop: 6 }}>
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
                  padding: '10px 14px',
                  borderRadius: 10,
                  background: 'rgba(255,255,255,0.06)',
                  border: MD.chipBd,
                }}
              >
                <span
                  style={{
                    fontFamily: MD.mono,
                    fontSize: 10,
                    letterSpacing: '.16em',
                    color: MD.mute,
                    textTransform: 'uppercase',
                  }}
                >
                  {k}
                </span>
                <span style={{ fontSize: 13, color: MD.ink }}>{v} ↗</span>
              </div>
            ))}
          </div>
        </MDGlass>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '18px 8px 0',
            fontFamily: MD.mono,
            fontSize: 10,
            letterSpacing: '.16em',
            color: MD.muteSoft,
            textTransform: 'uppercase',
          }}
        >
          <span>Your Name · 2026 · Hà Nội</span>
          <span>Set in Instrument Serif &amp; Geist</span>
        </div>
      </div>
    </MDEnv>
  );
}
