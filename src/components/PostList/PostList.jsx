import { Link } from 'react-router-dom'
import Header from './../Header.jsx'
import styles from './PostList.module.css'

export function changeDateFormat(date) {
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
	
	const currentYear = date.slice(0, 4)
	const currentMonth = months[date.slice(5, 7) - 1];
	const currentDate = date.slice(8)

	return `${currentDate} ${currentMonth}, ${currentYear}`
}


export default function PostList({ data }) {

	return (
		<>
			<Header />
			{data.map(item => (
				<Link key={item.id} className={styles.postListItem} to={`/${item.id}`}>
					<div className={styles.postListMetadata}>
						<p>{changeDateFormat(item.date)}</p>
						<p>{item.author}</p>
					</div>
					<div className={styles.postListTextContainer}>
						<h2 className={styles.postListTitle}>{`${item.id}. ${item.title}`}</h2>
						<p className={styles.postListContent}>{`${item.content.slice(0, 350)}...`}</p>
					</div>
				</Link>
			))}
		</>
	)
}
