"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { marked } from "marked";
import matter from "gray-matter";

export default function CreatePostPage() {
  const [markdown, setMarkdown] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const parsed: any = useMemo(() => {
    if (!isPreview) return { content: "", data: {} };
    return matter(markdown);
  }, [isPreview, markdown]);

  const html = useMemo(() => {
    if (!isPreview) return "";
    return marked(parsed.content);
  }, [isPreview, parsed]);

  useEffect(() => {
    if (!isPreview && textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.focus();
      const length = textarea.value.length;
      textarea.setSelectionRange(length, length);
    }
  }, [isPreview]);

  const handleSave = async () => {
    const parsed = matter(markdown);

    const title = parsed.data.title;
    const filename =
      title
        ?.toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "")
        .trim() || "untitled";

    if (!title) {
      alert("Missing title in frontmatter!");
      return;
    }

    const res = await fetch("/api/save-post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        filename,
        markdown,
      }),
    });

    const json = await res.json();
    if (!res.ok) {
      alert(`Error: ${json.error}`);
    } else {
      alert(json.message);
    }
  };

  useHotkeys("ctrl+shift+enter, cmd+shift+enter", () => handleSave(), {
    enableOnContentEditable: true,
    enableOnFormTags: true,
  });

  useHotkeys("ctrl+enter, cmd+enter", () => setIsPreview(!isPreview), {
    enableOnContentEditable: true,
    enableOnFormTags: true,
  });

  return (
    <div className="py-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Create Post</h1>
        <Button onClick={handleSave}>Save</Button>
      </div>

      {isPreview ? (
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{parsed.data.title}</h1>
          <p className="text-sm text-muted-foreground">
            By {parsed.data.author} on {parsed.data.date}
          </p>
          <div
            className="mt-4 prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      ) : (
        <div className="border bg-muted/30">
          <textarea
            ref={textareaRef}
            className="outline-none w-full h-[80vh] p-2"
            placeholder="Write your markdown here..."
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}
