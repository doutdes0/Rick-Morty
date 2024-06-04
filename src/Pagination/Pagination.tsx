import { Dispatch, SetStateAction, MouseEvent } from "react";
import "./Pagination.css";

const Pagination: React.FC<{
  page: number;
  offset: number;
  setPagination: Dispatch<SetStateAction<{ page: number; offset: number }>>;
  max: number | undefined;
  isLoading: boolean;
}> = ({ page, offset, setPagination, max, isLoading }) => {
  const handleNumClick = (i: number) => {
    setPagination((prev) => ({ ...prev, page: i + 1 + offset }));
  };
  const handleDirClick = (e: MouseEvent<HTMLButtonElement>) => {
    const { name } = e.target as HTMLButtonElement;
    if (name === "prev") {
      if (page - offset === 1)
        setPagination((prev) => ({ ...prev, offset: prev.offset - 1 }));
      setPagination((prev) => ({ ...prev, page: prev.page - 1 }));
    } else {
      if (page === 5 + offset)
        setPagination((prev) => ({ ...prev, offset: prev.offset + 1 }));
      setPagination((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };
  return (
    <div className="pagination">
      <button
        onClick={handleDirClick}
        name="prev"
        disabled={(max && max < 2) || isLoading || page === 1}
      >
        Prev
      </button>
      {max ? (
        Array(5)
          .fill("")
          .map((_, i) => {
            return (
              <button
                onClick={() => handleNumClick(i)}
                className={page === i + 1 + offset ? "active" : ""}
                disabled={isLoading || i + 1 > max}
              >
                {i + 1 + offset}
              </button>
            );
          })
      ) : (
        <></>
      )}
      <button
        onClick={handleDirClick}
        name="next"
        disabled={(max && max < 2) || isLoading || page === max}
      >
        Next
      </button>
    </div>
  );
};
export default Pagination;
