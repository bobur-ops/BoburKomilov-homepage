import { Contribution, ContributionResponse, Total } from "@/lib/contributions";
import { NextResponse } from "next/server";
import { fetchAllEventsUntilYearStart, getLevel } from "./util";

export interface GitlabEventItem {
  id: number;
  project_id: number;
  action_name: string;
  target_id?: number;
  target_iid?: number;
  target_type?: string;
  author_id: number;
  target_title?: string;
  created_at: string;
  author: Author;
  imported: boolean;
  imported_from: string;
  push_data?: PushData;
  author_username: string;
}

export interface Author {
  id: number;
  username: string;
  name: string;
  state: string;
  locked: boolean;
  avatar_url: string;
  web_url: string;
}

export interface PushData {
  commit_count: number;
  action: string;
  ref_type: string;
  commit_from?: string;
  commit_to?: string;
  ref: string;
  commit_title?: string;
  ref_count: any;
}

export async function GET() {
  const events = await fetchAllEventsUntilYearStart();

  return NextResponse.json(normalizeData(events));
}

function normalizeData(events: GitlabEventItem[]): ContributionResponse {
  const dailyMap: Record<string, number> = {};
  const totalByYear: Total = {};

  for (const event of events) {
    const date = event.created_at.slice(0, 10);
    const year = new Date(event.created_at).getFullYear();

    dailyMap[date] = (dailyMap[date] || 0) + 1;
    totalByYear[year] = (totalByYear[year] || 0) + 1;
  }

  const year = new Date().getFullYear();
  const start = new Date(year, 0, 1);
  const end = new Date(year, 11, 31);

  const contributions: Contribution[] = [];

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const date = d.toISOString().slice(0, 10);
    const count = dailyMap[date] || 0;

    contributions.push({
      date,
      count,
      level: getLevel(count),
    });
  }

  return {
    total: totalByYear,
    contributions,
  };
}
