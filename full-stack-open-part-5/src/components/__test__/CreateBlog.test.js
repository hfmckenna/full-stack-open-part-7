import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {
  fireEvent,
  render,
  waitFor
} from '@testing-library/react'
import CreateBlog from '../CreateBlog'
import blogService from '../../services/blogs'

jest.mock('../../services/blogs')

const user = {
  name: 'A Person',
  username: 'aperson',
  token: 'abc'
}

describe('<CreateBlog />', () => {
  let component

  beforeEach(() => {
    component = render(<CreateBlog user={user} />)
  })

  test('render labels', () => {
    expect(component.container).toHaveTextContent('title:')
    expect(component.container).toHaveTextContent('author:')
    expect(component.container).toHaveTextContent('url:')
  })

  test('updates the blogs every time like is clicked', async () => {
    const createBtn = component.queryByText('Create')
    const title = component.getByLabelText('title:')
    const author = component.getByLabelText('author:')
    const url = component.getByLabelText('url:')
    fireEvent.change(title, { target: { value: 'What happened, and when' } })
    fireEvent.change(author, { target: { value: 'This guy' } })
    fireEvent.change(url, { target: { value: 'www.com' } })

    const spy = jest.spyOn(blogService, 'create')

    fireEvent.click(createBtn)
    await waitFor(() => expect(spy).toHaveBeenCalledTimes(1))
    expect(spy).toBeCalledWith(
      {
        title: 'What happened, and when',
        author: 'This guy',
        url: 'www.com',
        likes: 0
      },
      'abc'
    )
    const successMessage = component.queryByText(/Blog Added/i)
    expect(successMessage).toBeVisible()
    expect(successMessage).toHaveStyle('color: green;')

    spy.mockRestore()
  })
})
