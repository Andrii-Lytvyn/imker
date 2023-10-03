import { createPortal } from "react-dom";
import css from "./Modal.module.css";
import { MouseEvent, useEffect } from "react";
const modalRoot = document.getElementById("modal-root");

interface IModal {
  modalImage: string | undefined;
  setModalHide: (newValue: boolean) => void;
}

const Modal = ({ setModalHide, modalImage }: IModal): JSX.Element => {
  useEffect(() => {
    window.addEventListener("keydown", addKeyDown);
    return () => {
      window.removeEventListener("keydown", addKeyDown);
    };
  });

  const addKeyDown = (evt: KeyboardEvent) => {
    if (evt.code === "Escape") {
      setModalHide(false);
    }
  };

  const addOverlay = (evt: MouseEvent<HTMLDivElement>) => {
    if (evt.currentTarget === evt.target) {
      setModalHide(false);
    }
  };

  return createPortal(
    <div className={css.overlay} onClick={addOverlay}>
      <img
        src={"https://imker.fra1.cdn.digitaloceanspaces.com/" + modalImage}
        alt={modalImage}
        className={css.modal_container}
        onContextMenu={(e) => e.preventDefault()}
      />
    </div>,
    modalRoot as HTMLElement
  );
};

export default Modal;
