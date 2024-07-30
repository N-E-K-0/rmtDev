import { createContext } from "react";
import { useJobItems, useLocalStorage } from "../lib/hooks";
import { JobItemExpanded } from "../lib/types";

type BookmarksContextProviderProps = {
  children: React.ReactNode;
};

type BookmarksContextProps = {
  bookmarkedIds: number[];
  handleToggleBookmark: (id: number) => void;
  bookmarkedJobItems: JobItemExpanded[];
  isLoading: boolean;
};

export const BookmarksContext = createContext<BookmarksContextProps | null>(
  null
);

export default function BookmarksContextProvider({
  children,
}: BookmarksContextProviderProps) {
  const [bookmarkedIds, setBookmarkedIds] = useLocalStorage<number[]>(
    "bookmarkedIds",
    []
  );

  const { jobItems: bookmarkedJobItems, isLoading } =
    useJobItems(bookmarkedIds);

  const handleToggleBookmark = (id: number) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds((prev) => prev.filter((item) => item !== id));
    } else {
      setBookmarkedIds((prev) => [...prev, id]);
    }
  };

  const contextValue = {
    bookmarkedIds,
    handleToggleBookmark,
    bookmarkedJobItems,
    isLoading,
  };

  return (
    <BookmarksContext.Provider value={contextValue}>
      {children}
    </BookmarksContext.Provider>
  );
}
