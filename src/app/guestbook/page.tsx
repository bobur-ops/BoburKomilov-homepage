import MdxWrapper from "@/components/MdxWrapper";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import GuestbookClient from "./client";
import { getGuestbookMessages } from "./api";

export default async function GuestbookPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["guestbook"],
    queryFn: getGuestbookMessages,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MdxWrapper>
        <GuestbookClient />
      </MdxWrapper>
    </HydrationBoundary>
  );
}
