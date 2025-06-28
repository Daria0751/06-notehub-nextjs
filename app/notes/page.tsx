import NotesClient from './Notes.client';
import { getNotes } from '@/lib/api';

export default async function NotesPage() {
  try {
    const data = await getNotes();
    return <NotesClient initialData={data} />;
  } catch (error) {
    console.error('Failed to load notes at build time:', error);
    return <p>Failed to load notes</p>;
  }
}









