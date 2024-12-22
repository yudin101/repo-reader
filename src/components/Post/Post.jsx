import { Link, useParams } from 'react-router-dom'
import Header from './../Header.jsx'
import { changeDateFormat } from './../PostList/PostList.jsx'
import styles from './Post.module.css'

export default function Post({ data }) {
	const { id } = useParams()
	const item = data.find(post => post.id === parseInt(id))

	return (
		<>
			<Header />
			<div className={styles.postBody}>
				<Link className={styles.goBackButton} to="/">Go Back</Link>
				<h2>{item.title}</h2>
				<h5 className={styles.postMetadata}>{changeDateFormat(item.date)} | {item.author}</h5>
				<p>{item.content}</p>
			</div>
		</>
	)
}
