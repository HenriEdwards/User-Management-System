import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import NewCredential from './NewCredential'
import { useContext } from 'react'
import UserContext from '../context/UserContext'
import CustomAlert from './CustomAlert'
import { useNavigate } from 'react-router-dom'

const CredentialRepo = () => {
  const navigateTo = useNavigate()
  // Get access to current user context
  const {user} = useContext(UserContext)
  // Define state variables
  const [credentials, setCredentials] = useState([])
  const [credentialId, setCredentialId] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const {state} = useLocation()
  const {id, role, division} = state

  // Reset alert status
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

  // Retrieve credential repo
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Sent request to retrieve credential data
        const response = await fetch('/api/users/credential-repo', {
          method: 'POST',
          body: JSON.stringify({ id: id }),
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (response.status === 401) {
          // Redirect user upon authorization failure
          navigateTo('/')
        }
        
        const json = await response.json()
        // Access desired data
        setCredentialId(json[0]._id)
        setCredentials(json[0].credentials)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [id, navigateTo])

  // Handle update of a credential
  const handleUpdate = async (index) => {
    const updatedCredential = credentials[index]
    // Add index to new credentials object
    updatedCredential.index = index
    // Add credential id to new credentials objeect
    updatedCredential.id = credentialId

    try {
      // Send request to update specific credential
      const response = await fetch('/api/users/credential-repo/update-credential', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCredential),
      })

      if (response.status === 401) {
        // Redirect user upon authorization failure
        navigateTo('/')
      }

      if (response.ok) {
        setShowAlert(true)
      }

    } catch (error) {
      console.log(error)
    }
  }

  // Handle update on input boxes 
  const handleInputChange = (event, index) => {
    const { name, value } = event.target
    const updatedCredentials = [...credentials]
    updatedCredentials[index] = {
      ...updatedCredentials[index],
      [name]: value,
    }
    setCredentials(updatedCredentials)
  }

  const handleCredentialAdded = (newCredential) => {
    setCredentials((prevCredentials) => [...prevCredentials, newCredential])
  }

  return (
    <>
      <div>
        <h1 className='cooltech-grey ou-header'>{ division } - Credential Repository</h1>
        <p>Your Role: {role}</p>
        {/* Map over credentials & output into editable inputs */}
        {credentials && credentials.length > 0 ? (
          credentials.map((credential, index) => (
            <div key={index}>
              <label>Application:</label>
              <input
                type='text'
                name='application'
                value={credential.application || ''}
                onChange={(event) => handleInputChange(event, index)}
                readOnly={user.role === 'Normal'}
              />
              <label>Username:</label>
              <input
                type='text'
                name='username'
                value={credential.username || ''}
                onChange={(event) => handleInputChange(event, index)}
                readOnly={user.role === 'Normal'}
              />
              <label>Password:</label>
              <input
                type='text'
                name='password'
                value={credential.password || ''}
                onChange={(event) => handleInputChange(event, index)}
                readOnly={user.role === 'Normal'}
              />
              {user.role !== 'Normal' && (
                <button onClick={() => handleUpdate(index)}>Update</button>
                 )}
            </div>
          ))
        ) : (
          <p>No credentials found.</p>
        )}
        <NewCredential id={ credentialId } onCredentialAdded={handleCredentialAdded}/>
      </div>
      {showAlert && (
        <CustomAlert message='Credentials updated.' duration={2000} />
      )}
    </>
  )
}

export default CredentialRepo