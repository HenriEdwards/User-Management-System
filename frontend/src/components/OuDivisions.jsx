import { useContext } from 'react'
import UserContext from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

const OuDivisions  = () => {
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
      <div>
        {/* Map over user ous */}
        {Object.values(ouDivisions).map((ou) => (
          <div key={ou.name}>
            <hr></hr>
            <h2 className='ous'>{ou.name}</h2>
            <ul>
              {/* Map over divisions for each ou */}
              {ou.divisions.map((division) => (
                // Output divisions info & button link to respective repository
                <li 
                  key={division.id}
                >
                  {division.name}
                  <button 
                    onClick={() => handleClick(division.id, division.name)}
                  >
                    View Credential Repository
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

export default OuDivisions