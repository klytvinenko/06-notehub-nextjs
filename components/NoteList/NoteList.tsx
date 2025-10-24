'use client'
import { deleteNote } from "@/lib/api";
import type { Note} from "../../types/note";
import css from "./NoteList.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";


interface NoteListProps {
  notes: Note[];
}

const NoteList = ({ notes }: NoteListProps) => {
   const queryClient = useQueryClient();

  const {mutate} = useMutation ({
    mutationFn: (noteId: string) => deleteNote(noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"]
      })
    }
  })

  const handleDelete = (noteId: string) => {
    mutate(noteId)
  }

  return (
    <ul className={css.list}>
      {notes.map((item) => (
        <li key={item.id} className={css.listItem}>
          <h2 className={css.title}>{item.title}</h2>
          <p className={css.content}>{item.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{item.tag}</span>
            <Link href={`/notes/${item.id}`}>View details</Link>
            <button className={css.button} onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;