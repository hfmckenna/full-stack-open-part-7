import { Link } from 'react-router-dom'
import { logout } from '../reducers/userReducer'
import Toggalable from './Toggalable'
import CreateBlog from './CreateBlog'
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Menu = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const blogFormRef = useRef()

  return (
    <nav>
      <Link to="/">home</Link>
      <Link to="/users">users</Link>
      <div>
        <p>{user.name} is logged in</p>
        <button onClick={() => dispatch(logout())}>Logout</button>
      </div>
      <Toggalable buttonLabel={'create new blog'} ref={blogFormRef}>
        <CreateBlog user={user} />
      </Toggalable>
    </nav>
  )
}

export default Menu
