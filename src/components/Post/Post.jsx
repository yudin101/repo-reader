import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import DOMPurify from 'dompurify'
import styles from './Post.module.css'

export default function Post({ data, owner, repo }) {
  const { path } = useParams()

  const item = data.find(post => {
    return post.path === String(path);
  });

  const [rawContent, setRawContent] = useState(null)
  const [rawContentType, setRawContentType] = useState(null)

  useEffect(() => {
    async function fetchRawContent(owner, repo, fileName) {
      const response = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/refs/heads/main/${fileName}`)
      const data = await response.text()

      const extension = fileName.split('.').pop()
      setRawContentType(extension)

      if (extension === 'md') {
        setRawContent(data)
      } else {
        const paragraphs = data.split('\n').map(paragraph => paragraph.trim())
        setRawContent(paragraphs)
      }
    }

    fetchRawContent(owner, repo, item.name)
  }, [])


  if (!item || !rawContent) {
    return <p>Loading...</p>
  }	

  return (
    <>
      <div className={styles.postBody}>
        <Link className={styles.goBackButton} to="/">Back</Link>
        <h2>{item.name}</h2>
        <h5 className={styles.postMetadata}>{owner}</h5>

        {rawContentType !== 'md' && rawContent.map((paragraph, index) => (
          <p key={index}>{paragraph}<br /></p>
        ))}

        {rawContentType === 'md' && 
					<ReactMarkdown 
					  children={DOMPurify.sanitize(rawContent)}
					  skipHtml={true}
					/>
        }
      </div>
    </>
  )
}
