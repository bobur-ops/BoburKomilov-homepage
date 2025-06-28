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

  useHotkeys("ctrl+enter, cmd+enter", () => setIsPreview(!isPreview), {
    enableOnContentEditable: true,
    enableOnFormTags: true,
  });

  const handleSave = async () => {
    console.log("Save markdown:", markdown);
  };

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
      // Move cursor to the end
      textarea.setSelectionRange(length, length);
    }
  }, [isPreview]);

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
