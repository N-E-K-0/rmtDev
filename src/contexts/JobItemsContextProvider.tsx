import { createContext, useCallback, useMemo, useState } from "react";
import { useSearchQuery, useSearchTextContext } from "../lib/hooks";
import { JobItem, PageDirection, SortBy } from "../lib/types";
import { RESULTS_PER_PAGE } from "../lib/constants";

type JobItemsContextProviderProps = {
  children: React.ReactNode;
};

type JobItemsContextProps = {
  jobItems: JobItem[] | undefined;
  jobItemsSortedAndSliced: JobItem[];
  isLoading: boolean;
  totalNumberOfResults: number;
  totalNumberOfPages: number;
  currentPage: number;
  sortBy: SortBy;
  handleChangePage: (direction: PageDirection) => void;
  handleChangeSortBy: (newSortBy: SortBy) => void;
};

export const JobItemsContext = createContext<JobItemsContextProps | null>(null);

export default function JobItemsContextProvider({
  children,
}: JobItemsContextProviderProps) {
  //dependency context
  const { debouncedSearchText } = useSearchTextContext();

  //state
  const { jobItems, isLoading } = useSearchQuery(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>("relevant");

  //derived state
  const totalNumberOfResults = jobItems?.length || 0;
  const totalNumberOfPages = totalNumberOfResults / RESULTS_PER_PAGE;

  //create a new array and then sort it
  const jobItemsSorted = useMemo(
    () =>
      [...(jobItems || [])]?.sort((a, b) => {
        if (sortBy === "relevant") {
          return b.relevanceScore - a.relevanceScore;
        } else {
          return a.daysAgo - b.daysAgo;
        }
      }),
    [sortBy, jobItems]
  );

  //slicing the array to show 7 items in each pages
  const jobItemsSortedAndSliced = useMemo(
    () =>
      jobItemsSorted.slice(
        currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
        currentPage * RESULTS_PER_PAGE
      ),
    [currentPage, jobItemsSorted]
  );

  //event handlers
  //using useCallback to memoize the function
  const handleChangePage = useCallback((direction: PageDirection) => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "previous") {
      setCurrentPage((prev) => prev - 1);
    }
  }, []);

  //using useCallback to memoize the function
  const handleChangeSortBy = useCallback((newSortBy: SortBy) => {
    setCurrentPage(1);
    setSortBy(newSortBy);
  }, []);

  //we separate and memoize the context value from below to directly invoking it to the context, because we can avoid rerendering of react component depending on this context
  const contextValue = useMemo(
    () => ({
      jobItems,
      jobItemsSortedAndSliced,
      isLoading,
      totalNumberOfResults,
      totalNumberOfPages,
      currentPage,
      sortBy,
      handleChangePage,
      handleChangeSortBy,
    }),
    [
      jobItems,
      jobItemsSortedAndSliced,
      isLoading,
      totalNumberOfResults,
      totalNumberOfPages,
      currentPage,
      sortBy,
      handleChangePage,
      handleChangeSortBy,
    ]
  );

  return (
    //separate this from directly invoking here

    // <JobItemsContext.Provider value={{
    //   jobItems,
    //   jobItemsSortedAndSliced,
    //   isLoading,
    //   totalNumberOfResults,
    //   totalNumberOfPages,
    //   currentPage,
    //   sortBy,
    //   handleChangePage,
    //   handleChangeSortBy,
    // }}>

    <JobItemsContext.Provider value={contextValue}>
      {children}
    </JobItemsContext.Provider>
  );
}
