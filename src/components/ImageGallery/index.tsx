import type { ImageSearchItem } from "../../model";
import ImageCard from "../ImageCard";
import css from "./ImageGallery.module.css";

interface ImageGalleryProps {
  items: ImageSearchItem[];
  onSelect?: ({
    item,
    index,
  }: {
    item: ImageSearchItem;
    index: number;
  }) => void;
}

export default function ImageGallery({ items, onSelect }: ImageGalleryProps) {
  const handleClick = (index: number) => {
    if (onSelect) {
      onSelect({ item: items[index], index });
    }
  };
  return (
    <ul className={css.gallery}>
      {items.map((i, x) => (
        <li key={i.id}>
          <ImageCard item={i} onClick={() => handleClick(x)} />
        </li>
      ))}
    </ul>
  );
}
