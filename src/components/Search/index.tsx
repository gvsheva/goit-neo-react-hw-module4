import { FaSearch } from "react-icons/fa";
import css from "./Search.module.css";

interface SearchProps {
  value?: string;
  onChange?: (value: string) => void;
}

export default function Search({ value, onChange }: SearchProps) {
  const handleSearch = (value: string) => {
    if (onChange) {
      onChange(value);
    }
  };
  return (
    <div className={css.searchContainer}>
      <FaSearch className={css.searchIcon} />
      <input
        type="search"
        value={value}
        onChange={({ currentTarget }) => handleSearch(currentTarget.value)}
        className={css.search}
      />
    </div>
  );
}
