import { createContext } from "react";
import { useActiveId } from "../lib/hooks";

type ActiveIdContextProviderProps = {
  children: React.ReactNode;
};

type ActiveIdContextProps = {
  activeId: number | null;
};

export const ActiveIdContext = createContext<ActiveIdContextProps | null>(null);

export default function ActiveIdContextProvider({
  children,
}: ActiveIdContextProviderProps) {
  const activeId = useActiveId();

  const contextValue = {
    activeId,
  };

  return (
    <ActiveIdContext.Provider value={contextValue}>
      {children}
    </ActiveIdContext.Provider>
  );
}
