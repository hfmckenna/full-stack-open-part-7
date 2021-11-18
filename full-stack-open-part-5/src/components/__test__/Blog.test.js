import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from '../Blog'
import blogService from '../../services/blogs'

jest.mock('../../services/blogs')

const blog = {
  title: 'A new blog post',
  author: 'Some person',
  url: 'https://example.com',
  likes: 5,
  user: {
    name: 'A person',
    username: 'aperson'
  }
}

const user = {
  name: 'A Person',
  username: 'aperson',
  token: 'abc'
}

describe('<Blog />', () => {
  let component

  const setBlogs = jest.fn()

  beforeEach(() => {
    component = render(<Blog blog={blog} user={user} setBlogs={setBlogs} />)
  })

  test('renders title and author', () => {
    expect(component.container).toHaveTextContent('A new blog post')
    expect(component.container).toHaveTextContent('Some person')
  })

  test('doesnt render likes and url, shows them after button click', () => {
    const viewBtn = component.queryByText('view')
    const likes = component.queryByText('likes 5')
    const url = component.queryByText('https://example.com')
    expect(likes).not.toBeVisible()
    expect(url).not.toBeVisible()
    fireEvent.click(viewBtn)
    expect(likes).toBeVisible()
    expect(url).toBeVisible()
  })

  test('updates the blogs every time like is clicked', () => {
    const viewBtn = component.queryByText('view')
    const spy = jest.spyOn(blogService, 'like')
    fireEvent.click(viewBtn)

    const likeBtn = component.queryByText('like')
    fireEvent.click(likeBtn)
    fireEvent.click(likeBtn)

    expect(spy).toHaveBeenCalledTimes(2)

    spy.mockRestore()
  })
})
