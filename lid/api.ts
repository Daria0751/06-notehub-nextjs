import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { Note } from '../types/note'; 

export type NoteListResponse = {
  notes: Note[];
  total: number;
};

axios.defaults.baseURL = "https://next-docs-api.onrender.com";

export const getNotes = async () => {
  const res = await axios.get<NoteListResponse>("/notes");
  return res.data;
};

export const getSingleNote = async (id: string) => {
  const res = await axios.get<Note>(`/notes/${id}`);
  return res.data;
};

const BASE_URL = 'https://notehub-public.goit.study/api';
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

if (!TOKEN) {
  throw new Error('NoteHub API token is missing in environment variables.');
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  search: string,
  page: number
): Promise<FetchNotesResponse> => {
  try {
    const response: AxiosResponse<{
      notes: Note[];
      totalPages: number;
    }> = await axiosInstance.get('/notes', {
      params: {
        search: typeof search === 'string' && search.trim() !== '' ? search.trim() : undefined,
        page,
        perPage: 12,
      },
    });

    return {
      notes: response.data.notes, 
      totalPages: response.data.totalPages,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error fetching notes:', error.response?.status, error.response?.data);
    } else {
      console.error('Unknown error fetching notes:', error);
    }
    throw new Error('Failed to fetch notes.');
  }
};

export const createNote = async ({
  title,
  content,
  tag,
}: {
  title: string;
  content?: string;
  tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
}): Promise<Note> => {
  try {
    const response: AxiosResponse<Note> = await axiosInstance.post('/notes', {
      title,
      content,
      tag,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error creating note:', error.response?.status, error.response?.data);
    } else {
      console.error('Unknown error creating note:', error);
    }
    throw new Error('Failed to create note.');
  }
};

export const deleteNote = async (id: string): Promise<Note> => {
  try {
    const response: AxiosResponse<Note> = await axiosInstance.delete(`/notes/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error deleting note:', error.response?.status, error.response?.data);
    } else {
      console.error('Unknown error deleting note:', error);
    }
    throw new Error('Failed to delete note.');
  }
};

