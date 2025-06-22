'use client';

import React from 'react';
import type { Note } from '../../../types/note';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getSingleNote } from '../../../lid/api';


type Props = {
  note: Note;
};

export const NoteDetailsWithProp = ({ note }: Props) => {
  return (
    <section>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
    </section>
  );
};

export const NoteDetailsWithQuery = () => {
  const { id } = useParams<{ id: string }>();

  const { data: note, isLoading, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => getSingleNote(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading...</p>;

  if (error || !note) return <p>Some error..</p>;

  const formattedDate = note.updatedAt
    ? `Updated at: ${note.updatedAt}`
    : `Created at: ${note.createdAt}`;

  return (
    <div>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p>{formattedDate}</p>
    </div>
  );
};

export default NoteDetailsWithProp;


