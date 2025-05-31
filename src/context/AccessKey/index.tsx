import { createContext, useContext, type ReactNode } from "react";

const context = createContext<string>("");

export const useAccessKey = () => useContext(context);

export default function AccessKeyProvider({
  children,
}: {
  children: ReactNode;
}) {
  const accessKey = import.meta.env.VITE_ACCESS_KEY;
  return <context.Provider value={accessKey}>{children}</context.Provider>;
}
