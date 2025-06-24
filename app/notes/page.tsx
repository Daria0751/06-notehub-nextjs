import type { Metadata } from 'next';
import { getNotes } from '../../lib/api';
import NotesClient from './Notes.client';

export const metadata: Metadata = {
  title: 'Notes Page',
};

export default async function Page() {
  const response = await getNotes();

  return (
    <section>
      <NotesClient 
        initialData={{
          notes: response.notes,
          totalPages: response.total
        }} 
      />
    </section>
  );
}






