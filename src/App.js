import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  const userStorage = 'userStorage'

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const user = window.localStorage.getItem(userStorage)
    if (user) {
      const parsedUser = JSON.parse(user)
      setUser(parsedUser)
      blogService.setToken(parsedUser.token)
    }
  }, [])

  const loginHandler = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(userStorage, JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(err) {
      console.log('login failed!! wtf!!')
    }
  }

  const logoutHandler = async (event) => {
    window.localStorage.removeItem(userStorage)
    setUser(null)
  }

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={loginHandler}>
        username<input type="text" value={username} name="Username" onChange={ ({ target }) => setUsername(target.value)}/>
        password<input type="password" value={password} name="Password" onChange={ ({ target }) => setPassword(target.value) } />
        <button type='submit'>login</button>
      </form>
    </div>
  )


  const createBlog = async (blogObject) => {
    blogFormRef.current.handleClick()
    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
    } catch (err) {
      console.log('something went wrong while creating blog: ', err)
    }
  }

  const createBlogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={createBlog}/>
    </Togglable>
  )

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in
        <span>
          <button onClick={logoutHandler}>logout</button>
        </span>
      </p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      {createBlogForm()}
    </div>
  )

  return (
    <div>
      { user === null
        ? loginForm()
        : blogList()}
    </div>
  )
}

export default App