import { getSingleNote } from '../../../lid/api'; 
import NoteDetailsClient from './NoteDetails.client';
import React from 'react';

type Props = {
  params: { id: string };
};

const NoteDetails = async ({ params }: Props) => {
  const { id } = params;

  const note = await getSingleNote(id);

  if (!note) {
    return <p>Note not found</p>;
  }

  return <NoteDetailsClient note={note} />;
};

export default NoteDetails;


  