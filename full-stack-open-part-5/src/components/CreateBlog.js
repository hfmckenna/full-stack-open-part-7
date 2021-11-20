import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import Notification from './Notification'

const CreateBlog = ({ user }) => {
  const dispatch = useDispatch()

  const notification = useSelector((state) => state.notification)
  const initialBlog = {
    title: '',
    author: '',
    url: '',
    likes: 0,
    user: user
  }
  const [newBlog, setNewBlog] = useState(initialBlog)

  const handleBlogChange = (event) => {
    const { name, value } = event.target
    setNewBlog((existingBlog) => ({ ...existingBlog, [name]: value }))
  }

  const submitBlog = async (e) => {
    e.preventDefault()
    try {
      dispatch(createBlog(newBlog, user.token))
      setNewBlog(initialBlog)
      dispatch(setNotification('Blog Added', 5000, true))
    } catch (e) {
      dispatch(setNotification('Error', 5000, false))
    }
  }

  return (
    <div>
      <h2>Create new blog</h2>
      {notification.message && <Notification notification={notification} />}
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
