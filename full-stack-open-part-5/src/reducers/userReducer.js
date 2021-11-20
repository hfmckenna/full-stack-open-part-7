import loginService from '../services/login'
import { loadState } from '../localstorage'

export const initUser = () => {
  return (dispatch) => {
    const user = loadState()
    dispatch({
      type: 'init',
      data: user
    })
  }
}

export const login = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials)
    dispatch({
      type: 'login',
      data: user
    })
  }
}

export const logout = () => {
  return (dispatch) => {
    dispatch({
      type: 'logout'
    })
  }
}

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'login':
      return action.data
    case 'logout':
      return null
    case 'init':
      return action.data
    default:
      return state
  }
}

export default reducer
