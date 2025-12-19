import axios from "axios";
import { GitlabEventItem } from "./route";

const eventsUrl = "https://gitlab.fizmasoft.uz/api/v4/users/20/events";

export function getLevel(count: number): number {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 10) return 3;
  return 4;
}

export async function fetchAllEventsUntilYearStart(): Promise<
  GitlabEventItem[]
> {
  const allEvents: GitlabEventItem[] = [];
  const startOfYear = new Date(new Date().getFullYear(), 0, 1);

  let page = 1;
  let hasNextPage = true;

  while (hasNextPage) {
    const res = await axios.get<GitlabEventItem[]>(eventsUrl, {
      headers: {
        "PRIVATE-TOKEN": process.env.GITLAB_TOKEN || "",
      },
      params: {
        per_page: 100,
        page,
      },
    });

    const events = res.data;

    if (events.length === 0) break;

    for (const event of events) {
      const eventDate = new Date(event.created_at);

      if (eventDate < startOfYear) {
        // Stop immediately once we cross into last year
        hasNextPage = false;
        break;
      }

      allEvents.push(event);
    }

    const nextPage = res.headers["x-next-page"];
    hasNextPage = Boolean(nextPage);
    page = Number(nextPage);
  }

  return allEvents;
}
