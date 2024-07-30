import { createContext, useState } from "react";
import { useDebounce } from "../lib/hooks";

type SearchTextContextProviderProps = {
  children: React.ReactNode;
};

type SearchTextContextProps = {
  searchText: string;
  debouncedSearchText: string;
  handleChangeSearchText: (newSearchText: string) => void;
};

export const SearchTextContext = createContext<SearchTextContextProps | null>(
  null
);

export default function SearchTextContextProvider({
  children,
}: SearchTextContextProviderProps) {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);

  const handleChangeSearchText = (newSearchText: string) => {
    setSearchText(newSearchText);
  };

  const contextValue = {
    searchText,
    debouncedSearchText,
    handleChangeSearchText,
  };

  return (
    <SearchTextContext.Provider value={contextValue}>
      {children}
    </SearchTextContext.Provider>
  );
}
