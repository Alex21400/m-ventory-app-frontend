import React, { useState } from 'react'
import styles from './Auth.module.scss'
import Card from '../../components/card/Card'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { resetPassword } from '../../services/authService'

const initialState = {
  password: '',
  password2: ''
}

const ResetPassword = () => {
  const [formData, setFormData] = useState(initialState)
  const { password, password2 } = formData

  const { resetToken } = useParams()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({...formData, [name]: value })
  }

  // Reset password on submit
  const resetPass = async (e) => {
    e.preventDefault()

    // Validation
    if(!password || !password2) {
      toast.error('Please enter password')
    }

    if(password !== password2) {
      toast.error('Passwords do not match')
    }

    if(password.length < 6) {
      toast.error('Password must be longer than 6 characters')
    }

    const userData = {
      password,
      password2
    }

    try {
      const data = await resetPassword(userData, resetToken)
      toast.success(data.message)
    } catch(error) {
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
              <h2>Reset Password</h2>
              <form onSubmit={resetPass}>
                <input type="password" placeholder='New Password' required name='password' value={password} onChange={handleInputChange}/>
                <input type="password" placeholder='Confirm Password' required name='password2' value={password2} onChange={handleInputChange}/>
                <button type='submit' className='--btn --btn-primary --btn-block'>Reset Password</button>
              </form>
              <Link to='/login'>Login</Link>
          </div>
      </Card>
    </div>
  )
}

export default ResetPassword