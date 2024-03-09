import './login.css'
import { useEffect, useState } from 'react'
import { Form } from '../../components/index'
import bg from './images/bg.jpg'

const Login = () => {
  const [seconds, setSeconds] = useState(10)
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



  // Indicate to user time until server is up
  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1)
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [seconds])

  return(
    <>
    <div className='server-status'>
      {
        (seconds == 0 || connected == true) ? (
          <p className='server-status-connected'>Server connected</p>
        ) : (
          <p className='server-status-unconnected'>Server is starting up, please wait {seconds} seconds.</p>
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