import css from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({
  disabled = false,
  onClick,
}: {
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      className={css.loadmore}
      disabled={disabled}
      onClick={onClick}
    >
      Load more...
    </button>
  );
}
