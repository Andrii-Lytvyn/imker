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
    // console.log('монтируем');
    window.addEventListener("keydown", addKeyDown);
    return () => {
      // console.log('размонтируем');
      window.removeEventListener("keydown", addKeyDown);
    };
  });

  const addKeyDown = (evt: KeyboardEvent) => {
    if (evt.code === "Escape") {
      // console.log('закрить');
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
      <img src={modalImage} alt="" className={css.modal_container} />
    </div>,
    modalRoot as HTMLElement
  );
};

export default Modal;
