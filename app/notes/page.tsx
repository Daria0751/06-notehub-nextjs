import type { Metadata } from 'next';
import { getNotes } from '../../lid/api';
import NoteList from '@/components/NoteList/NoteList';
import { QueryClient } from "@tanstack/react-query";
import { getSingleNote } from "@/lid/api";
import NoteDetailsClient from './[id]/NoteDetails.client';

export const metadata: Metadata = {
  title: 'Note page',
};

const Notes = async () => {
  const response = await getNotes();

  return (
    <section>
      <h1>Notes List</h1>
      {response?.notes?.length > 0 ? (
        <NoteList notes={response.notes} />
      ) : (
        <p>No notes found.</p>
      )}
    </section>
  );
};

type Props = {
  params: Promise<{ id: string }>;
};

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => getSingleNote(id),
  });

  return <NoteDetailsClient />;
};

export default NoteDetails;



