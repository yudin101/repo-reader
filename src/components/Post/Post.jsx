import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from './Post.module.css'

export default function Post({ data, owner, repo }) {
	const { path } = useParams()

	const item = data.find(post => {
    return post.path === String(path);
	});

	const [rawContent, setRawContent] = useState(null)

	useEffect(() => {
		async function fetchRawContent(owner, repo, fileName) {
			const response = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/refs/heads/main/${fileName}`)
			const data = await response.text()
			setRawContent(data)
		}

		fetchRawContent(owner, repo, item.name)
	}, [])

	if (!item) {
		return <p>Loading...</p>
	}

	return (
		<>
			<div className={styles.postBody}>
				<Link className={styles.goBackButton} to="/">Go Back</Link>
				<h2>{item.name.slice(0, -4)}</h2>
				<h5 className={styles.postMetadata}>{owner}</h5>
				<p>{rawContent}</p>
			</div>
		</>
	)
}
