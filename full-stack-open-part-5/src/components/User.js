import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const Users = () => {
  const id = useParams().id

  const blogs = useSelector((state) => state.blogs)

  const blogsByUser = blogs.filter((n) => {
    return n.user.id === id
  })

  const user = blogs.find((n) => {
    return n.user.id === id
  })

  return (
    <div>
      <h2>{user.user.name}</h2>
      {blogsByUser.map(({ id, title }, i) => {
        return <li key={i}>{title}</li>
      })}
    </div>
  )
}

export default Users
