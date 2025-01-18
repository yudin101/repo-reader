import { useEffect, useState } from "react";
import styles from "./PostList.module.css";

export default function PostListButtons({
  currentPage,
  dataLen,
  postsPerPage,
  setCurrentPage,
}) {
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    const newArr = [];

    for (let i = 1; i <= Math.ceil(dataLen / postsPerPage); i++) {
      newArr.push(i);
    }
    setPageNumbers(newArr);
  }, []);

  return (
    <>
      <div className={styles.paginationButtonContainer}>
        <button
          disabled={currentPage <= 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>

        {pageNumbers.map((item) => (
          <button className={currentPage === item ? styles.selectedPage : ''} key={item} onClick={() => setCurrentPage(item)}>
            {item}
          </button>
        ))}

        <button
          disabled={currentPage === pageNumbers.length}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
}
