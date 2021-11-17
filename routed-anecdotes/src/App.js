import React, { useEffect, useState } from 'react'
import {
  Switch,
  Route,
  Link,
  useParams,
  useHistory,
  useLocation
} from 'react-router-dom'
import { useField } from './hooks'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <>
      <Link style={padding} to="/">
        home
      </Link>
      <Link style={padding} to="/anecdotes">
        anecdotes
      </Link>
      <Link style={padding} to="/create">
        create
      </Link>
      <Link style={padding} to="/about">
        about
      </Link>
    </>
  )
}

const AnecdoteList = ({ anecdotes }) => {
  const { state } = useLocation()
  const [showMessage, setShowMessage] = useState(true)

  useEffect(() => {
    let isMounted = true
    setTimeout(() => {
      if (isMounted) {
        setShowMessage(false)
      }
    }, 10000)
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div>
      {state && showMessage ? (
        <div>a new anecdote {state.content} created!</div>
      ) : (
        ''
      )}
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>
            <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find((n) => {
    return Number(n.id) === Number(id)
  })
  return (
    <div>
      <h2>
        {anecdote.content}by {anecdote.author}
      </h2>
      <p>has {anecdote.votes} votes</p>
      <div>
        for more info see <Link to={anecdote.info}>{anecdote.info}</Link>
      </div>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for
    <a href="https://courses.helsinki.fi/fi/tkt21009">
      Full Stack -websovelluskehitys
    </a>
    . See
    <a href="https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js
    </a>
    for the source code.
  </div>
)

const CreateNew = (props) => {
  const [resetContent, content] = useField('text')
  const [resetAuthor, author] = useField('text')
  const [resetInfo, info] = useField('url')
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    const newAnecdote = {
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    }
    props.addNew(newAnecdote)

    history.push({ pathname: '/anecdotes', state: newAnecdote })
  }

  const handleReset = (e) => {
    e.preventDefault()
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])
  console.log(anecdotes)
  const addNew = (anecdote) => {
    anecdote.id = String((Math.random() * 10000).toFixed(0))
    setAnecdotes(anecdotes.concat(anecdote))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/create">
          <CreateNew addNew={addNew} />
        </Route>
        <Route path="/anecdotes/:id">
          <Anecdote anecdotes={anecdotes} />
        </Route>
        <Route path="/anecdotes">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>
      <Footer />
    </div>
  )
}

export default App
