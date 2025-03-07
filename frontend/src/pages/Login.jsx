import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import { login, reset } from '../features/auth/authSlice';


function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || user) {
      navigate('/')
    }
    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])


  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  if (isLoading) {
    return <Spinner />
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const userData = {
      email,
      password,
    }
    dispatch(login(userData))
  }

  const { email, password } = formData
  return <>
    <section className='heading'>
      <h1>
        <FaSignInAlt /> Login
      </h1>
      <p>Login and start setting goals</p>
    </section>
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input type="text" className="form-control" id='email'
            name='email' value={email} placeholder='Enter your email'
            onChange={onChange} />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" id='password'
            name='password' value={password} placeholder='Enter your password'
            onChange={onChange} />
        </div>
        <div className='form-group'>
          <button type='submit' className='btn btn-block'>Submit</button>
        </div>
      </form>
    </section>
  </>

}

export default Login