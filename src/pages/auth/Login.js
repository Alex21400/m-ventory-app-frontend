import React, { useState } from 'react'
import styles from './Auth.module.scss'
import loginImg from '../../assets/login.svg'
import Card from '../../components/card/Card'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { SET_NAME, SET_LOGIN } from '../../redux/features/auth/authSlice'
import { validateEmail } from './Register'
import { loginUser } from '../../services/authService'
import Loader from '../../components/loader/Loader'
import { toast } from 'react-toastify'

const initialState = {
  email: '',
  password: '',
}

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState(initialState)
  const { email, password } = formData

  const handleInputChange = (e) => {
    const { name, value } = e.target 
    setFormData({...formData, [name]: value })
  }

  // Login user on submit
  const login = async (e) => {
    e.preventDefault()

    if(!email || !password) {
      return toast.error('Please enter Your email and password')
    }

    if(!validateEmail(email)) {
      return toast.error('Please enter a valid email')
    }

    const userData = {
      email,
      password
    }

    setIsLoading(true)
    try {
      const data = await loginUser(userData)
      // console.log(data)
      await dispatch(SET_LOGIN(true))
      await dispatch(SET_NAME(data.name))
      navigate('/dashboard/stats')
      setIsLoading(false)
    }catch(error) {
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
              <img className='img' src={loginImg} alt="login.svg" width={100} />
            </div>
            <form onSubmit={login}>
              <input type="text" placeholder='Email' required name='email' value={email} onChange={handleInputChange}/>
              <input type="password" placeholder='Password' required name='password' value={password} onChange={handleInputChange}/>
              <button type='submit' className='--btn --btn-primary --btn-block'>Login</button>
            </form>
            <Link to='/forgot-password'>Forgot Password?</Link>
            <span className={styles.register}>
              <p>Don't have an account? &nbsp;</p> <Link to='/register'>Register</Link>
            </span>
          </div>
      </Card>
    </div>
  )
}

export default Login