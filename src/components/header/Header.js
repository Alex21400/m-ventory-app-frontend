import React from 'react'
import { logoutUser } from '../../services/authService'
import { useDispatch, useSelector } from 'react-redux'
import { SET_LOGIN } from '../../redux/features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Header = ({ isOpen }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { name } = useSelector(state => state.auth)

  const logout = async () => {
    await logoutUser()
    await dispatch(SET_LOGIN(false))  
    navigate('/')
    toast.success('User logged out')
  }

  return (
    <div className='--pad header' style={{ paddingLeft: isOpen ? '240px' :'70px', transition: 'all 0.5s' }}>
        <div className='--flex-between'>
            <h3 style={{ paddingLeft: '15px'}}>
                <span className='--fw-thin'>Welcome, </span>
                <span className='--color-primary'>{name}</span>
            </h3>
            <button className='--btn --btn-primary' style={{ marginBottom: '7px'}} onClick={logout}>Logout</button>
        </div>
        <hr />
    </div>
  )
}

export default Header