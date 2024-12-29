import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import styles from './PostList.module.css'


export default function PostList({ data, owner, repo }) {
  const [rawData, setRawData] = useState([])

  async function fetchRawData(owner, repo, fileName) {
    const response = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/refs/heads/main/${fileName}`)
    return await response.text()
  }

  useEffect(() => {
  	async function fetchAllData() {
    	const content = await Promise.all(
        data.map((item) => fetchRawData(owner, repo, item.name))
      );
      setRawData(content);
    }

    if (data.length > 0) {
    	fetchAllData();
    }
  }, [data, owner, repo]);

  return (
    <>
      {data.map((item, index) => (
        <Link key={index} className={styles.postListItem} to={`/${item.path}`}>
          <div className={styles.postListTextContainer}>
            <h2 className={styles.postListTitle}>{item.name}</h2>
            <p className={styles.postListContent}>
              {rawData[index] !== undefined ? `${rawData[index].slice(0, 350)}...` : "Loading..."}
            </p>
          </div>
        </Link>
      ))}
    </>
  )
}
