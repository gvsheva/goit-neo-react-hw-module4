import { useEffect, useId, useState } from "react";
import { useDebounce, useLocalStorage, useSearchParam } from "react-use";
import { useAccessKey } from "./context/AccessKey";
import { useImageSearchAPI } from "./context/ImageSearchAPI";
import qs from "query-string";
import css from "./App.module.css";
import type { ImageSearchItem } from "./model";
import ImageGallery from "./components/ImageGallery";
import ImageModal from "./components/ImageModal";
import LoadMoreBtn from "./components/LoadMoreButton";
import Loader from "./components/Loader";
import Search from "./components/Search";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const [items, setItems] = useState<ImageSearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState(-1);
  const [perPage, setPerPage] = useLocalStorage("per-page", 20);
  const [accessKey, setAccessKey] = useAccessKey();
  const [query, setQuery] = useState(useSearchParam("q") || "");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const handleSearch = (value: string) => {
    setQuery(value);
  };
  useDebounce(
    () => {
      setPage(0);
      setItems([]);
      setDebouncedQuery(query);
    },
    1000,
    [query],
  );
  const { searchPhotos } = useImageSearchAPI();
  const doSearchPhotos = async () => {
    try {
      setLoading(true);
      const result = await searchPhotos({
        query: debouncedQuery,
        page: page + 1,
        perPage: perPage || 20,
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
      if (!debouncedQuery.trim()) {
        return;
      }
      await doSearchPhotos();
    })();
  }, [debouncedQuery]);
  useEffect(() => {
    const p = qs.parse(location.search);
    if (debouncedQuery) {
      p.q = debouncedQuery;
    } else {
      delete p.q;
    }
    history.pushState({}, "", location.pathname + "?" + qs.stringify(p));
  }, [debouncedQuery]);
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
  const accessKeyFID = useId();
  const perPageFID = useId();
  return (
    <div className={css.app}>
      <header>
        <div className={css.topbar}>
          <Search value={query} onChange={handleSearch} />
          <label htmlFor={perPageFID}>Per page:</label>
          <input
            id={perPageFID}
            type="number"
            min="10"
            max="50"
            value={perPage}
            onChange={({ currentTarget }) =>
              setPerPage(parseInt(currentTarget.value))
            }
            className={css.perPage}
          />
          <label htmlFor={accessKeyFID}>Access Key:</label>
          <input
            id={accessKeyFID}
            type="text"
            value={accessKey}
            onChange={({ currentTarget }) => setAccessKey(currentTarget.value)}
            className={css.accesskey}
          />
        </div>
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
