import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import CustomAlert from './CustomAlert'
import { useNavigate } from 'react-router-dom'

const NewCredential = ({ id, onCredentialAdded }) => {
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
    const response = await fetch('/api/users/credential-repo/add-credential', {
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
      <div>
        {!showForm && (
          <button onClick={() => setShowForm(true)}>Add a new credential</button>
        )}
        {showForm && (
          <div>
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
            <button onClick={handleSubmit}>Add Credential</button>
          </div>
        )}
      </div>
      {showAlert && (
        <CustomAlert message='Credentials added.' duration={1000} />
      )}
    </>
  )
}

NewCredential.propTypes = {
  id: PropTypes.string.isRequired,
  onCredentialAdded: PropTypes.func.isRequired,
}

export default NewCredential