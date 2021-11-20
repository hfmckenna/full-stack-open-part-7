import blogService from '../services/blogs'

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'initBlogs',
      data: blogs
    })
  }
}

export const createBlog = (content, token) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content, token)
    dispatch({
      type: 'addBlog',
      data: newBlog
    })
  }
}

export const likeBlog = (id, likes, token) => {
  return async (dispatch) => {
    const newBlog = await blogService.like(id, likes, token)
    console.log(newBlog)
    dispatch({
      type: 'like',
      data: newBlog
    })
  }
}

export const deleteBlog = (id, token) => {
  return async (dispatch) => {
    const removed = await blogService.deleteBlog(id, token)
    console.log(removed)
    dispatch({
      type: 'delete',
      data: id
    })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'initBlogs':
      return action.data
    case 'addBlog': {
      return [...state, action.data]
    }
    case 'like': {
      const filtered = state.filter((blog) => blog.id !== action.data.id)
      return [...filtered, action.data]
    }
    case 'delete': {
      return state.filter((blog) => blog.id !== action.data)
    }
    default:
      return state
  }
}

export default reducer
