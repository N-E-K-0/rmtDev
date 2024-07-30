import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useBooksmarksContext } from "../lib/hooks";

type BookmarkIconProps = {
  id: number;
};

export default function BookmarkIcon({ id }: BookmarkIconProps) {
  const { bookmarkedIds, handleToggleBookmark } = useBooksmarksContext();

  return (
    <button
      onClick={(event) => {
        handleToggleBookmark(id);
        event.stopPropagation();
        event.preventDefault();
      }}
      className="bookmark-btn"
    >
      <BookmarkFilledIcon
        className={`${bookmarkedIds.includes(id) ? "filled" : ""}`}
      />
    </button>
  );
}
