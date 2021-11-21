import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Toggalable from './components/Toggalable'
import { initializeBlogs } from './reducers/blogReducer'
import { Route, Switch } from 'react-router-dom'
import Blog from './components/Blog'
import User from './components/User'
import Users from './components/Users'
import Menu from './components/Menu'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const user = useSelector((state) => state.user)

  const loginFormRef = useRef()

  if (user === null) {
    return (
      <>
        <h2 className="uppercase">Log in to blogs</h2>
        <Toggalable buttonLabel={'login'} ref={loginFormRef}>
          <Login />
        </Toggalable>
      </>
    )
  }
  return (
    <div>
      <h2 className="uppercase">blogs</h2>
      <Menu />
      <Switch>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/blogs/:id">
          <Blog />
        </Route>
        <Route path="/">
          <Blogs />
        </Route>
      </Switch>
    </div>
  )
}

export default App
