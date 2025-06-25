import { HydrationBoundary, dehydrate, QueryClient } from '@tanstack/react-query';
import NoteDetailsClient from './NoteDetails.client';
import { getSingleNote } from '@/lib/api';

type Props = {
  params: { id: string };
};

export default async function Page({ params }: Props) {
  const queryClient = new QueryClient();
  const noteId = Number(params.id);
  await queryClient.prefetchQuery({
    queryKey: ['note', noteId],
    queryFn: () => getSingleNote(noteId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}












  