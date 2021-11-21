import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Toggalable from './Toggalable'
import CreateBlog from './CreateBlog'

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const blogFormRef = useRef()
  if (!user) {
    return null
  }

  return (
    <div>
      <Toggalable buttonLabel={'create new blog'} ref={blogFormRef}>
        <CreateBlog user={user} />
      </Toggalable>
      <ul>
        {blogs
          .sort((a, b) => a.likes < b.likes)
          .map((blog) => (
            <li
              key={blog.id}
              style={{ border: '2px solid black', marginBottom: '8px' }}
            >
              <Link key={blog.id} to={`/blogs/${blog.id}`}>
                {blog.title}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Blogs
