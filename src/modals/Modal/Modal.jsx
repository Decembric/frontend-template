import { useEffect } from "react";
import css from "./Modal.module.css";
import { icons as sprite } from "../../../public/icons/index";

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);
  if (!isOpen) {
    return null;
  }
  return (
    <div className={css.modal_backdrop} onClick={onClose}>
      <div className={css.modal_wrapper}>
        <div className={css.modal_content} onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            aria-label="Close modal button"
            className={css.modal_closeBtn}
            onClick={onClose}
          >
            <svg className={css.modal_closeIcon}>
              <use xlinkHref={`${sprite}#close`} />
            </svg>
          </button>

          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
