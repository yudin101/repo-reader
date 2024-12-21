import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Data from './assets/data.js'
import Post from './components/Post/Post.jsx'
import PostList from './components/PostList/PostList.jsx'

export default function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<PostList data={Data} />} />
					<Route path="/:id" element={<Post data={Data} />} />
				</Routes>
			</Router>	
		</>
	)
}
