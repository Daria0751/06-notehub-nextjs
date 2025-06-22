import { getSingleNote } from '../../../lid/api';
import NoteDetailsClient from './NoteDetails.client';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';

export default async function Page({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', params.id],
    queryFn: () => getSingleNote(params.id),
  });

  const note = await getSingleNote(params.id);

  if (!note) {
    return <p>Note not found</p>;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient note={note} />
    </HydrationBoundary>
  );
}







  