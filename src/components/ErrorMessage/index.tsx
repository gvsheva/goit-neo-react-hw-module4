import { FaExclamationCircle } from "react-icons/fa";
import css from "./ErrorMessage.module.css";
import { useRef } from "react";
import { useClickAway } from "react-use";

interface ErrorMessageProps {
  message: string;
  onClose: () => void;
}

export default function ErrorMessage({ message, onClose }: ErrorMessageProps) {
  const backingRef = useRef(null);
  useClickAway(backingRef, () => {
    onClose();
  });
  return (
    <div className={css.errormessage}>
      <div className={css.backing} ref={backingRef}>
        <button className={css.closeButton} onClick={onClose}>
          &times;
        </button>
        <FaExclamationCircle className={css.icon} />
        <span>{message}</span>
      </div>
    </div>
  );
}
