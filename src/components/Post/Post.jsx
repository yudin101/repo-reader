import { useParams } from 'react-router-dom'

export default function Post({ data }) {
	const { id } = useParams()
	const item = data.find(post => post.id === parseInt(id))

	return (
		<>
			<div>
				<h4>{item.title}</h4>
				<p>{item.content}</p>
			</div>
		</>
	)
}
