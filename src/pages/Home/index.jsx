import { useEffect, useState } from 'react'
import './style.css'
import Trash from '../../assets/trash.svg'
import api from '../../services/api'

function Home() {
  const [users, setUsers] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')
  const [message, setMessage] = useState('')

  async function getUsers() {
    const usersFromApi = await api.get('/users')
    setUsers(usersFromApi.data)
  }

  function showMessage(text) {
    setMessage(text)
    setTimeout(() => setMessage(''), 3000)
  }

  async function createUser() {
    if (!name || !email || !age) {
      showMessage('Please fill in all fields to add a user')
      return
    }

    try {
      await api.post('/users', {
        name,
        email,
        age: Number(age)
      })

      showMessage('User added successfully')
      setName('')
      setEmail('')
      setAge('')
      setUsers([])
    } catch (error) {
      showMessage('Error adding user')
    }
  }

  async function searchUsers() {
    if (!name && !email && !age) {
      showMessage('Please fill in at least one field to search')
      return
    }

    try {
      const params = {}
      if (name) params.name = name
      if (email) params.email = email
      if (age) params.age = age

      const response = await api.get('/users', { params })
      setUsers(response.data)
      
      if (response.data.length === 0) {
        showMessage('No users found with the search criteria')
      } else {
        showMessage(`Found ${response.data.length} user(s)`)
      }
    } catch (error) {
      showMessage('Error searching users')
    }
  }

  function clearSearch() {
    setName('')
    setEmail('')
    setAge('')
    setUsers([])
    showMessage('Search cleared')
  }

  async function showAllUsers() {
    try {
      const response = await api.get('/users')
      setUsers(response.data)
      showMessage(`Showing all users: ${response.data.length} total`)
    } catch (error) {
      showMessage('Error loading users')
    }
  }

  async function deleteUser(id) {
    try {
      await api.delete(`/users/${id}`)
      setUsers(users.filter(user => (user._id || user.id) !== id))
      showMessage('User deleted successfully')
    } catch (error) {
      showMessage('Error deleting user')
    }
  }

  function UserField({ label, value }) {
    return (
      <p>
        <span className="label">{label}</span> {value}
      </p>
    )
  }

  return (
    <div className='container'>
      <form onSubmit={(event) => event.preventDefault()} aria-label='User registration form'>
        <h1>User Registration</h1>
        <label htmlFor='name' className='visually-hidden'>Name</label>
        <input
          id='name'
          name='name'
          type='text'
          placeholder='Name'
          value={name}
          onChange={(event) => setName(event.target.value)}
          aria-required='true'
        />
        <label htmlFor='email' className='visually-hidden'>Email</label>
        <input
          id='email'
          name='email'
          type='email'
          placeholder='Email'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-required='true'
        />
        <label htmlFor='age' className='visually-hidden'>Age</label>
        <input
          id='age'
          name='age'
          type='number'
          placeholder='Age'
          value={age}
          onChange={(event) => setAge(event.target.value)}
          aria-required='true'
          min='1'
          max='120'
        />
        <div className='button-group'>
          <button type='button' onClick={createUser} aria-label='Add new user'>Add User</button>
          <button type='button' onClick={searchUsers} className='btn-search' aria-label='Search users'>Search</button>
          <button type='button' onClick={showAllUsers} className='btn-show-all' aria-label='Show all users'>Show All</button>
          <button type='button' onClick={clearSearch} className='btn-clear' aria-label='Clear search'>Clear</button>
        </div>
      </form>

      {message && <div className='message' role='status' aria-live='polite'>{message}</div>}

      {users.length > 0 && (
        <section className='users-section' aria-label='User list' role='region'>
          {users.map((user) => (
            <article key={user._id || user.id} className='user-card'>
              <div>
                <UserField label="Nome:" value={user.name} />
                <UserField label="Email:" value={user.email} />
                <UserField label="Age:" value={user.age} />
              </div>

              <button 
                className='btn-trash' 
                onClick={() => deleteUser(user._id || user.id)}
                aria-label={`Delete user ${user.name}`}
              >
                <img src={Trash} alt='Delete user icon' className='icon' />
              </button>
            </article>
          ))}
        </section>
      )}

    </div>
  )
}

export default Home