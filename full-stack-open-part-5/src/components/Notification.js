import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { clearNotification } from '../reducers/notificationReducer'

const Notification = ({ notification }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(clearNotification())
    }, notification.time)
    return () => {
      clearTimeout(timer)
    }
  }, [notification])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    color: notification.success ? 'green' : 'red'
  }
  return <div style={style}>{notification.message}</div>
}

export default Notification
