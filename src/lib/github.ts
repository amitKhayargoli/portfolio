import { GitHubContribution, GitHubRepo } from "@/types/github";

const GITHUB_API = "https://api.github.com";

/**
 * Fetch the contribution calendar for a GitHub user.
 * Uses the GraphQL API which requires an authenticated token.
 */
export async function fetchContributions(
  username: string
): Promise<GitHubContribution[]> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.warn("GITHUB_TOKEN not set — returning empty contributions");
    return [];
  }

  const now = new Date();
  const to = now.toISOString().split("T")[0];
  const from = new Date(now.getTime() - 364 * 86400000)
    .toISOString()
    .split("T")[0];

  const query = `
    query ($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
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
  `;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables: { username, from, to } }),
    next: { revalidate: 3600 }, // cache for 1 hour
  });

  if (!res.ok) {
    console.error("GitHub GraphQL error:", res.status, await res.text());
    return [];
  }

  const data = await res.json();
  const weeks =
    data?.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? [];

  const levelMap: Record<string, 0 | 1 | 2 | 3 | 4> = {
    NONE: 0,
    FIRST_QUARTILE: 1,
    SECOND_QUARTILE: 2,
    THIRD_QUARTILE: 3,
    FOURTH_QUARTILE: 4,
  };

  const contributions: GitHubContribution[] = [];
  for (const week of weeks) {
    for (const day of week.contributionDays) {
      contributions.push({
        date: day.date,
        count: day.contributionCount,
        level: levelMap[day.contributionLevel] ?? 0,
      });
    }
  }

  return contributions;
}

/**
 * Fetch top repositories for a GitHub user.
 */
export async function fetchRepos(username: string): Promise<GitHubRepo[]> {
  const res = await fetch(
    `${GITHUB_API}/users/${username}/repos?sort=updated&per_page=6`,
    {
      headers: {
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {}),
      },
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    console.error("GitHub repos error:", res.status);
    return [];
  }

  const repos = await res.json();
  return repos
    .filter((r: { fork: boolean }) => !r.fork)
    .map((r: {
      name: string;
      description: string | null;
      language: string | null;
      stargazers_count: number;
      html_url: string;
    }) => ({
      name: r.name,
      description: r.description ?? "",
      language: r.language ?? "Unknown",
      stars: r.stargazers_count,
      url: r.html_url,
    }));
}
