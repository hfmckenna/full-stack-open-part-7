import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'

const Login = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [loginError, setLoginError] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(login({ username, password }))
      setUsername('')
      setPassword('')
    } catch (exception) {
      setLoginError('Wrong Credentials')
      setTimeout(() => {
        setLoginError(null)
      }, 5000)
    }
  }

  return (
    <div>
      {loginError && <h3>{loginError}</h3>}
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            className="border-solid border-2"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className="">
          password
          <input
            type="password"
            value={password}
            name="Password"
            className="border-solid border-2 border-black"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button className="border-solid border-2 border-black" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default Login
