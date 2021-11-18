import React, { useState } from 'react'
import blogs from '../services/blogs'

const CreateBlog = ({ user, setBlogs }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
    likes: 0,
    user: user
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleBlogChange = (event) => {
    const { name, value } = event.target
    setNewBlog((existingBlog) => ({ ...existingBlog, [name]: value }))
  }

  const submitBlog = async (e) => {
    e.preventDefault()
    try {
      const response = await blogs.create(newBlog, user.token)
      setSuccessMessage('Blog Added')
      setBlogs((existingBlogs) => [
        ...existingBlogs,
        { ...newBlog, id: response.id }
      ])
      setNewBlog({
        title: '',
        author: '',
        url: '',
        likes: 0,
        user: user
      })
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (e) {
      setErrorMessage(e.message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Create new blog</h2>
      {errorMessage && <h3 style={{ color: 'red' }}>{errorMessage}</h3>}
      {successMessage && <h3 style={{ color: 'green' }}>{successMessage}</h3>}
      <form onSubmit={submitBlog}>
        <div>
          <label htmlFor="create-title">title:</label>
          <input
            id={'create-title'}
            name="title"
            onChange={handleBlogChange}
            type="text"
            value={newBlog.title}
          />
        </div>
        <div>
          <label htmlFor="create-author">author:</label>
          <input
            id={'create-author'}
            name="author"
            onChange={handleBlogChange}
            type="text"
            value={newBlog.author}
          />
        </div>
        <div>
          <label htmlFor="create-url">url:</label>
          <input
            id={'create-url'}
            name="url"
            onChange={handleBlogChange}
            type="text"
            value={newBlog.url}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default CreateBlog
