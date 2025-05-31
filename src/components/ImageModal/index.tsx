import type { ImageSearchItem } from "../../model";
import Modal from "react-modal";
import css from "./ImageModal.module.css";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

interface ImageModalProps {
  open: boolean;
  items: ImageSearchItem[];
  index: number;
  onPrevious?: () => void;
  onNext?: () => void;
  onClose?: () => void;
}

const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function ImageModal({
  open = false,
  items = [],
  index,
  onPrevious,
  onNext,
  onClose,
}: ImageModalProps) {
  const current = (index >= 0 && items[index]) || null;
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <Modal isOpen={open} onRequestClose={handleClose} style={modalStyle}>
      <div className={css.container}>
        <button type="button" onClick={handleClose} className={css.close}>
          <FaTimes />
        </button>
        <button
          type="button"
          onClick={onPrevious}
          disabled={index <= 0}
          className={css.prev}
        >
          <FaChevronLeft />
        </button>
        <div className={css.imgContainer}>
          {current && (
            <img src={current.urls.regular} alt={current.description} />
          )}
        </div>
        <button
          type="button"
          onClick={onNext}
          disabled={index >= items.length - 1}
          className={css.next}
        >
          <FaChevronRight />
        </button>
      </div>
    </Modal>
  );
}
