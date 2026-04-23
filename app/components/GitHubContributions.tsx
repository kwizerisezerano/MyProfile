'use client'

import { useState, useEffect, useRef, CSSProperties } from "react";
import { useTheme } from './ThemeProvider';

const COLORS_LIGHT = ["#f0fdf4", "#86efac", "#4ade80", "#22c55e", "#15803d"];
const COLORS_DARK  = ["#0f172a", "#14532d", "#16a34a", "#22c55e", "#4ade80"];
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

// Dynamically generate years from 2023 up to the current year — updates every year automatically
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from(
  { length: CURRENT_YEAR - 2023 + 1 },
  (_, i) => String(CURRENT_YEAR - i)  // most recent first
);

interface Contribution { date: string; count: number; level: number; }
interface TooltipState { visible: boolean; text: string; x: number; y: number; }

interface TokenSet {
  bg: string; surface: string; surfaceHov: string; border: string; borderHov: string;
  title: string; body: string; muted: string; accent: string; accentHov: string;
  accentDim: string; pillBg: string; pillText: string; pillBorder: string;
  cardShadow: string; toggleBg: string; toggleBorder: string; toggleText: string;
  divider: string; dot1: string; dot2: string;
}

// GitHub GraphQL API response types
interface GitHubWeek {
  contributionDays: {
    date: string;
    contributionCount: number;
    contributionLevel: string;
  }[];
}

interface GitHubResponse {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions: number;
          weeks: GitHubWeek[];
        };
      };
    };
  };
  errors?: Array<{ message: string }>;
}

function getLevelFromGitHub(level: string): number {
  switch (level) {
    case 'NONE': return 0;
    case 'FIRST_QUARTILE': return 1;
    case 'SECOND_QUARTILE': return 2;
    case 'THIRD_QUARTILE': return 3;
    case 'FOURTH_QUARTILE': return 4;
    default: return 0;
  }
}

function getLevel(n: number): number {
  return n === 0 ? 0 : n <= 2 ? 1 : n <= 5 ? 2 : n <= 9 ? 3 : 4;
}

interface Props {
  username?: string;
  theme?: "dark" | "light";
  tokens?: TokenSet;
  style?: CSSProperties;
}

export default function GitHubContributions({
  username = "kwizerisezerano",
  theme: themeProp,
  tokens: tokensProp,
  style: styleProp,
}: Props) {
  const [year, setYear]       = useState(String(CURRENT_YEAR));
  const [contributions, setContributions]       = useState<Contribution[]>([]);
  const [yearTotal, setYearTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);
  const [tooltip, setTooltip] = useState<TooltipState>({ visible: false, text: "", x: 0, y: 0 });
  const [copied, setCopied] = useState(false);
  const [allTimeTotal, setAllTimeTotal] = useState<number | null>(null);
  const cache   = useRef<Record<string, { contributions: Contribution[]; total: number }>>({});
  const wrapRef = useRef<HTMLDivElement>(null);

  const { theme: portfolioTheme } = useTheme();
  const isDark = themeProp !== undefined ? themeProp === "dark" : portfolioTheme === "dark";

  const COLORS = isDark ? COLORS_DARK : COLORS_LIGHT;

  // Resolve all colors matching portfolio's dark theme (green primary)
  const accent        = tokensProp?.accent  ?? (isDark ? "#4ade80" : "#16a34a");
  const surface       = tokensProp?.surface ?? (isDark ? "#0f172a" : "#ffffff");
  const border        = tokensProp?.border  ?? (isDark ? "rgba(74, 222, 128, 0.2)" : "rgba(22, 163, 74, 0.15)");
  const titleColor    = tokensProp?.title   ?? (isDark ? "#f8fafc" : "#111827");
  const mutedColor    = tokensProp?.muted   ?? (isDark ? "#94a3b8" : "#64748b");
  const bodyColor     = tokensProp?.body    ?? (isDark ? "#cbd5e1" : "#475569");
  const statBg        = isDark ? "rgba(74, 222, 128, 0.1)" : "rgba(22, 163, 74, 0.08)";
  const codeBg        = isDark ? "#1e293b" : "#f0fdf4";
  const codeHeaderBg  = isDark ? "rgba(74, 222, 128, 0.1)" : "rgba(22, 163, 74, 0.1)";
  const tooltipBg     = isDark ? "#1e293b" : "#f0fdf4";
  const tooltipBorder = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)";
  const tooltipColor  = isDark ? "#f4f4f5" : "#111827";

  // GitHub token from env (required for GraphQL API)
  const githubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  
  // Debug logging
  useEffect(() => {
    console.log('GitHubContributions mounted');
    console.log('Token available:', !!githubToken);
    console.log('Username:', username);
  }, []);

  // GitHub GraphQL query for contributions
  const getContributionsQuery = (login: string, from: string, to: string) => ({
    query: `
      query($login: String!, $from: DateTime!, $to: DateTime!) {
        user(login: $login) {
          contributionsCollection(from: $from, to: $to) {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                  contributionLevel
                }
              }
            }
          }
        }
      }
    `,
    variables: { login, from, to }
  });

  // Fetch contributions for a specific year directly from GitHub
  const fetchYearContributions = async (targetYear: string): Promise<{ contributions: Contribution[]; total: number } | null> => {
    if (!githubToken) {
      console.error('GitHub token not configured. Set NEXT_PUBLIC_GITHUB_TOKEN in .env.local');
      return null;
    }

    const from = `${targetYear}-01-01T00:00:00Z`;
    const to = `${targetYear}-12-31T23:59:59Z`;
    
    try {
      const res = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${githubToken}`,
        },
        body: JSON.stringify(getContributionsQuery(username, from, to))
      });
      
      console.log('GitHub API response status:', res.status);
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error('GitHub API HTTP error:', res.status, errorText);
        throw new Error(`HTTP ${res.status}`);
      }
      
      const json: GitHubResponse = await res.json();
      console.log('GitHub API response:', json.data?.user ? 'has user data' : 'no user data', json.errors ? 'has errors' : 'no errors');
      
      if (json.errors || !json.data?.user?.contributionsCollection?.contributionCalendar) {
        console.error('GitHub API error:', json.errors?.[0]?.message || 'No data');
        return null;
      }
      
      const calendar = json.data.user.contributionsCollection.contributionCalendar;
      const contribs: Contribution[] = [];
      
      calendar.weeks.forEach(week => {
        week.contributionDays.forEach(day => {
          contribs.push({
            date: day.date,
            count: day.contributionCount,
            level: getLevelFromGitHub(day.contributionLevel)
          });
        });
      });
      
      contribs.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      
      return { contributions: contribs, total: calendar.totalContributions };
    } catch (err) {
      console.error(`Failed to fetch ${targetYear}:`, err);
      return null;
    }
  };

  // Load all-time total on mount (only if token available)
  useEffect(() => {
    if (!githubToken) return;
    
    async function loadAllTime() {
      let total = 0;
      for (const y of YEARS) {
        const data = await fetchYearContributions(y);
        if (data) {
          cache.current[y] = data;
          total += data.total;
        }
      }
      setAllTimeTotal(total);
    }
    loadAllTime();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, githubToken]);

  // Load year data
  useEffect(() => {
    if (!githubToken) {
      setLoading(false);
      setError(true);
      return;
    }
    
    async function load() {
      if (cache.current[year]) { 
        setContributions(cache.current[year].contributions);
        setYearTotal(cache.current[year].total);
        setLoading(false); 
        return; 
      }
      setLoading(true); 
      setError(false);
      try {
        const data = await fetchYearContributions(year);
        if (data) {
          cache.current[year] = data;
          setContributions(data.contributions);
          setYearTotal(data.total);
        } else {
          setError(true);
        }
      } catch { setError(true); }
      finally { setLoading(false); }
    }
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, username, githubToken]);

  const total = yearTotal;

  const streak = (() => {
    let mx = 0, cur = 0;
    for (const d of contributions) { if (d.count > 0) { cur++; mx = Math.max(mx, cur); } else cur = 0; }
    return mx;
  })();

  const activeDays = contributions.filter(d => d.count > 0).length;
  const best = contributions.length > 0 ? contributions.reduce(
    (a, b) => (a.count >= b.count ? a : b),
    { count: 0, date: "", level: 0 } as Contribution
  ) : { count: 0, date: "", level: 0 };

  const buildWeeks = (): (Contribution | null)[][] => {
    if (!contributions.length) return [];
    const first = new Date(contributions[0].date);
    const startDow = first.getDay();
    const weeks: (Contribution | null)[][] = [];
    let week: (Contribution | null)[] = new Array(startDow).fill(null);
    for (const d of contributions) {
      week.push(d);
      if (week.length === 7) { weeks.push(week); week = []; }
    }
    if (week.length) { while (week.length < 7) week.push(null); weeks.push(week); }
    return weeks;
  };

  const weeks = buildWeeks();
  const cellSize = 12, gap = 3, step = cellSize + gap;
  const paddingLeft = 30, paddingTop = 22;

  // Always show full year: pad weeks to 53 weeks (365 days / 7 = ~52.14 weeks)
  const FULL_YEAR_WEEKS = 53;
  const paddedWeeks = [...weeks];
  while (paddedWeeks.length < FULL_YEAR_WEEKS) {
    paddedWeeks.push(new Array(7).fill(null));
  }

  const svgW = paddingLeft + FULL_YEAR_WEEKS * step;
  const svgH = paddingTop + 7 * step;

  const handleMouseMove = (e: React.MouseEvent, day: Contribution) => {
    const bounds = wrapRef.current?.getBoundingClientRect();
    if (!bounds) return;
    setTooltip({
      visible: true,
      text: `${day.count} contribution${day.count !== 1 ? "s" : ""} · ${day.date}`,
      x: e.clientX - bounds.left + 10,
      y: e.clientY - bounds.top - 34,
    });
  };

  const codeSnippet = `// GitHub GraphQL API
const query = \`
  query {
    user(login: "${username}") {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
\`;`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const styles: Record<string, CSSProperties> = {
    section:     { fontFamily: "'Montserrat', sans-serif", padding: "32px 0 0", backgroundColor: "transparent", ...styleProp },
    card:        { backgroundColor: surface, border: `1px solid ${border}`, borderRadius: 16, padding: "28px 32px", boxShadow: isDark ? "0 4px 20px rgba(74, 222, 128, 0.08)" : "0 4px 20px rgba(0,0,0,0.08)" },
    topBar:      { display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 20 },
    usernameRow: { display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, color: titleColor },
    avatar:      { width: 28, height: 28, borderRadius: "50%", background: statBg, border: `0.5px solid ${border}`, display: "flex", alignItems: "center", justifyContent: "center" },
    yearTabs:    { display: "flex", gap: 4, flexWrap: "wrap" },
    statsRow:    { display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" },
    statBox:     { background: statBg, borderRadius: 10, padding: "16px 20px", flex: 1, minWidth: 140 },
    allTimeBox:  { background: isDark ? "linear-gradient(135deg, rgba(74, 222, 128, 0.15), rgba(74, 222, 128, 0.05))" : "linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(34, 197, 94, 0.05))", borderRadius: 8, padding: "12px 16px", border: `1px solid ${isDark ? "rgba(74, 222, 128, 0.25)" : "rgba(34, 197, 94, 0.25)"}`, marginBottom: 16 },
    allTimeLabel:{ fontSize: 11, color: mutedColor, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 4 },
    allTimeValue:{ fontSize: 24, fontWeight: 800, color: accent },
    statLabel:   { fontSize: 11, color: mutedColor, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 6 },
    statValue:   { fontSize: 22, fontWeight: 800, color: titleColor },
    graphWrap:   { overflowX: "auto", position: "relative", width: "100%" },
    graphInner:  { position: "relative", display: "inline-block", minWidth: "100%", maxWidth: "100%", background: isDark ? "rgba(30, 41, 59, 0.5)" : "transparent", borderRadius: 8, padding: isDark ? "12px" : "0" },
    legendRow:   { display: "flex", alignItems: "center", gap: 6, marginTop: 10, fontSize: 11, color: mutedColor },
    codeSection: { marginTop: 20, borderRadius: 10, border: `0.5px solid ${border}`, overflow: "hidden" },
    codeHeader:  { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 14px", background: codeHeaderBg, borderBottom: `0.5px solid ${border}` },
    codeTitle:   { fontSize: 11, color: mutedColor, letterSpacing: "0.06em", textTransform: "uppercase" },
    copyBtn:     { fontSize: 11, padding: "3px 10px", borderRadius: 6, border: `0.5px solid ${border}`, background: "transparent", color: bodyColor, cursor: "pointer", fontFamily: "monospace" },
    noTokenMsg:  { fontSize: 12, color: mutedColor, marginBottom: 12, padding: "8px 12px", background: statBg, borderRadius: 6, borderLeft: `3px solid ${accent}` },
    codeBody:    { background: codeBg, padding: "14px 16px", fontFamily: "monospace", fontSize: 12, lineHeight: 1.7, overflowX: "auto", whiteSpace: "pre" },
  };

  const yearBtnStyle = (y: string): CSSProperties => {
    const isSelected = y === year;
    return {
      padding: "6px 14px",
      borderRadius: 99,
      fontSize: 12,
      fontWeight: 600,
      border: isSelected ? `1px solid ${accent}` : `1px solid ${isDark ? "rgba(74, 222, 128, 0.2)" : border}`,
      background: isSelected ? accent : isDark ? "rgba(74, 222, 128, 0.05)" : "transparent",
      color: isSelected ? (isDark ? "#0f172a" : "#fff") : isDark ? "#cbd5e1" : bodyColor,
      cursor: "pointer",
      transition: "all 0.2s ease",
      boxShadow: isSelected && isDark ? "0 0 10px rgba(74, 222, 128, 0.3)" : "none",
    };
  };

  return (
    <section id="contributions" style={styles.section}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            GitHub <span className="text-gradient">Contributions</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto rounded-full" />
        </div>
        
        <div style={styles.card}>

        {/* Top bar */}
        <div style={styles.topBar}>
          <div style={styles.usernameRow}>
            <div style={styles.avatar}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={mutedColor} strokeWidth="2">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </div>
            {username}
          </div>
          <div style={styles.yearTabs}>
            {YEARS.map(y => (
              <button key={y} style={yearBtnStyle(y)} onClick={() => setYear(y)}>{y}</button>
            ))}
          </div>
          <a 
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 6, 
              fontSize: 12, 
              color: accent,
              textDecoration: "none",
              padding: "6px 12px",
              border: `1px solid ${isDark ? "rgba(74, 222, 128, 0.3)" : "rgba(22, 163, 74, 0.3)"}`,
              borderRadius: 20,
              fontWeight: 600
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            View Profile
          </a>
        </div>

        {/* All-time total */}
        {allTimeTotal !== null && (
          <div style={styles.allTimeBox}>
            <div style={styles.allTimeLabel}>All-Time Contributions</div>
            <div style={styles.allTimeValue}>{allTimeTotal.toLocaleString()}</div>
          </div>
        )}

        {/* Stats */}
        <h3 className="text-lg font-bold mb-4" style={{ color: titleColor }}>Stats</h3>
        {loading ? (
          <div style={{ ...styles.statBox, color: mutedColor, fontSize: 13, marginBottom: 20 }}>Loading…</div>
        ) : error ? (
          <div style={{
            color: isDark ? "#f87171" : "#dc2626",
            marginBottom: 16,
            fontSize: 14,
            padding: "12px 16px",
            background: isDark ? "rgba(248, 113, 113, 0.1)" : "rgba(220, 38, 38, 0.1)",
            borderRadius: 8,
            border: `1px solid ${isDark ? "rgba(248, 113, 113, 0.2)" : "rgba(220, 38, 38, 0.2)"}`
          }}>
            <strong>Error:</strong> Could not load GitHub data. Please check your token and username.
            {!githubToken && <div style={{ marginTop: 8, fontSize: 12 }}>No GitHub token found in environment variables.</div>}
          </div>
        ) : (
          <div style={styles.statsRow}>
            {[
              { l: "Total",          v: total.toLocaleString() },
              { l: "Active days",    v: String(activeDays) },
              { l: "Longest streak", v: `${streak} days` },
              { l: "Best day",       v: best.count + (best.date ? ` · ${best.date.slice(5)}` : "") },
            ].map(s => (
              <div key={s.l} style={styles.statBox}>
                <div style={styles.statLabel}>{s.l}</div>
                <div style={styles.statValue}>{s.v}</div>
              </div>
            ))}
          </div>
        )}

        {/* Graph + Contribution Rate - Responsive: stack on mobile, side-by-side on desktop */}
        {!loading && !error && (
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-5 items-stretch lg:items-start mb-2">
            {/* Left: Graph - Scrollable on mobile */}
            <div className="flex-1 min-w-0 overflow-x-auto pb-2">
              <div style={styles.graphWrap}>
                <div style={styles.graphInner} ref={wrapRef}>
                  <svg width={svgW} height={svgH} style={{ display: "block", minWidth: svgW }}>
                {[1, 3, 5].map(d => (
                  <text key={d} x={paddingLeft - 4} y={paddingTop + d * step + cellSize - 2}
                    textAnchor="end" style={{ fontSize: 10, fill: mutedColor, fontFamily: "monospace" }}>
                    {DAYS[d]}
                  </text>
                ))}
                {(() => {
                  const labels: React.ReactNode[] = [];
                  let lastMonth = -1;
                  paddedWeeks.forEach((wk, wi) => {
                    const fr = wk.find(d => d !== null);
                    if (fr) {
                      const m = new Date(fr.date).getMonth();
                      if (m !== lastMonth) {
                        lastMonth = m;
                        labels.push(
                          <text key={wi} x={paddingLeft + wi * step} y={paddingTop - 6}
                            style={{ fontSize: 11, fill: mutedColor, fontFamily: "monospace" }}>
                            {MONTHS[m]}
                          </text>
                        );
                      }
                    }
                  });
                  return labels;
                })()}
                {paddedWeeks.map((wk, wi) =>
                  wk.map((day, di) => {
                    if (!day) return null;
                    return (
                      <rect key={`${wi}-${di}`}
                        x={paddingLeft + wi * step} y={paddingTop + di * step}
                        width={cellSize} height={cellSize} rx={2}
                        fill={COLORS[getLevel(day.count)]}
                        style={{ cursor: "default" }}
                        onMouseMove={e => handleMouseMove(e, day)}
                        onMouseLeave={() => setTooltip(t => ({ ...t, visible: false }))}
                      />
                    );
                  })
                )}
              </svg>
              {tooltip.visible && (
                <div style={{
                  position: "absolute", left: tooltip.x, top: tooltip.y,
                  background: tooltipBg, border: `0.5px solid ${tooltipBorder}`,
                  borderRadius: 6, padding: "5px 10px", fontSize: 11,
                  color: tooltipColor, pointerEvents: "none", whiteSpace: "nowrap",
                  fontFamily: "monospace", zIndex: 20,
                }}>
                  {tooltip.text}
                </div>
              )}
                </div>
              </div>
              {/* Legend below graph */}
              <div style={styles.legendRow}>
                <span>Less</span>
                {COLORS.map((c, i) => (
                  <div key={i} style={{ width: 12, height: 12, borderRadius: 2, background: c }} />
                ))}
                <span>More</span>
              </div>
            </div>

            {/* Right: Contribution Rate Card - Full width on mobile, fixed width on desktop */}
            <div className="w-full lg:w-40 flex-shrink-0" style={{
              padding: "16px lg:20px",
              borderRadius: 12,
              background: isDark ? "linear-gradient(135deg, rgba(74, 222, 128, 0.12), rgba(74, 222, 128, 0.04))" : "linear-gradient(135deg, rgba(34, 197, 94, 0.12), rgba(34, 197, 94, 0.04))",
              border: `1px solid ${isDark ? "rgba(74, 222, 128, 0.25)" : "rgba(34, 197, 94, 0.25)"}`,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              minHeight: svgH + 20
            }}>
              <div style={{ fontSize: 11, color: mutedColor, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Contribution Rate</div>
              <div className="text-2xl lg:text-4xl" style={{ fontWeight: 800, color: accent, marginBottom: 4 }}>
                {contributions.length > 0 ? ((activeDays / contributions.length) * 100).toFixed(1) : 0}%
              </div>
              <div style={{ fontSize: 12, color: mutedColor }}>days with activity</div>
            </div>
          </div>
        )}
        </div>
      </div>
    </section>
  );
}
