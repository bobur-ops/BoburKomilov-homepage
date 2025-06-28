import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "octokit";

const githubToken = process.env.GITHUB_TOKEN;
const repo = "bobur-ops/BoburKomilov-homepage";
const branch = "main";

const octokit = new Octokit({
  auth: githubToken,
});

export async function POST(req: NextRequest) {
  try {
    const { filename, markdown } = await req.json();

    if (!filename || !markdown) {
      return new Response("Filename and markdown content are required", {
        status: 400,
      });
    }

    if (!/^[a-zA-Z0-9-_]+$/.test(filename)) {
      return new Response("Invalid filename format", { status: 400 });
    }

    const [owner, repoName] = repo.split("/");
    const filePath = `src/app/posts/${filename}/content.mdx`;
    const message = `feat(post): add or update ${filename}`;

    // Get file SHA if it exists
    let sha: string | undefined;
    try {
      const { data } = await octokit.rest.repos.getContent({
        owner,
        repo: repoName,
        path: filePath,
        ref: branch,
      });
      if (!Array.isArray(data) && data.sha) {
        sha = data.sha;
      }
    } catch (err: any) {
      console.log("File not found, creating new:", err.message);
    }

    await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo: repoName,
      path: filePath,
      message,
      content: Buffer.from(markdown).toString("base64"),
      branch,
      sha,
    });

    return NextResponse.json({ message: "Saved to GitHub successfully!" });
  } catch (error) {
    console.error("GitHub save error:", error);
    return new Response("Failed to save to GitHub", { status: 500 });
  }
}
