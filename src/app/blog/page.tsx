export const revalidate = 60;

import RemoteBlurImage from "@/components/BlurImage";
import MdxWrapper from "@/components/MdxWrapper";
import { getPublishedPosts } from "@/lib/notion";
import { getCoverImage } from "@/utils/getCoverImage";
import { format } from "date-fns";
import Link from "next/link";

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <MdxWrapper isProse={false}>
      <h1 className="text-3xl font-bold mb-6">📝 Blog</h1>

      {posts.length === 0 && (
        <div className="text-center text-2xl py-20">No posts found</div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {posts.map((post: any) => {
          if (!("properties" in post)) return null;
          const title =
            post.properties.title?.title[0]?.plain_text || "Untitled";
          const slug =
            post.properties.slug?.rich_text[0]?.plain_text || post.id;

          const coverImage = getCoverImage(post);
          const createdAt = post.created_time;

          return (
            <Link href={`/blog/${slug}`} key={post.id}>
              <div className="border flex flex-col transition-colors hover:bg-accent h-full">
                <div className="flex-1 max-h-52">
                  {coverImage ? (
                    <RemoteBlurImage
                      src={coverImage}
                      alt={title}
                      width={800}
                      height={400}
                      className="w-full h-52 object-cover !m-0"
                    />
                  ) : (
                    <div className="w-full h-full bg-accent"></div>
                  )}
                </div>

                <div className="p-4">
                  <h2 className="text-xl font-semibold decoration-0">
                    {title}
                  </h2>
                  {createdAt && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {format(new Date(createdAt), "MMMM d, yyyy")}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </MdxWrapper>
  );
}
