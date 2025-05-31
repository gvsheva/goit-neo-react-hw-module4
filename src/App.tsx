import { useEffect, useState } from "react";
import { useImageSearchAPI } from "./context/ImageSearchAPI";
import css from "./App.module.css";
import type { ImageSearchItem } from "./model";
import ImageGallery from "./components/ImageGallery";
import ImageModal from "./components/ImageModal";
import LoadMoreBtn from "./components/LoadMoreBtn";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import SearchBar from "./components/SearchBar";

function App() {
  const [items, setItems] = useState<ImageSearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState(-1);
  const [query, setQuery] = useState("");
  const handleSearch = (value: string) => {
    setPage(0);
    setItems([]);
    setQuery(value);
    if (!value.trim()) {
      setError("The search query cannot be empty.");
    }
  };
  const { searchPhotos } = useImageSearchAPI();
  const doSearchPhotos = async () => {
    try {
      setLoading(true);
      const result = await searchPhotos({
        query: query,
        page: page + 1,
        perPage: 20,
      });
      setItems([...items, ...result.items]);
      setPage(page + 1);
    } catch (err) {
      setError(`${err}`);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    (async () => {
      if (!query.trim()) {
        return;
      }
      await doSearchPhotos();
    })();
  }, [query]);
  const [itemIndex, setItemIndex] = useState(-1);
  const [openModal, setOpenModal] = useState(false);
  const handleItemSelect = ({ index }: { index: number }) => {
    setItemIndex(index);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setItemIndex(-1);
    setOpenModal(false);
  };
  return (
    <div className={css.app}>
      <header>
        <SearchBar onSearch={handleSearch} />
      </header>
      <main>
        <ImageGallery items={items} onSelect={handleItemSelect} />
        <ImageModal
          items={items}
          index={itemIndex}
          open={openModal}
          onPrevious={() => setItemIndex(itemIndex - 1)}
          onNext={() => setItemIndex(itemIndex + 1)}
          onClose={handleCloseModal}
        />
        {loading && (
          <div className={css.loaderContainer}>
            <Loader />
          </div>
        )}
        {items.length > 0 && !loading && (
          <div className={css.loadMoreContainer}>
            <LoadMoreBtn onClick={doSearchPhotos} />
          </div>
        )}
        {error && <ErrorMessage message={error} onClose={() => setError("")} />}
      </main>
    </div>
  );
}

export default App;
