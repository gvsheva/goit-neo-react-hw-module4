export type ImageSearchItem = {
    id: string;
    description: string;
    urls: {
        small: string;
        regular: string;
        thumbnail: string;
    };
    links: {
        download: string;
    };
};
