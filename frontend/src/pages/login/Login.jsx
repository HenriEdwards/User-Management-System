import './login.css'
import { Form } from '../../components/index'
import bg from './images/bg.jpg'

const Login = () => {

  return(
    <>
      <div className='container'>
        <div className='background'>
          <img src={bg} alt='bg' />
        </div>
        <div className='form'>
          <Form />
        </div>
      </div>
    </>
  )
}

export default Login