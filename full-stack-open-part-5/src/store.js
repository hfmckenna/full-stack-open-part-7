import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './reducers/notificationReducer'
import blogReducer, { initializeBlogs } from './reducers/blogReducer'
import userReducer, { initUser } from './reducers/userReducer'
import { saveState } from './localstorage'

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  user: userReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

store.dispatch(initializeBlogs())
store.dispatch(initUser())
store.subscribe(() => {
  const { user } = store.getState()
  saveState(user)
})

export default store
