import React, { useEffect, useState } from 'react'
import './Profile.scss'
import useRedirectLoggedOutUser from '../../components/customHooks/useRedirectLoggedOutUser'
import { useDispatch } from 'react-redux'
import { getUserProfile } from '../../services/authService'
import { SET_USER, SET_NAME } from '../../redux/features/auth/authSlice'
import { SpinnerImg } from '../../components/loader/Loader'
import Card from '../../components/card/Card'
import { Link } from 'react-router-dom'

const Profile = () => {
  useRedirectLoggedOutUser('/')
  
  const [profile, setProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()

  // Get user data on page load
  useEffect(() => {
    setIsLoading(true)
    async function getUserData() {
        const data = await getUserProfile()
        console.log(data)
        
        setProfile(data)
        setIsLoading(false)
        await dispatch(SET_USER(data))
        await dispatch(SET_NAME(data.name))
    }

    getUserData()
  }, [dispatch])

  return (
    <>
    <div className='profile --my2'>
        <h2>User Profile</h2>
        {isLoading && <SpinnerImg />}
        <>
            {!isLoading && profile === undefined ? (
                <h4>Something went wrong. Please try again.</h4>
            ) : (
                <Card cardClass='card --flex-dir-column'>
                    <div className='profile-photo'>
                        <img src={profile?.photo} alt='photo' />
                    </div>
                    <div className='profile-data'>
                        <p>
                            <b>Name:</b> {profile?.name}
                        </p>
                        <p>
                            <b>Email:</b> {profile?.email}
                        </p>
                        <p>
                            <b>Phone:</b> {profile?.phone}
                        </p>
                        <p>
                            <b>Bio:</b> {profile?.bio}
                        </p>
                        <Link to='/dashboard/edit-profile'>
                            <button className='--btn --btn-primary'>Edit Profile</button>
                        </Link>
                    </div>
                </Card>
            )}
        </>
    </div>
    </>
  )
}

export default Profile