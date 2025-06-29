import Portal from "@/components/Portal";
import CreatedAt from "@/components/CreatedAt";
import MdxWrapper from "@/components/MdxWrapper";
import { getPostMarkdown, getPublishedPosts } from "@/lib/notion";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import { cn } from "@/lib/utils";

export async function ggenerateStaticParams() {
  const posts = await getPublishedPosts();

  return posts.map((post: any) => {
    const slug = post.properties.slug?.rich_text[0]?.plain_text || post.id;
    return { slug };
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const posts = await getPublishedPosts();
  const post: any = posts.find((p: any) => {
    const slug = p.properties.slug?.rich_text[0]?.plain_text || p.id;
    return slug === params.slug;
  });
  if (!post) {
    return (
      <MdxWrapper>
        <div className="text-center py-20">Post not found</div>
      </MdxWrapper>
    );
  }

  const mdxContent = await getPostMarkdown(post.id);
  const coverImage = post.cover?.external.url;
  const createdAt = post.created_time;

  return (
    <>
      <MdxWrapper
        className={cn({
          "pt-[350px]": coverImage,
        })}
      >
        {coverImage && (
          <Portal>
            <div className="fixed top-14 left-0 right-0 h-[350px]">
              <Image
                alt="Cover Image"
                width={1920}
                height={350}
                src={coverImage}
                className="w-full h-full object-cover"
                placeholder="blur"
                blurDataURL={coverImage}
              />
            </div>
          </Portal>
        )}

        <MDXRemote source={mdxContent.parent} />

        <CreatedAt createdAt={createdAt} />
      </MdxWrapper>
    </>
  );
}
