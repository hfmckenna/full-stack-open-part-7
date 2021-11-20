import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { useParams } from 'react-router-dom'

const Blog = () => {
  const dispatch = useDispatch()

  const id = useParams().id

  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const blog = blogs.find((n) => {
    return n.id === id
  })

  console.log(blog)

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

  return (
    <div
      className={'post-info'}
      style={{ border: '2px solid black', marginBottom: '8px' }}
    >
      <p>
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
    </div>
  )
}

export default Blog
