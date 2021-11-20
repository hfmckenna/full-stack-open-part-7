import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blogs from './components/Blogs'
import Login from './components/Login'
import CreateBlog from './components/CreateBlog'
import Toggalable from './components/Toggalable'
import { initializeBlogs } from './reducers/blogReducer'
import { logout } from './reducers/userReducer'
import { Link, Route, Switch } from 'react-router-dom'
import User from './components/User'
import Users from './components/Users'
import BlogInfo from './components/BlogInfo'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

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
      <Link to="/">
        home
      </Link>
      <Link to="/users">
        users
      </Link>
      <div>
        <p>{user.name} is logged in</p>
        <button onClick={() => dispatch(logout())}>Logout</button>
      </div>
      <Toggalable buttonLabel={'create new blog'} ref={blogFormRef}>
        <CreateBlog user={user} />
      </Toggalable>
      <Switch>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/blogs/:id">
          <BlogInfo />
        </Route>
        <Route path="/">
          <Blogs />
        </Route>
      </Switch>
    </div>
  )
}

export default App
