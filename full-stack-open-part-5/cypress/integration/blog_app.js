describe('Blog app', function () {
  const user = {
    username: 'hugh',
    name: 'hugh',
    password: 'abc'
  }

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users/', user).then(
      (response) => expect(response.body).to.have.property('name', 'hugh')
    )

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('login').click()
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('input[name="Username"]').type('hugh')
      cy.get('input[name="Password"]').type('abc')
      cy.get('button[type="submit"]').click()

      cy.contains(`${user.name} is logged in`)
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('input[name="Username"]').type('hugh')
      cy.get('input[name="Password"]').type('wrong')
      cy.get('button[type="submit"]').click()

      cy.contains('Wrong Credentials')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.contains('login').click()
      cy.get('input[name="Username"]').type('hugh')
      cy.get('input[name="Password"]').type('abc')
      cy.get('button[type="submit"]').click()
    })

    it('it allows blogs to be created with required fields', function () {
      cy.contains('create new blog').click()
      cy.get('input[name="title"]').type('This is a new blog')
      cy.get('input[name="author"]').type('An author')
      cy.get('input[name="url"]').type('https://example.com')
      cy.get('button').contains('Create').click()
      cy.contains('Blog Added').and('have.css', 'color', 'rgb(0, 128, 0)')
    })

    it('it doesnt allow blogs to be created without required fields', function () {
      cy.contains('create new blog').click()
      cy.get('input[name="title"]').type('This is a new blog')
      cy.get('input[name="author"]').type('An author')
      cy.get('button').contains('Create').click()
      cy.contains('Request failed with status code').and(
        'have.css',
        'color',
        'rgb(255, 0, 0)'
      )
    })

    it('clicking like adds a like to the blog', function () {
      cy.contains('create new blog').click()
      cy.get('input[name="title"]').type('This is a new blog')
      cy.get('input[name="author"]').type('An author')
      cy.get('input[name="url"]').type('https://example.com')
      cy.get('button').contains('Create').click()
      cy.contains('This is a new blog').contains('view').click()
      cy.contains('likes 0')
      cy.get('button').contains('like').click()
      cy.get('button').contains('like').click()
      cy.contains('likes 2')
    })

    it('clicking remove lets authorised users delete the blog', function () {
      cy.contains('create new blog').click()
      cy.get('input[name="title"]').type('This is a new blog')
      cy.get('input[name="author"]').type('An author')
      cy.get('input[name="url"]').type('https://example.com')
      cy.get('button').contains('Create').click()
      cy.contains('This is a new blog').contains('view').click()
      cy.get('button').contains('Remove').click()
      cy.on('window:confirm', () => true)
      cy.contains('This is a new blog').should('have.length', 0)
      cy.contains('An author').should('have.length', 0)
      cy.contains('https://example.com').should('have.length', 0)
    })

    it('unauthorised users cant click remove', function () {
      cy.request('POST', 'http://localhost:3003/api/users/', {
        username: 'matt',
        name: 'matt',
        password: 'abc'
      }).then((response) =>
        expect(response.body).to.have.property('name', 'matt')
      )
      cy.contains('create new blog').click()
      cy.get('input[name="title"]').type('This is a new blog')
      cy.get('input[name="author"]').type('An author')
      cy.get('input[name="url"]').type('https://example.com')
      cy.get('button').contains('Create').click()
      cy.contains('Logout').click()
      cy.contains('login').click()
      cy.get('input[name="Username"]').type('matt')
      cy.get('input[name="Password"]').type('abc')
      cy.get('button[type="submit"]').click()
      cy.contains('This is a new blog').contains('view').click()
      cy.get('button').contains('Remove').should('have.length', 0)
      cy.contains('This is a new blog')
      cy.contains('An author')
      cy.contains('https://example.com')
    })

    it('orders blogs in ascending order of likes', function () {
      cy.contains('create new blog').click()

      cy.get('input[name="title"]').type('Second best')
      cy.get('input[name="author"]').type('An author')
      cy.get('input[name="url"]').type('https://example.com/first')
      cy.get('button').contains('Create').click()
      cy.wait(500)

      cy.get('input[name="title"]').type('Best Blog')
      cy.get('input[name="author"]').type('Another author')
      cy.get('input[name="url"]').type('https://example.com/second')
      cy.get('button').contains('Create').click()
      cy.wait(500)

      cy.contains('Best Blog').contains('view').click()
      cy.contains('Best Blog').parent().contains('likes 0')
      cy.contains('Best Blog').parent().contains('button', 'like').click()
      cy.contains('Best Blog').parent().contains('button', 'like').click()
      cy.contains('Best Blog').parent().contains('likes 2')

      cy.contains('Second best').contains('view').click()
      cy.contains('Second best').parent().contains('likes 0')
      cy.contains('Second best').parent().contains('button', 'like').click()
      cy.contains('Second best').parent().contains('likes 1')
      cy.get('.post-info:first').contains('Best Blog')
      cy.get('.post-info:nth-child(2)').contains('Second best')
    })
  })
})
