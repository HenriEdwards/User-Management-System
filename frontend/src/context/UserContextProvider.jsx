import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import UserContext from './UserContext'

const UserContextProvider = ({ children }) => {
  // Retrieve user data from local storage
  const storedUser = JSON.parse(localStorage.getItem('user'))
  // Set initial state value of user to storedUser if it exists or null if it doesnt
  const [user, setUser] = useState(storedUser || null)

  // Update local storage whenever user state changes
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  return (
     // Provide user context value to children components
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

// Prop types validation
UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default UserContextProvider