import React, { useState } from 'react'
import './ChangePassword.scss'
import Card from '../../components/card/Card'
import { changePassword } from '../../services/authService'
import { toast } from 'react-toastify'
import Loader from '../../components/loader/Loader'
import { useNavigate } from 'react-router-dom'

const initialState = {
    oldPassword: '',
    password: '',
    password2: ''
}

const ChangePassword = () => {
  const [formData, setFormData] = useState(initialState)
  const { oldPassword, password, password2 } = formData
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target 
    setFormData({...formData, [name]: value })
  }

  // Change password on submit
  const changePass = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Check if passwords are matching
    if(password !== password2) {
        return toast.error('New passwords do not match')
    }

    const formData = {
        oldPassword,
        password
    }

    try {
        const data = await changePassword(formData) 
        toast.success(data)
        setIsLoading(false)
        setFormData(initialState)
        navigate('/dashboard/profile')
    }catch(error) {
        toast.error(error.message)
        setIsLoading(false)
    }
  }

  return (
    <div className='change-password'>
        {isLoading && <Loader />}  
        <Card>
            <div className='form'> 
                <h2>Change Password</h2>
                <form onSubmit={(e) => changePass(e)}>
                    <label>Old Password:</label>
                    <input type="password" name='oldPassword' value={oldPassword} onChange={(e) => handleInputChange(e)} />
                    <label>New Password:</label>
                    <input type="password" name='password' value={password} onChange={(e) => handleInputChange(e)} />
                    <label>Confirm Password:</label>
                    <input type="password" name='password2' value={password2} onChange={(e) => handleInputChange(e)} />
                    <button className='--btn --btn-primary --btn-block' type='submit'>Change Password</button>
                </form>
            </div>
        </Card>
    </div>
  )
}

export default ChangePassword