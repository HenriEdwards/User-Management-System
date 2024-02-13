import { useContext } from 'react'
import OuDivisions from '../components/OuDivisions'
import UserContext from '../context/UserContext'
import Nav from '../components/Nav'

const UserLanding = () => {
  const {user} = useContext(UserContext)

  return(
    <>
      <div>
        <Nav />
        <h1 className='cooltech-grey'>{user ? user.username : 'Not logged in'}</h1>
        <OuDivisions />
      </div>
    </>
  )
}

export default UserLanding