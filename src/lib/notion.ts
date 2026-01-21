import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

const notionToken = import.meta.env.NOTION_TOKEN;
const notionDatabaseId = import.meta.env.NOTION_DATABASE_ID;

const notion = new Client({ auth: notionToken });

export const n2m = new NotionToMarkdown({ notionClient: notion });

export async function getPublishedPosts() {
  const response = await notion.databases.query({
    database_id: notionDatabaseId!,
    filter: {
      property: "published",
      checkbox: { equals: true },
    },
    sorts: [
      {
        timestamp: "last_edited_time",
        direction: "descending",
      },
    ],
  });

  return response.results;
}

export async function getPostMarkdown(pageId: string) {
  const mdBlocks = await n2m.pageToMarkdown(pageId);
  return n2m.toMarkdownString(mdBlocks);
}
