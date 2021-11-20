import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const [blogDetailDisplay, setBlogDetailDisplay] = useState(false)

  const toggleView = () => {
    setBlogDetailDisplay((current) => !current)
  }

  const addLike = async () => {
    const newLikes = blog.likes + 1
    try {
      dispatch(likeBlog(blog.id, newLikes, user.token))
    } catch (e) {
      console.error(e)
    }
  }

  const remove = async () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.user.name}?`)) {
      try {
        dispatch(deleteBlog(blog.id, user.token))
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
            <button onClick={remove}>Remove</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog
