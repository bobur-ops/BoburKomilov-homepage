import { MDXRemote } from "next-mdx-remote/rsc";
import MdxWrapper from "@/components/MdxWrapper";
import { getPostContent } from "@/utils/getPostContent";

export default async function Page({
  params,
}: {
  params: { post_id: string };
}) {
  const { post_id } = await params;
  const { content, data } = await getPostContent(
    `posts/${post_id}/content.mdx`
  );

  return (
    <MdxWrapper>
      <h1 className="text-2xl font-bold">{data.title}</h1>
      <p className="text-sm text-muted-foreground">
        By {data.author} on {data.date}
      </p>
      <div className="mt-4">
        <MDXRemote source={content} />
      </div>
    </MdxWrapper>
  );
}
