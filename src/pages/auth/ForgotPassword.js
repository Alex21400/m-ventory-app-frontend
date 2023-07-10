import React, { useState } from 'react'
import styles from './Auth.module.scss'
import forgotPasswordImg from '../../assets/forgot-password.svg'
import Card from '../../components/card/Card'
import { Link } from 'react-router-dom'
import { forgotPassword } from '../../services/authService'
import { toast } from 'react-toastify'
import { validateEmail } from './Register'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')

  // Forgot password function
  const forgotPass = async (e) => {
    e.preventDefault()

    if(!email) {
      toast.error('Please enter Your email')
    }

    if(!validateEmail(email)) {
      return toast.error('Please enter a valid email')
    }

    const userData = {
      email
    }

    try {
      await forgotPassword(userData)
      setEmail('')
    }catch(error) {
      toast.error(error.message)
    }
  }

  return (
    <div className={`container ${styles.auth}`}>
      <Card>
          <div className={styles.form}>
            <span className={styles.back}>
              &larr; Back to <Link to='/'>Home</Link>
            </span>
              <div className="--flex-center">
                <img className='img' src={forgotPasswordImg} alt="login.svg" width={120} style={{ margin: '20px 0'}} />
              </div>
              <form onSubmit={forgotPass}>
                <input type="text" placeholder='Email' required name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <button type='submit' className='--btn --btn-primary --btn-block'>Send reset email</button>
              </form>
              <Link to='/login'>Login</Link>
          </div>
      </Card>
    </div>
  )
}

export default ForgotPassword