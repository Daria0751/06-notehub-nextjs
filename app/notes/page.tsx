import type { Metadata } from 'next';
import { getNotes } from '../../lid/api';
import NoteList from '@/components/NoteList/NoteList';

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

export default Notes;

