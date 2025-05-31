import classnames from "classnames";
import type { ImageSearchItem } from "../../model";
import css from "./ImageModal.module.css";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import { useClickAway } from "react-use";
import { useRef } from "react";

interface ImageModalProps {
  open: boolean;
  items: ImageSearchItem[];
  index: number;
  onPrevious?: () => void;
  onNext?: () => void;
  onClose?: () => void;
}
export default function ImageModal({
  open = false,
  items = [],
  index,
  onPrevious,
  onNext,
  onClose,
}: ImageModalProps) {
  const current = (index >= 0 && items[index]) || null;
  const backingRef = useRef(null);
  useClickAway(backingRef, () => {
    if (onClose) {
      onClose();
    }
  });
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className={classnames(css.modal, { [css.open]: open })}>
      <div className={css.backing} ref={backingRef}>
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
      </div>
    </div>
  );
}
