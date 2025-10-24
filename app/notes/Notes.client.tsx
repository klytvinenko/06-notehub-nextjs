'use client'
import { useState } from "react";
import css from "./page.module.css";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

import NoteList from "@/components/NoteList/NoteList";


import SearchBox from "@/components/SearchBox/SearchBox";
import NoteForm from "@/components/NoteForm/NoteForm";
import Modal from "@/components/Modal/Modal";
import { fetchNotes, NoteListData } from "@/lib/api";
import Pagination from "@/components/Pagination/Pagination";


const NotesClient = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isOpenModal, setIsOpenModal] = useState(false);
 const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading } = useQuery<NoteListData>({
    queryKey: ["notes", debouncedSearch, page],
    queryFn: () => fetchNotes(debouncedSearch, page),
    placeholderData: (previousData) => previousData,
  });
  const notes = data?.notes ?? [];
  const total_pages = data?.totalPages ?? 0;
  const onOpen = () => {
    setIsOpenModal(true);
  };
  const onClose = () => {
    setIsOpenModal(false);
  };

const onSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={onSearch} />
        {total_pages > 1 && (
          <Pagination totalPages={total_pages} page={page} setPage={setPage} />
        )}
        <button className={css.button} onClick={onOpen}>
          Create note +
        </button>
      </header>
      {isLoading && <p>Loading...</p>}
      {notes.length > 0 && <NoteList notes={notes || []} />}
      {notes.length === 0  && !isLoading && <p>No notes found</p>}
      {isOpenModal && <Modal onClose={onClose}> 
        <NoteForm onClose={onClose}/>
        </Modal>}
    </div>
  );
};

export default NotesClient;