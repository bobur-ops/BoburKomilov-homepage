import { getLevel } from "@/app/api/gitlab/util";
import axios from "axios";

export interface ContributionResponse {
  total: Total;
  contributions: Contribution[];
}

export type Total = Record<number, number>;

export interface Contribution {
  date: string;
  count: number;
  level: number;
}

const currentYear = new Date().getFullYear();

const GITHUB_URL = `https://github-contributions-api.jogruber.de/v4/bobur-ops?y=${currentYear}`;
const GITLAB_URL = `${process.env.NEXT_PUBLIC_SITE_URL}/api/gitlab`;

export async function getContributions() {
  try {
    const [githubRes, gitlabRes] = await Promise.all([
      axios<ContributionResponse>(GITHUB_URL),
      axios<ContributionResponse>(GITLAB_URL),
    ]);

    const merged = mergeContributions(githubRes.data, gitlabRes.data);

    return merged;
  } catch (error) {
    console.log("Error fetching contributions:", error);
    return undefined;
  }
}

function mergeContributions(
  github: ContributionResponse,
  gitlab: ContributionResponse
): ContributionResponse {
  const mergedTotal: Total = { ...github.total };
  for (const [year, count] of Object.entries(gitlab.total)) {
    const yearNum = Number(year);
    mergedTotal[yearNum] = (mergedTotal[yearNum] || 0) + count;
  }

  const contributionsMap = new Map<string, Contribution>();

  for (const contrib of github.contributions) {
    contributionsMap.set(contrib.date, { ...contrib });
  }

  for (const contrib of gitlab.contributions) {
    const existing = contributionsMap.get(contrib.date);

    if (existing) {
      existing.count += contrib.count;
      existing.level = getLevel(existing.count);
    } else {
      contributionsMap.set(contrib.date, { ...contrib });
    }
  }

  const mergedContributions = Array.from(contributionsMap.values()).sort(
    (a, b) => a.date.localeCompare(b.date)
  );

  return {
    total: mergedTotal,
    contributions: mergedContributions,
  };
}
