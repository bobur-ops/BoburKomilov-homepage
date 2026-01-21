export function getCoverImage(post: any) {
  let coverImage: string | undefined;
  if (post.cover) {
    if (post.cover.type === "external") {
      coverImage = post.cover.external.url;
    } else if (post.cover.type === "file") {
      coverImage = post.cover.file.url;
    }
  }

  return coverImage;
}
