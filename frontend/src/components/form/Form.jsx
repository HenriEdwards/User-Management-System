import './form.css'
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import { Alert } from '../index'

export default function Form() {
  const navigateTo = useNavigate()
  // Define state variables
  const [formtype, setFormType] = useState('login')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('') 
  const [errorType, setErrorType] = useState('')
  const [isValid, setIsValid] = useState(null)
  const [emptyfields, setEmptyFields] = useState([])
  const [showAlert, setShowAlert] = useState(false) 

  // Set context to user logged in
  const { setUser } = useContext(UserContext)

  // Reset errors/alerts on form change (login/register)
  useEffect(() => {
    setShowAlert(false)
    setErrorType('')
    setIsValid(null)
    setEmptyFields([])
  }, [formtype])

  // Handle user login / registration
  const handleSubmit = async (e) => {
    e.preventDefault()

    const user = {
      username: username.trim(),
      password: password.trim()
    }

    // Send login / register request
    const response = await fetch(`https://user-live.onrender.com/api/users/${formtype}`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()


    // Check/handle if username or password is invalid
    if(!response.ok && (json.message === 'Invalid username or password')){
      setErrorType('Invalid username or password')
      setIsValid(false)
    }

    // Check/handle if user already exists
    if(!response.ok && (json.message === 'User exists')){
      setErrorType('Username already registered.')
      setIsValid(false)
    }

    // Check/handle if user didnt fill in all the fields
    if (!response.ok && json.emptyFields) {
      setErrorType('Please enter all fields')
      setIsValid(false)
      setEmptyFields(json.emptyFields)
    }

    // Handle if user has been registered
    if (response.ok && (json.message === 'Registered')) {
      setShowAlert(true) 
      setTimeout(() => {
        setFormType('login')
        setUsername('')
        setPassword('')
        setErrorType('')
        setIsValid('true')
        setEmptyFields([])
        navigateTo('/')
      }, 1500)
      return
    }

    // Handle user successfully logged in
    if (response.ok) {
      setUser( json )
      navigateTo('/user-page')
    }
  }

  return (
    <>
      <div className='form-content'>
        <div className='form-selector'>
          
          <button
            onClick={() => setFormType('login')}
            className={`form-button ${formtype === 'login' ? 'selected' : ''}`}
          >
            Login
          </button>

          <button
            onClick={() => setFormType('register')}
            className={`form-button ${formtype === 'register' ? 'selected' : ''}`}
          >
            Register
          </button>
        </div>
        
        <div className='form-body'>
          <input 
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={emptyfields.includes('username') ? 'error' : ''}
            />
          <input 
            type='text'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={emptyfields.includes('password') ? 'error' : ''}
          />

          <button
            type='submit'
            onClick={handleSubmit}
            className='submit-btn'
          >
            {formtype === 'login' ? 'Login' : 'Register'}
          </button>
        </div>
        <div className='form-info'>
          
          {isValid === false ? <p className='error-text'>{errorType}</p> : <p>Please login or register</p>}

        </div>
      </div>
        {showAlert && ( 
          <Alert message='User successfully registered. Please login.' duration={2000} />
        )}
    </>
  )
}