import { MDXRemote } from "next-mdx-remote/rsc";
import MdxWrapper from "@/components/MdxWrapper";
import { getPostContent } from "@/utils/getPostContent";

export default function Page({ params }: { params: { post_id: string } }) {
  const { content, data } = getPostContent(
    `posts/${params.post_id}/content.mdx`
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
