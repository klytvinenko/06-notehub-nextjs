import axios from "axios";
import type { Note, NewNote } from "../types/note";
import { error } from "console";

const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
export interface NoteListData {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  search: string,
  page: number
): Promise<NoteListData> => {
  try {
    const res = await axios.get<NoteListData>(
      `https://notehub-public.goit.study/api/notes`,
      {
        params: {
          search,
          page,
          perPage: 12,
          sortBy: "created",
        },
        headers: {
          Authorization: `Bearer ${myKey}`,
        },
      }
    );
    const result = res.data;
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return { notes: [], totalPages: 0 };
  }
};

export const createNote = async (values: NewNote): Promise<Note | null> => {
  try {
    const res = await axios.post<Note>(
      `https://notehub-public.goit.study/api/notes`,
      values,
      {
        headers: {
          Authorization: `Bearer ${myKey}`,
        },
      }
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteNote = async (noteId: string): Promise<Note | null> => {
  try {
    const res = await axios.delete<Note>(
      `https://notehub-public.goit.study/api/notes/${noteId}`,
      {
        headers: {
          Authorization: `Bearer ${myKey}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchNoteById = async (id: string): Promise<Note | null> => {
  try {
    const res = await axios.get<Note>(
      `https://notehub-public.goit.study/api/notes/${id}`,
      {
        headers: {
          Authorization: `Bearer ${myKey}`,
        },
      }
    );
    return res.data
  } catch (error) {
    console.log(error);
    return null;
  }
};
