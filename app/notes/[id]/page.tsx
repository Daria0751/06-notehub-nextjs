import { HydrationBoundary, dehydrate, QueryClient } from '@tanstack/react-query';
import NoteDetailsClient from './NoteDetails.client';

export default function Page() {
  return (
    <HydrationBoundary state={dehydrate(new QueryClient())}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}








  