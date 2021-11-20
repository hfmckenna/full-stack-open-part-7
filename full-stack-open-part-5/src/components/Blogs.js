import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  if (!user) {
    return null
  }
  return (
    <ul>
      {blogs
        .sort((a, b) => a.likes < b.likes)
        .map((blog) => (
          <li key={blog.id} style={{ border: '2px solid black', marginBottom: '8px' }}>
            <Link key={blog.id} to={`/blogs/${blog.id}`}>
              {blog.title}
            </Link>
          </li>
        ))}
    </ul>
  )
}

export default Blogs
