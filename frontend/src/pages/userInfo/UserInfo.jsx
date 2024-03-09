import './userinfo.css'
import { useContext } from 'react'
import UserContext from '../../context/UserContext'
import { Division, Nav } from '../../components/index'

const UserInfo = () => {
  const {user} = useContext(UserContext)

  return(
    <>
      <div className='user'>
        <Nav />
        <div className='user-content'>
          <h1 className='header'>{user ? 'Welcome '+ user.username + ', your credential repositories...' : 'Not logged in'}</h1>
          <Division />
        </div>
      </div>
    </>
  )
}

export default UserInfo