import { useContext } from 'react';
import UserContext from '../../context/UserContext';
import loadingImage from '../../assets/loading/loading-icon.png'
import './loading.css'

function Loading() {
  const { setDisplayNav } = useContext(UserContext);

  return (
    <div className='no-users-found'>
      {setDisplayNav(false)};
      <img src={loadingImage} alt="loading" />
    </div>
  );
}

export default Loading;