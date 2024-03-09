import './logout.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const navigateTo = useNavigate()

  // Handle logout
  const handleLogout = async () => {
    try {
      const response = await fetch('https://user-live.onrender.com/api/users/logout', {
        method: 'POST'
      })

      if (response.ok){
        console.log('Successfully logged out')
        navigateTo('/')
      } else {
        console.log('Error logging out user')
        navigateTo('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
      <Link to='/'>
        <h3 onClick={handleLogout}>Logout</h3>
      </Link>
  )
}


export default Logout