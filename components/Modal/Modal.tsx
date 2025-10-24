'use client'
import { useEffect } from "react";
//mport NoteForm from "../NoteForm/NoteForm";
import css from "./Modal.module.css";
import { createPortal } from "react-dom";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}
const Modal = ({ onClose,children }: ModalProps) => {
  const handleBackdropClick = (
    event: React.MouseEvent<HTMLDivElement>
  ): void => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) : void => {
      if(event.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener('keydown' , handleKeyDown);
      const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown",handleKeyDown);
      document.body.style.overflow = originalOverflow;
    }
  }, [onClose])

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        {children}
        {/* <NoteForm onClose={onClose} /> */}
      </div>
    </div>,
    document.getElementById("modal")!
  );
};

export default Modal;