import { Link } from 'react-router-dom'
import { useContext } from 'react'
import UserContext from '../context/UserContext'
import LogOut from '../components/LogoutUser'

const Nav = () => {
  // Get access to current user context
  const {user} = useContext(UserContext)

  return (
    <>
      <header>
        <div className='container'>
          <Link to='/user-page'>
            <h3 className='cooltech-grey'>CoolTech</h3>
          </Link>
          {/* Extra security measure to how hide link depending on user role */}
          {user.role === 'Admin' && (
            <Link to='/manage-users'>
              <h3>User Manager</h3>
            </Link>
          )}
          <LogOut />
        </div>
      </header>
    </>
  )
}

export default Nav