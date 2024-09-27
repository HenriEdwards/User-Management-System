import './user.css'
import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { Loading } from '../index'

function User() {
  const navigateTo = useNavigate();
  // Get access to current user context
  const { user } = useContext(UserContext);
  const { displayNav, setDisplayNav } = useContext(UserContext);
  // Define state variables
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Check if user is an admin, if not, send user back
    if (user.role !== 'Admin') {
      navigateTo('/user-page');
    }

    // Retrieve all users/data
    const fetchData = async () => {
      try {
        // Send request to retrieve all users data
        const response = await fetch(
          '/api/users/manage-users',
          {
            method: 'GET',
          }
        );

        if (response.status === 401) {
          // Redirect user upon authorization failure
          navigateTo('/');
        }

        const json = await response.json();
        setUsers(json);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [navigateTo, user]);

  return (
    <div className='user-container'>
        <h3 className={displayNav ? 'header': 'header-none'}>Manage Users</h3>
      <div className='user-container-content'>
        {users.length > 0 ? (
          // Map over each user
          users.map((user) => {
            // Map over the organizational units (ous) of the user
            const userOUs = user.ous.map((ou) => {
              // Filter the divisions based on the OU ID
              const ouDivisions = user.divisions.filter(
                (division) => division.ou === ou._id
              );

              return (
                <div className='user-container-user-division-container' key={ou._id}>
                  <div className='user-container-user-division-name-container'>
                    <h2 className='user-container-user-division-name'>{ou.name}</h2>
                  </div>
                  <ul>
                    {/* Map over the divisions */}
                    {ouDivisions.map((division) => (
                      // Render a list item for each division
                      <li key={division._id}>{division.name}</li>
                    ))}
                  </ul>
                </div>
              );
            });

            return (
              // Render div, username and role for each user, nav
                <div className='user-container-user' key={user._id}>
                  {setDisplayNav(true)};
                  <div className='user-container-user-profile'>
                    <div className='user-container-user-profile-text'>
                      <p>{user.username}</p>
                    </div>
                    <div className='user-container-user-profile-text'>
                      <p>{user.role}</p>
                    </div>
                  </div>
                  {/* <div className='user-container-user-role border'>
                      <p></p>
                  </div> */}
                  <div className='user-container-user-division'>
                    {/* Render the ous and divisions */}
                    {userOUs}
                    {/* Update specific user - send user id as prop */}
                  </div>
                  <div className='user-container-user-button'>
                    <Link to={`/update-user/${user._id}`}>
                          <button className='update-user-button'>Update</button>
                    </Link>
                  </div>
              </div>
            );
          })
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}

export default User;