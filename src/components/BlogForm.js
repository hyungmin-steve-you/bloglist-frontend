import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const blog = {
      title,
      author,
      url
    }
    await createBlog(blog)
    console.log('after create blog')
    setTitle('')
    console.log('after set title')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input type='text' value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author
          <input type='text' value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url
          <input type='text' value={url} onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm