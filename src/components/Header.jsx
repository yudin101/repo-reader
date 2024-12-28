import { Link } from 'react-router-dom'

export default function Header() {
	const blogNavTitle = {
		"margin": "10px 20px 40px 20px",
		"borderBottom": "1px solid black",
		"color": "#000"
	}

	return (
		<Link to="/" style={{ "textDecoration": "none" }}>
			<h1 style={blogNavTitle}>The Simple Blog</h1>
		</Link>
	)
}
