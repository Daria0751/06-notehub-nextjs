import type { Metadata } from 'next';
import { getNotes } from '../../lid/api';
import NotesClient from './NotesClient';

export const metadata: Metadata = {
  title: 'Notes Page',
};

export default async function NotesPage() {
  const response = await getNotes();

  return (
    <section>
      <NotesClient initialData={response.notes} />
    </section>
  );
}




