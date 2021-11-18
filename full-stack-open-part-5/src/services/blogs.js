import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (blog, token) => {
  const request = await axios.post(baseUrl, blog, {
    headers: {
      Authorization: 'bearer ' + token, //the token is a variable which holds the token
    },
  })
  return request.data
}

const like = async (blogId, likes, token) => {
  await axios.put(
    `${baseUrl}/${blogId}`,
    { likes: likes },
    {
      headers: {
        Authorization: 'bearer ' + token, //the token is a variable which holds the token
      },
    }
  )
}

const deleteBlog = async (blogId, token) => {
  await axios.delete(
    `${baseUrl}/${blogId}`,
    {
      headers: {
        Authorization: 'bearer ' + token, //the token is a variable which holds the token
      },
    }
  )
}

export default { getAll, create, like, deleteBlog }
