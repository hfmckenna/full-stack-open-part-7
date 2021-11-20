import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const blogs = useSelector((state) => state.blogs)
  function getCount(array) {
    var count = {}
    array.forEach(function (a) {
      count[a.user.id] = (count[a.user.id] || 0) + 1
    })
    return Object.keys(count).map(function (k) {
      return { id: k, timesListed: count[k] }
    })
  }

  function getName(id) {
    return blogs.find((blog) => blog.user.id === id)?.user?.name
  }

  const countOfBlogsByUser = getCount(blogs)

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th>-</th>
            <th>blogs created</th>
          </tr>

          {countOfBlogsByUser.map(({ id, timesListed }) => {
            return (
              <tr key={id}>
                <td><Link to={`/users/${id}`}>{getName(id)}</Link></td>
                <td>{timesListed}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Users
