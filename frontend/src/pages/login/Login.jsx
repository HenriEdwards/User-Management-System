import './login.css'
import { useEffect, useState } from 'react'
import { Form } from '../../components/index'
import bg from './images/bg.jpg'

const Login = () => {
  const [connected, setConnected] = useState(false)

    useEffect(() => {
      const fetchConnection = async () => {
      // Send request 
      const response = await fetch(`https://user-live.onrender.com/api/users`, {
        method: 'POST',
      })
      if (response){
        setConnected(true)
      }
    }
    fetchConnection()
    }, [])

  return(
    <>
    <div className='server-status'>
      {
        (connected == true) ? (
          <p className='server-status-connected'>Server connected</p>
        ) : (
          <p className='server-status-unconnected'>Server is starting up...</p>
        )
      }

    </div>
      <div className='container'>
        <div className='background'>
          <img src={bg} alt='bg' />
        </div>
        <div className='form'>
          <div className='form-header'>
            <h1>Welcome</h1>
          </div>
          <Form />
        </div>
      </div>
    </>
  )
}

export default Login