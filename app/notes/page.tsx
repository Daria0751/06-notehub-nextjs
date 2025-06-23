import type { Metadata } from 'next';
import NotesClient from './NotesClient';

export const metadata: Metadata = {
  title: 'Notes Page',
};

export default function Page() {
  return (
    <section>
      <NotesClient />
    </section>
  );
}







