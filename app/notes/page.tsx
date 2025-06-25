import type { Metadata } from 'next';
import NotesClient from './Notes.client';
import { getNotes } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Notes Page',
};

export default async function Page() {
  const data = await getNotes();

  return (
    <section>
      <NotesClient initialData={data} />
    </section>
  );
}








