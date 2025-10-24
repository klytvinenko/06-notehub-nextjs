import { fetchNoteById } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";


interface NoteDetailsProps {
  params:  Promise<{ id: string }>;
}

const NoteDetails = async ({ params }: NoteDetailsProps) => {
  const { id } =await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NoteDetailsClient id={id}/>
    </HydrationBoundary>
  );
};

export default NoteDetails;
