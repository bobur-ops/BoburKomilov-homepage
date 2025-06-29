import { DEFAULT_PLACEHOLDER_IMAGE } from "@/consts/blurImage";
import Image from "next/image";
import React from "react";

type RemoteBlurImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
  className?: string;
};

const RemoteBlurImage: React.FC<RemoteBlurImageProps> = ({
  src,
  alt,
  width,
  height,
  blurDataURL = DEFAULT_PLACEHOLDER_IMAGE,
  className,
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      placeholder="blur"
      blurDataURL={blurDataURL}
      className={className}
    />
  );
};

export default RemoteBlurImage;
