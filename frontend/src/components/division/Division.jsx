import './division.css'
import { useContext } from 'react'
import UserContext from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'

const Division  = () => {
  const navigateTo = useNavigate()
  // Get access to current user context
  const {user} = useContext(UserContext)

  // Extract necessary user data
  const divisions = user.divisions
  const ous = user.ous
  const role = user.role

  // Object to store ou & its respective divisions
  const ouDivisions = {}

  // Add object for each ou & include name & empty divisions array
  ous.forEach((opUnit) => {
    ouDivisions[opUnit._id] = {
      name: opUnit.name,
      divisions: []
    }
  })

  // Iterate over the divisions array and group divisions by OU
  divisions.forEach((division) => {
    // Check if the ouDivisions object has a property that matches the division's OU
    if (Object.prototype.hasOwnProperty.call(ouDivisions, division.ou)) {
      // Push the division object into the divisions array of the corresponding OU
      ouDivisions[division.ou].divisions.push({
        id: division._id,
        name: division.name,
      })
    }
  })

  /* Navigate to credential repository page & send corresponding division, 
    credential id, and current user's role as prop */
  const handleClick = (divisionid, divisionName) => {
    navigateTo('/credential-repo', { state: { id: divisionid, role: role, division: divisionName } })
  }

  return (
    <>
      <div className='division'>
        {/* Map over user ous */}
        {Object.values(ouDivisions).map((ou) => (
          <div className='division-content' key={ou.name}>
            <div className='division-content-h2'>
              <h2>{ou.name}</h2>
            </div>
            <ul className='division-content-section'>
              {/* Map over divisions for each ou */}
              {ou.divisions.map((division) => (
                // Output divisions info & button link to respective repository
                <li 
                  key={division.id}
                >
                  <p>{division.name}</p>
                  <button 
                    onClick={() => handleClick(division.id, division.name)}
                  >
                    View
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  )
}

export default Division