import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { type PageDirection } from "../lib/types";
import { useJobItemsContext } from "../lib/hooks";

export default function PaginationControls() {
  const {
    currentPage,
    totalNumberOfPages,
    handleChangePage: onClick,
  } = useJobItemsContext();
  return (
    <section className="pagination">
      {currentPage > 1 && (
        <PaginationButton
          onClick={() => onClick("previous")}
          direction="previous"
          currentPage={currentPage}
        />
      )}
      {currentPage < totalNumberOfPages && (
        <PaginationButton
          onClick={() => onClick("next")}
          direction="next"
          currentPage={currentPage}
        />
      )}
    </section>
  );
}

type PaginationButtonProps = {
  currentPage: number;
  onClick: () => void;
  direction: PageDirection;
};

function PaginationButton({
  onClick,
  direction,
  currentPage,
}: PaginationButtonProps) {
  return (
    <button
      onClick={(e) => {
        onClick();
        e.currentTarget.blur();
      }}
      className={`pagination__button pagination__button--${direction}`}
    >
      {direction === "previous" ? <ArrowLeftIcon /> : <ArrowRightIcon />}
      Page {direction === "previous" ? currentPage - 1 : currentPage + 1}
    </button>
  );
}
