import Nav from '../components/Nav'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import UserContext from '../context/UserContext'

function Users() {
  const navigateTo = useNavigate()
  // Get access to current user context
  const {user} = useContext(UserContext)
  // Define state variables
  const [users, setUsers] = useState([])

  useEffect(() => {
    // Check if user is an admin, if not, send user back
    if (user.role !== 'Admin'){
      navigateTo('/user-page')
    }

    // Retrieve all users/data
    const fetchData = async () => {
      try {
        // Send request to retrieve all users data
        const response = await fetch('/api/users/manage-users', {
          method: 'GET'
        })

        if (response.status === 401) {
          // Redirect user upon authorization failure
          navigateTo('/')
        }

        const json = await response.json()
        setUsers(json)  
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [navigateTo, user])

  return (
    <div>
      <Nav />
      <h1 className='cooltech-grey'>Manage Users</h1>
      {users.length > 0 ? (
        // Map over each user
        users.map((user) => {
          // Map over the organizational units (ous) of the user
          const userOUs = user.ous.map((ou) => {
            // Filter the divisions based on the OU ID 
            const ouDivisions = user.divisions.filter(
              (division) => division.ou === ou._id
            )

            return (
              <div key={ou._id}>
                <h2 className='ous'>{ou.name}</h2>
                <ul>
                  {/* Map over the divisions */}
                  {ouDivisions.map((division) => (
                     // Render a list item for each division
                    <li key={division._id}>{division.name}</li>
                  ))}
                </ul>
              </div>
            )
          })

          return (
            // Render div, username and role for each user
            <div key={user._id}>
              <h2 className='username'>{user.username}</h2>
              <p>{user.role}</p>
              {/* Render the ous and divisions */}
              {userOUs}
              {/* Update specific user - send user id as prop */}
              <Link to={`/update-user/${user._id}`}>
                <button>Update User</button>
              </Link>
              <hr></hr>
            </div>
          )
        })
      ) : (
        <p>No users found.</p>
      )}
    </div>
  )
}

export default Users