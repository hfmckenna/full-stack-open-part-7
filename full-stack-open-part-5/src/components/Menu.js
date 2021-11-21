import { Link } from 'react-router-dom'
import { logout } from '../reducers/userReducer'
import React  from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Menu = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  return (
    <nav className="flex uppercase space-x-4 p-4 items-center">
      <Link to="/">home</Link>
      <Link to="/users">users</Link>
      <div>
        <p>{user.name} is logged in</p>
      </div>
      <div>
        <button className='bg-blue-100 rounded p-2 border-2 border-solid border-black' onClick={() => dispatch(logout())}>Logout</button>
      </div>
    </nav>
  )
}

export default Menu
