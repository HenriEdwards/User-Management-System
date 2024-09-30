import { useContext } from 'react';
import UserContext from '../../context/UserContext';
import './loading.css'

function Loading() {
  const { setDisplayNav } = useContext(UserContext);

  return (
    <div className='no-users-found'>
      {setDisplayNav(false)};
      <img src='/credential-manager/assets/loading-icon.png' alt="loading" />
    </div>
  );
}

export default Loading;