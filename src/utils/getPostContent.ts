import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function getPostContent(relativePath: string) {
  const filePath = path.join(process.cwd(), "src", "app", relativePath);
  const raw = fs.readFileSync(filePath, "utf-8");
  return matter(raw);
}
