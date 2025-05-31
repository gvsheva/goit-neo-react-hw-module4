import type { ImageSearchItem } from "../../model";
import css from "./ImageCard.module.css";

export default function ImageCard({
  item,
  onClick,
}: {
  item: ImageSearchItem;
  onClick: () => void;
}) {
  return (
    <div className={css.card}>
      <a onClick={onClick}>
        <img src={item.urls.small} alt={item.description} />
      </a>
    </div>
  );
}
