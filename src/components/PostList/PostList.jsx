import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PostListButtons from "./PostListButtons";
import styles from "./PostList.module.css";

export default function PostList({ data, owner, repo }) {
  const [rawData, setRawData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  async function fetchRawData(owner, repo, fileName) {
    const response = await fetch(
      `https://raw.githubusercontent.com/${owner}/${repo}/refs/heads/main/${fileName}`,
    );
    return await response.text();
  }

  useEffect(() => {
    async function fetchCurrentPostsData() {
      const startIndex = (currentPage - 1) * postsPerPage;
      const endIndex = startIndex + postsPerPage;
      const visiblePosts = data.slice(startIndex, endIndex);

      const content = await Promise.all(
        visiblePosts.map((item) => fetchRawData(owner, repo, item.name)),
      );

      const newRawData = {};
      visiblePosts.forEach((item, index) => {
        newRawData[item.name] = content[index];
      });

      setRawData((prevData) => ({ ...prevData, ...newRawData }));
    }

    if (data.length > 0) {
      fetchCurrentPostsData();
    }
  }, [currentPage, data, owner, repo]);

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);
  const dataLen = data.length;

  return (
    <>
      {currentPosts.map((item, index) => (
        <Link
          key={index}
          className={styles.postListItem}
          to={`/repo-reader/${item.path}`}
        >
          <div className={styles.postListTextContainer}>
            <h2 className={styles.postListTitle}>{item.name}</h2>
            <p className={styles.postListContent}>
              {rawData[item.name] !== undefined
                ? `${rawData[item.name].slice(0, 350)}...`
                : "Loading..."}
            </p>
          </div>
        </Link>
      ))}

      <PostListButtons
        key={dataLen}
        currentPage={currentPage}
        dataLen={dataLen}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
