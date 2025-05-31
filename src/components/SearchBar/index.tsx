import { FaSearch } from "react-icons/fa";
import css from "./SearchBar.module.css";
import { useState, type FormEvent } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}
export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };
  return (
    <div className={css.searchbar}>
      <form className={css.searchform} onSubmit={handleSubmit}>
        <button type="submit">
          <FaSearch className={css.icon} />
        </button>
        <input
          type="search"
          value={query}
          name="query"
          onChange={(e) => setQuery(e.target.value)}
          className={css.search}
        />
      </form>
    </div>
  );
}
