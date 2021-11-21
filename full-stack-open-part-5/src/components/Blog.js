import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog, commentBlog } from '../reducers/blogReducer'
import { useParams } from 'react-router-dom'

const Blog = () => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')
  const id = useParams().id

  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const blog = blogs.find((n) => {
    return n.id === id
  })

  if (!blog) {
    return null
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

  const handleComment = async () => {
    dispatch(commentBlog(blog.id, comment))
  }

  return (
    <div className="p-4 border-solid">
      <p className="p-2">
        {blog.title} {blog.author}
      </p>
      <div>
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
      <h3>comments</h3>
      <div>
        <input
          type="text"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value)
          }}
        />
        <button onClick={handleComment}>Comment Me!</button>
      </div>
      <ul>
        {blog?.comments.map((comment, i) => (
          <li key={`${i}${comment}`}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
