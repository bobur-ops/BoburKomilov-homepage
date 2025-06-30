import Portal from "@/components/Portal";
import CreatedAt from "@/components/CreatedAt";
import MdxWrapper from "@/components/MdxWrapper";
import { getPostMarkdown, getPublishedPosts } from "@/lib/notion";
import { MDXRemote } from "next-mdx-remote/rsc";
import { cn } from "@/lib/utils";
import readingTime from "reading-time";
import RemoteBlurImage from "@/components/BlurImage";
import { getCoverImage } from "@/utils/getCoverImage";

export async function generateStaticParams() {
  const posts = await getPublishedPosts();

  return posts.map((post: any) => {
    const slug = post.properties.slug?.rich_text[0]?.plain_text || post.id;
    return { slug };
  });
}

export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const { slug } = params;
  const posts = await getPublishedPosts();
  const post: any = posts.find((p: any) => {
    const s = p.properties.slug?.rich_text[0]?.plain_text || p.id;
    return s === slug;
  });
  if (!post) {
    return (
      <MdxWrapper>
        <div className="text-center py-20">Post not found</div>
      </MdxWrapper>
    );
  }

  const mdxContent = await getPostMarkdown(post.id);
  const coverImage = getCoverImage(post);
  const createdAt = post.created_time;

  const readStats = readingTime(mdxContent.parent);
  const readTime = readStats?.text;

  return (
    <>
      <MdxWrapper
        className={cn({
          "pt-[200px] md:pt-[350px]": coverImage,
        })}
      >
        <CreatedAt readTime={readTime} createdAt={createdAt} />
        {coverImage && (
          <Portal>
            <div className="absolute top-14 left-0 right-0 h-[200px] md:h-[350px]">
              <RemoteBlurImage
                alt="Cover Image"
                width={1920}
                height={350}
                src={coverImage}
                className="w-full h-full object-cover"
              />
            </div>
          </Portal>
        )}

        <MDXRemote source={mdxContent.parent} />
      </MdxWrapper>
    </>
  );
}
