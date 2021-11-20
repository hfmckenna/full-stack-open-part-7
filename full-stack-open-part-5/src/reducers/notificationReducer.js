const notification = {
  message: '',
  time: 5000,
  success: false
}

const initialState = notification

export const setNotification = (message, time, success) => {
  return dispatch => {
    dispatch({
      type: 'changeNotification',
      data: {
        message,
        time,
        success
      }
    })
  }
}

export const clearNotification = () => {
  return dispatch => {
    dispatch({
      type: 'clearNotification'
    })
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'clearNotification':
    return {
      ...state,
      message: '',
      success: ''
    }
  case 'changeNotification':
    return {
      message: action.data.message,
      time: action.data.time,
      success: action.data.success
    }
  default:
    return state
  }
}

export default reducer