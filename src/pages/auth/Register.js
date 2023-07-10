import { useState } from 'react'
import styles from './Auth.module.scss'
import registerImg from '../../assets/register.svg'
import Card from '../../components/card/Card'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { registerUser } from '../../services/authService'
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice'
import { useDispatch } from 'react-redux'
import Loader from '../../components/loader/Loader'

const initialState = {
  name: '',
  email: '',
  password: '',
  password2: ''
}

export const validateEmail = (email) => {
  return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}

const Register = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState(initialState)
  const { name, email, password, password2 } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({...formData, [name]: value})
  }

  // Register user on submit
  const register = async (e) => {
    e.preventDefault()
    
    if(!name || !email || !password) {
      return toast.error('All fields are required')
    }

    if(password.length < 6) {
      return toast.error('Password must be longer than 6 characters')
    }

    if(password !== password2) {
      return toast.error('Passwords do not match')
    }

    if(!validateEmail(email)) {
      return toast.error('Please enter a valid email')
    }

    const userData = {
      name, 
      email, 
      password
    }

    setIsLoading(true)
    try {
      const data = await registerUser(userData)
      // console.log(data)
      await dispatch(SET_LOGIN(true))
      await dispatch(SET_NAME(data.name))
      navigate('/dashboard/stats')
      setIsLoading(false)
    } catch(error) {
      setIsLoading(false)
      toast.error(error.message)
    }
  }

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
          <div className={styles.form}>
          <span className={styles.back}>
            &larr; Back to <Link to='/'>Home</Link>
          </span>
            <div className="--flex-center">
              <img className='img' src={registerImg} alt="login.svg" width={100} />
            </div>
            <form onSubmit={(e) => register(e)}>
              <input type="text" placeholder='Name' required name='name' value={name} onChange={handleInputChange}/>
              <input type="text" placeholder='Email' required name='email' value={email} onChange={handleInputChange}/>
              <input type="password" placeholder='Password' required name='password' value={password} onChange={handleInputChange}/>
              <input type="password" placeholder='Confirm Password' required name='password2' value={password2} onChange={handleInputChange}/>
              <button type='submit' className='--btn --btn-primary --btn-block'>Register</button>
            </form>
            <span className={styles.register}>
              <p>Already have an account? &nbsp;</p> <Link to='/login'>Login</Link>
            </span>
          </div>
      </Card>
    </div>
  )
}

export default Register