'use client';

import React from 'react';
import { Note } from '../../../lid/api';

type Props = {
  note: Note;
};

const NoteDetailsClient = ({ note }: Props) => {
  return (
    <section>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
    </section>
  );
};

export default NoteDetailsClient;
