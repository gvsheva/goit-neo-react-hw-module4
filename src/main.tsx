import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import "./css-reset.css";
import App from "./App.tsx";
import AccessKeyProvider from "./context/AccessKey/index.tsx";
import ImageSearchAPIProvider from "./context/ImageSearchAPI/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AccessKeyProvider>
      <ImageSearchAPIProvider>
        <App />
      </ImageSearchAPIProvider>
    </AccessKeyProvider>
  </StrictMode>,
);
