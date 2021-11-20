import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import Login from './components/Login'
import CreateBlog from './components/CreateBlog'
import Toggalable from './components/Toggalable'
import { initializeBlogs } from './reducers/blogReducer'
import { logout } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const blogFormRef = useRef()
  const loginFormRef = useRef()

  if (user === null) {
    return (
      <>
        <h2>Log in to blogs</h2>
        <Toggalable buttonLabel={'login'} ref={loginFormRef}>
          <Login />
        </Toggalable>
      </>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <div>
        <p>{user.name} is logged in</p>
        <button onClick={() => dispatch(logout())}>Logout</button>
      </div>
      <Toggalable buttonLabel={'create new blog'} ref={blogFormRef}>
        <CreateBlog user={user} />
      </Toggalable>
      <div>
        {blogs
          .sort((a, b) => a.likes < b.likes)
          .map((blog) => (
            <Blog key={blog.id} blog={blog} user={user} />
          ))}
      </div>
    </div>
  )
}

export default App
