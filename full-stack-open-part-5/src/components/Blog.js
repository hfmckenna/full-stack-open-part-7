import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, setBlogs }) => {
  const [blogDetailDisplay, setBlogDetailDisplay] = useState(false)

  const toggleView = () => {
    setBlogDetailDisplay((current) => !current)
  }

  const addLike = async () => {
    const newLikes = blog.likes + 1
    try {
      await blogService.like(blog.id, newLikes, user.token)
      setBlogs((existingBlogs) => {
        const filteredBlogs = existingBlogs.filter(
          (existingBlog) => existingBlog.id !== blog.id
        )
        return [...filteredBlogs, { ...blog, likes: newLikes }]
      })
    } catch (e) {
      console.error(e)
    }
  }

  const deleteBlog = async () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.user.name}?`)) {
      try {
        await blogService.deleteBlog(blog.id, user.token)
        setBlogs((existingBlogs) =>
          existingBlogs.filter((existingBlog) => existingBlog.id !== blog.id)
        )
      } catch (e) {
        console.error(e)
      }
    }
  }

  return (
    <div
      className={'post-info'}
      style={{ border: '2px solid black', marginBottom: '8px' }}
    >
      <p>
        {blog.title} {blog.author}
        <button onClick={toggleView}>view</button>
      </p>
      <div
        style={blogDetailDisplay ? { display: 'inline' } : { display: 'none' }}
      >
        <p>{blog.url}</p>
        <p>
          likes {blog.likes}
          <button onClick={addLike}>like</button>
        </p>
        <p>{blog.user.name}</p>
        {user.username === blog.user.username && (
          <div>
            <button onClick={deleteBlog}>Remove</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog
