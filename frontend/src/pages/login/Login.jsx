import './login.css'
import { Form } from '../../components/index'

const Login = () => {

  return(
    <>
      <div className='container'>
        <div className='background'>
          <img src='/credential-manager/assets/bg.jpg' alt='bg' />
        </div>
        <div className='form'>
          <Form />
        </div>
      </div>
    </>
  )
}

export default Login