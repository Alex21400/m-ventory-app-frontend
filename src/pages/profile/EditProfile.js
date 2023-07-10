import React, { useEffect, useState } from 'react'
import './Profile.scss'
import { useSelector } from 'react-redux'
import { SpinnerImg } from '../../components/loader/Loader'
import Card from '../../components/card/Card'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { updateProfile } from '../../services/authService'

const EditProfile = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useSelector(state => state.auth)
  const { email } = user

  const navigate = useNavigate()

  // If user refreshes the page, navigate him back to profile 
  useEffect(() => {
    if(!email) {
        navigate('/dashboard/profile')
    }
  }, [email, navigate])

  const initialState = {
    name: user?.name,
    email: user?.email,
    photo: user?.photo,
    phone: user?.phone,
    bio: user?.bio
  }

  const [profile, setProfile] = useState(initialState)
  const [profileImage, setProfileImage] = useState('')

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target 
    setProfile({...profile, [name]: value})
  }

  // Handle image change
  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0])  
  }

  // Upload profile on submit
  const saveProfile = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
        // handle image uplaod
        let imageURL
        if(profileImage && (
            profileImage.type === 'image/jpeg' || 
            profileImage.type === 'image/jpg' || 
            profileImage.type === 'image/png'
        )) {
            const image = new FormData()
            image.append('file', profileImage)
            image.append('cloud_name', 'dlpgzeyye')
            image.append('upload_preset', 'dhswvneq')

            // Save image to cloudinary
            const response = await fetch(`https://api.cloudinary.com/v1_1/dlpgzeyye/image/upload`, { method: 'post', body: image })
            const imageData = await response.json()
            imageURL = imageData.url.toString()
            console.log(imageData)
            setIsLoading(false)
        }
            // Update profile to mongoDB
            const formData = {
              name: profile.name,
              phone: profile.phone,
              photo: profileImage ? imageURL : profile.photo,
              bio: profile.bio
            }

            await updateProfile(formData)
            toast.success('Profile Updated')
    } catch(error) {
      setIsLoading(false)
      toast.error(error.message)
    }

  }

  return (
    <>
    <h2>Edit Profile</h2>
    <div className='profile --my2'>
        {isLoading && <SpinnerImg />}

        <Card cardClass='card --flex-dir-column'>
            <div className='profile-photo'>
                <img src={profile?.photo} alt={profile?.name} />
            </div>
            <div className='edit-form'>
                <form className='--form-control' onSubmit={(e) => saveProfile(e)}> 
                  <label>Name:</label>
                  <input type="text" name='name' value={profile?.name} onChange={(e) => handleInputChange(e)} />
                  <label>Email:</label>
                  <input type="text" name='email' value={profile?.email} disabled />
                  <code>Email must remain the same</code>
                  <label>Phone:</label>
                  <input type="text" name='phone' value={profile?.phone} onChange={(e) => handleInputChange(e)} />
                  <label>Image:</label>
                  <input type="file" name='image' onChange={(e) => handleImageChange (e)} />
                  <label>Bio:</label>
                  <textarea name="bio" cols="30" rows="10" value={profile?.bio} onChange={(e) => handleInputChange(e)}></textarea>
                <button className='--btn --btn-primary' type='submit'>Edit Profile</button>
                </form>
            </div>
        </Card>
    </div>
    </>
  )
}

export default EditProfile