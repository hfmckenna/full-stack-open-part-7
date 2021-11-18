import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import CreateBlog from './components/CreateBlog'
import Toggalable from './components/Toggalable'
import blogService from './services/blogs'

const App = () => {
  const fetchUserStorage = () => {
    return JSON.parse(localStorage.getItem('userData'))
  }

  const setUserStorage = (user) => {
    localStorage.setItem('userData', JSON.stringify(user))
  }

  const destroyUser = () => {
    setUser(null)
    localStorage.removeItem('userData')
  }

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(fetchUserStorage())

  const blogFormRef = useRef()
  const loginFormRef = useRef()

  useEffect(() => {
    const fetchBlogs = async () => {
      const latestBlogs = await blogService.getAll()
      setBlogs(latestBlogs)
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    setUserStorage(user)
  }, [user])

  if (user === null) {
    return (
      <>
        <h2>Log in to blogs</h2>
        <Toggalable buttonLabel={'login'} ref={loginFormRef}>
          <Login setUser={setUser} />
        </Toggalable>
      </>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <div>
        <p>{user.name} is logged in</p>
        <button onClick={destroyUser}>Logout</button>
      </div>
      <Toggalable buttonLabel={'create new blog'} ref={blogFormRef}>
        <CreateBlog user={user} setBlogs={setBlogs} />
      </Toggalable>
      <div>
        {blogs
          .sort((a, b) => a.likes < b.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              setBlogs={setBlogs}
            />
          ))}
      </div>
    </div>
  )
}

export default App
