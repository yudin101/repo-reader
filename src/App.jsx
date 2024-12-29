import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Post from './components/Post/Post.jsx'
import PostList from './components/PostList/PostList.jsx'
import Header from './components/Header.jsx'

export default function App() {
  const [repoUrl, setRepoUrl] = useState("https://github.com/yudin101/sample-blog-data")	
  const [apiData, setApiData] = useState(null)
  const [owner, setOwner] = useState(null)
  const [repo, setRepo] = useState(null)


  function extractRepoDetails(repoUrl) {
    const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/)
    return match ? [match[1], match[2]] : []			
  }

  async function main(repoUrl) {
    const [repoOwner, repoName] = extractRepoDetails(repoUrl)
    setOwner(repoOwner)
    setRepo(repoName)
		
    const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents`)
    const data = await response.json()
    setApiData(data)
  }

  function handleSubmit(e) {
    e.preventDefault()		
    main(repoUrl)
  }

  useEffect(() => {
    main(repoUrl) 
  }, [])

  if (!apiData) {
    return <p>Loading...</p>
  }

  return (
    <>
      <Router>
        <Header />
        <form className='urlForm' onSubmit={handleSubmit}>
          <input
            className='urlInput' 
            type='url' 
            placeholder='Enter URL' 
            required
            onChange={(e) => setRepoUrl(e.target.value)}
          />
          <input
            className='urlSubmitButton' 
            type='submit' 
            value='Fetch' 
          />
        </form>
        <Routes>
          <Route path="/repo-reader/" element={<PostList data={apiData} owner={owner} repo={repo} />} />
          <Route path="/repo-reader/:path" element={<Post data={apiData} owner={owner} repo={repo} />} />
        </Routes>
      </Router>	
    </>
  )
}
