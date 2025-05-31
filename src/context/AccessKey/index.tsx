import { createContext, useContext, type ReactNode } from "react";
import { useLocalStorage, useSearchParam } from "react-use";

const context = createContext<[string, (k: string) => void]>(["", () => {}]);

export const useAccessKey = () => useContext(context);

export default function AccessKeyProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [accessKey, setAccessKey] = useLocalStorage<string>(
    "access-key",
    useSearchParam("k") || "",
  );
  return (
    <context.Provider value={[accessKey || "", setAccessKey]}>
      {children}
    </context.Provider>
  );
}
