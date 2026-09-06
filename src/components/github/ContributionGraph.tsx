"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { GitHubContribution, GitHubRepo } from "@/types/github";
import { site } from "@/data/site";
import { ExternalLink } from "lucide-react";

// Deterministic fallback data
function seededRandom(seed: number) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function getFallbackContributions(): GitHubContribution[] {
  return Array.from({ length: 365 }, (_, i) => {
    const level = Math.floor(seededRandom(i + 1) * 5) as 0 | 1 | 2 | 3 | 4;
    return {
      date: new Date(Date.now() - (365 - i) * 86400000)
        .toISOString()
        .split("T")[0],
      count: level * 3,
      level,
    };
  });
}

function extractUsername(githubUrl: string): string {
  const match = githubUrl.match(/github\.com\/([^/]+)/);
  return match ? match[1] : "amitkhayargoli";
}

const CELL_SIZE = 11;
const CELL_GAP = 3;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["", "Mon", "", "Wed", "", "Fri", ""];

function getLevelColor(level: number, isDark: boolean): string {
  if (isDark) {
    const colors = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];
    return colors[level] || colors[0];
  }
  const colors = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
  return colors[level] || colors[0];
}

interface WeekData {
  days: GitHubContribution[];
  monthLabel?: string;
}

export function ContributionGraph() {
  const [contributions, setContributions] = useState<GitHubContribution[]>([]);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(true);
  const [hoveredDay, setHoveredDay] = useState<GitHubContribution | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const username = extractUsername(site.github);

  // Detect theme
  useEffect(() => {
    const check = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const [contribRes, reposRes] = await Promise.allSettled([
          fetch(`/api/github?username=${username}&type=contributions`),
          fetch(`/api/github?username=${username}&type=repos`),
        ]);

        if (contribRes.status === "fulfilled" && contribRes.value.ok) {
          const data = await contribRes.value.json();
          setContributions(data.length > 0 ? data : getFallbackContributions());
        } else {
          setContributions(getFallbackContributions());
        }

        if (reposRes.status === "fulfilled" && reposRes.value.ok) {
          const data = await reposRes.value.json();
          setRepos(data);
        }
      } catch {
        setContributions(getFallbackContributions());
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [username]);

  // Build weeks with month labels
  const { weeks, totalContributions } = useMemo(() => {
    const displayData = contributions.length > 0 ? contributions : getFallbackContributions();
    const total = displayData.reduce((sum, d) => sum + d.count, 0);

    const allWeeks: WeekData[] = [];
    let currentMonth = -1;

    for (let i = 0; i < displayData.length; i += 7) {
      const weekDays = displayData.slice(i, i + 7);
      const firstDayDate = new Date(weekDays[0].date);
      const month = firstDayDate.getMonth();

      let monthLabel: string | undefined;
      if (month !== currentMonth && firstDayDate.getDate() <= 7) {
        monthLabel = MONTHS[month];
        currentMonth = month;
      }

      allWeeks.push({ days: weekDays, monthLabel });
    }

    return { weeks: allWeeks, totalContributions: total };
  }, [contributions]);

  const handleMouseEnter = (day: GitHubContribution, e: React.MouseEvent) => {
    setHoveredDay(day);
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setTooltipPos({ x: rect.left + rect.width / 2, y: rect.top - 8 });
  };

  return (
    <section className="py-6 md:py-8">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <motion.h2
          className="text-xs uppercase tracking-widest text-muted mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          GitHub Activity
        </motion.h2>

        <motion.div
          className="overflow-x-auto scrollbar-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {loading ? (
            <div className="h-[140px] bg-card rounded-lg animate-pulse" />
          ) : (
            <div className="relative">
              {/* Total count */}
              <p className="text-sm text-muted mb-4">
                <span className="font-medium text-foreground">{totalContributions.toLocaleString()}</span> contributions in the last year
              </p>

              {/* Month labels */}
              <div className="flex ml-[38px] mb-1">
                {weeks.map((week, i) => (
                  <div
                    key={i}
                    className="text-[10px] text-muted"
                    style={{ width: CELL_SIZE + CELL_GAP, flexShrink: 0 }}
                  >
                    {week.monthLabel}
                  </div>
                ))}
              </div>

              {/* Graph */}
              <div className="flex gap-0">
                {/* Day labels */}
                <div className="flex flex-col gap-[3px] mr-1">
                  {DAYS.map((day, i) => (
                    <div
                      key={i}
                      className="text-[10px] text-muted flex items-center"
                      style={{ height: CELL_SIZE }}
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Weeks */}
                <div className="flex gap-[3px]">
                  {weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-[3px]">
                      {week.days.map((day) => (
                        <div
                          key={day.date}
                          className="rounded-[2px] transition-colors cursor-default"
                          style={{
                            width: CELL_SIZE,
                            height: CELL_SIZE,
                            backgroundColor: getLevelColor(day.level, isDark),
                          }}
                          onMouseEnter={(e) => handleMouseEnter(day, e)}
                          onMouseLeave={() => setHoveredDay(null)}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tooltip */}
              {hoveredDay && (
                <div
                  className="fixed z-50 px-3 py-1.5 bg-foreground text-background text-xs rounded-md shadow-lg pointer-events-none whitespace-nowrap -translate-x-1/2 -translate-y-full"
                  style={{ left: tooltipPos.x, top: tooltipPos.y }}
                >
                  <strong>{hoveredDay.count} contributions</strong> on{" "}
                  {new Date(hoveredDay.date + "T00:00:00").toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              )}

              {/* Legend */}
              <div className="flex items-center justify-end gap-1 mt-3 text-[10px] text-muted">
                <span>Less</span>
                {[0, 1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className="rounded-[2px]"
                    style={{
                      width: CELL_SIZE,
                      height: CELL_SIZE,
                      backgroundColor: getLevelColor(level, isDark),
                    }}
                  />
                ))}
                <span>More</span>
              </div>
            </div>
          )}
        </motion.div>

        {/* Top Repos */}
        {repos.length > 0 && (
          <motion.div
            className="mt-8 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xs uppercase tracking-widest text-muted">
              Top Repositories
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {repos.slice(0, 4).map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 rounded-xl border border-border bg-card hover:bg-card-hover transition-all"
                >
                  <div className="flex items-start justify-between">
                    <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                      {repo.name}
                    </p>
                    <ExternalLink
                      size={14}
                      className="text-muted opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                  {repo.description && (
                    <p className="text-xs text-muted mt-1 line-clamp-2">
                      {repo.description}
                    </p>
                  )}
                  <div className="flex items-center gap-3 mt-3 text-xs text-muted">
                    {repo.language && (
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-accent" />
                        {repo.language}
                      </span>
                    )}
                    {repo.stars > 0 && <span>★ {repo.stars}</span>}
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
          >
            View GitHub
            <ExternalLink size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
