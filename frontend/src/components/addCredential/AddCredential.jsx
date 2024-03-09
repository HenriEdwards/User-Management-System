import './addcredential.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Alert } from '../index'

const AddCredential = ({ id, onCredentialAdded }) => {
  const navigateTo = useNavigate()
  // Define state variables
  const [showForm, setShowForm] = useState(false)
  const [application, setApplication] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showAlert, setShowAlert] = useState(false)

  // Reset alert
  useEffect(() => {
    let timeoutId
    if (showAlert) {
      timeoutId = setTimeout(() => {
        setShowAlert(false)
      }, 2000)
    }
    return () => {
      clearTimeout(timeoutId)
    }
  }, [showAlert])

  // Handle adding a new credential to the repo
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Retrieve new details
    const newCredential = { application, username, password }
    // Formulate final query
    const query = { id, newCredential }

    // Send request to add credential to specific credential repo
    const response = await fetch('https://user-live.onrender.com/api/users/credential-repo/add-credential', {
      method: 'PATCH',
      body: JSON.stringify(query),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      setShowAlert(true)
      // Notify the parent component about the new credential & reset fields + hide form
      if (onCredentialAdded) {
        onCredentialAdded(newCredential)
        setApplication('')
        setUsername('')
        setPassword('')
        setShowForm(false)
      }
    } else if (response.status === 401) {
      // Redirect user upon authorization failure
      navigateTo('/')
    } else {
      console.log('An error occurred.')
    }
  }

  return (
    <>
      <div className='addcredential'>
        {!showForm && (
          <button onClick={() => setShowForm(true)}>Add New</button>
        )}
        {showForm && (
          <div className='credential-fields'>
            <label>Application:</label>
            <input
              type='text'
              onChange={(e) => setApplication(e.target.value)}
              value={application}
            />
            <label>Username:</label>
            <input
              type='text'
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <label>Password:</label>
            <input
              type='text'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button onClick={handleSubmit}>Add</button>
          </div>
        )}
      </div>
      {showAlert && (
        <Alert message='Credentials added.' duration={1000} />
      )}
    </>
  )
}

AddCredential.propTypes = {
  id: PropTypes.string.isRequired,
  onCredentialAdded: PropTypes.func.isRequired,
}

export default AddCredential