import React from 'react';
import { getSingleNote } from '../../../lid/api';
import NoteDetailsClient from './NoteDetails.client';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';

// У Next.js 15 App Router правильніше не створювати свій Props type, 
// а одразу в параметрах функції деструктурувати params:
interface PageProps {
  params: { id: string };
}

const NoteDetails = async ({ params }: PageProps) => {
  const { id } = params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => getSingleNote(id),
  });

  const note = await getSingleNote(id);

  if (!note) {
    return <p>Note not found</p>;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient note={note} />
    </HydrationBoundary>
  );
};

export default NoteDetails;




  