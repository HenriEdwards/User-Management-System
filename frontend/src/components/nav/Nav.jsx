import './nav.css'
import { Link } from 'react-router-dom'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { useContext, useState } from 'react'
import UserContext from '../../context/UserContext'
import { Logout } from '../index'

const Nav = () => {
  // Get access to current user context
  const {user} = useContext(UserContext)
  const {displayNav} = useContext(UserContext)
  const [toggleMenu, setToggleMenu] = useState(false)

  return (
    <>
      <div className={displayNav ? 'nav' : 'nav hide-nav'}>
        <div className='nav-big nav-items'>
          <Link to='/user-page'>
            <h3>CoolTech</h3>
          </Link>
          {/* Extra security measure to how hide link depending on user role */}
          {user.role === 'Admin' && (
            <Link to='/manage-users'>
              <h3>User Manager</h3>
            </Link>
          )}
          <Logout />
          </div>
        <div className='nav-small'>
          {toggleMenu
            ? <RiCloseLine color="#002b55" size={27} onClick={() => setToggleMenu(false)} />
            : <RiMenu3Line color="#002b55" size={27} onClick={() => setToggleMenu(true)} />}
          {toggleMenu && (
          <div>
            <div>
              <Link to='/user-page'>
              <h3>CoolTech</h3>
              </Link>
              {user.role === 'Admin' && (
                <Link to='/manage-users'>
                  <h3>User Manager</h3>
                </Link>
              )}
              <Logout />
            </div>
          </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Nav