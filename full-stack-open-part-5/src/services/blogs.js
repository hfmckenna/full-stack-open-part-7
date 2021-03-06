import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (blog, token) => {
  const request = await axios.post(baseUrl, blog, {
    headers: {
      Authorization: 'bearer ' + token //the token is a variable which holds the token
    }
  })
  return request.data
}

const like = async (blogId, likes, token) => {
  const blog = await axios.put(
    `${baseUrl}/${blogId}`,
    { likes: likes },
    {
      headers: {
        Authorization: 'bearer ' + token //the token is a variable which holds the token
      }
    }
  )
  return blog.data
}

const deleteBlog = async (blogId, token) => {
  axios.delete(`${baseUrl}/${blogId}`, {
    headers: {
      Authorization: 'bearer ' + token //the token is a variable which holds the token
    }
  })
}

const commentBlog = async (blogId, comment) => {
  const commentBlog = await axios.post(`${baseUrl}/${blogId}/comments`, {
    comment
  })
  console.log('commento:', commentBlog)
  return commentBlog.data
}

export default { getAll, create, like, deleteBlog, commentBlog }
