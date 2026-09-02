export interface GitHubContribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GitHubRepo {
  name: string;
  description: string;
  language: string;
  stars: number;
  url: string;
}
