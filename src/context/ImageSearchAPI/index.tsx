import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useAccessKey } from "../AccessKey";
import axios from "axios";
import type { ImageSearchItem } from "../../model";

type ImageSearchResult = {
  total: number;
  total_pages: number;
  items: ImageSearchItem[];
};

interface ImageSearchAPI {
  searchPhotos: ({
    query,
    page,
    perPage,
  }: {
    query: string;
    page: number;
    perPage: number;
  }) => Promise<ImageSearchResult>;
}

const defaultAPI: ImageSearchAPI = {
  searchPhotos: async () => {
    throw new Error("ImageSearchAPI not initialized");
  },
};

const context = createContext<ImageSearchAPI>(defaultAPI);

export const useImageSearchAPI = () => useContext(context);

export default function ImageSearchAPIProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [accessKey] = useAccessKey();
  const { get } = useMemo(() => {
    return axios.create({
      baseURL: "https://api.unsplash.com",
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
    });
  }, [accessKey]);
  const searchPhotos = async ({
    query,
    page = 0,
    perPage = 20,
  }: {
    query: string;
    page: number;
    perPage: number;
  }) => {
    const { data } = await get("/search/photos", {
      params: {
        query,
        page,
        per_page: perPage,
      },
    });
    return {
      total: data.total,
      total_pages: data.total_pages,
      items: data.results.map((item: any) => ({
        id: item.id,
        description: item.description || item.alt_description || "",
        urls: {
          small: item.urls.small,
          regular: item.urls.regular,
          thumbnail: item.urls.thumb,
        },
        links: {
          download: item.links.download,
        },
      })),
    };
  };

  return (
    <context.Provider value={{ searchPhotos }}>{children}</context.Provider>
  );
}
