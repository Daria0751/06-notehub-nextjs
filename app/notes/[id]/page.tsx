import { getNotes } from '../../../lid/api';
import { getSingleNote } from '../../../lid/api'; 
import React from 'react'


type Props = {
  params: Promise<{ id: string }>;
};

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;
  const note = await getSingleNote(id);
  console.log(note);

  return <div>NoteDetails</div>;
};

export default NoteDetails;

  