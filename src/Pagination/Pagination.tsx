import { Dispatch, SetStateAction, useState } from "react";
import "./Pagination.css";

const Pagination: React.FC<{
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  max: number | undefined;
  isLoading: boolean;
}> = ({ page, setPage, max, isLoading }) => {
  const [offset, setOffset] = useState(0);
  const handleNumClick = (i: number) => {
    setPage(i + 1 + offset);
  };
  const handleDirClick = ({
    target: { name, value },
  }: MouseEvent<HTMLButtonElement>) => {
    if (name === "prev") {
      if (page - offset === 1) setOffset((prev) => prev - 1);
      setPage((prev) => prev - 1);
    } else {
      if (page === 5 + offset) setOffset((prev) => prev + 1);
      setPage((prev) => prev + 1);
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
