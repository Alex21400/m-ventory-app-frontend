import React, { useState } from 'react'
import './Contact.scss'
import Card from '../../components/card/Card'
import contactImg from '../../assets/contact.svg'
import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa'
import { MdLocationOn } from 'react-icons/md'
import { AiFillGithub } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { BACKEND_URL } from '../../services/authService'
import axios from 'axios'

const Contact = () => {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const data = {
    subject,
    message
  }

  const sendEmail = async (e) => {
    e.preventDefault()

    try {
        const response = await axios.post(`${BACKEND_URL}/api/contact`, data)
        setSubject('')
        setMessage('')
        toast.success(response.message)
    }catch(error) {
        toast.error(error.message)
    }
  }

  return (
    <div className='contact'>
        <Card cardClass={'card'}>
            
            <div className="data">
                <div className='image'>
                    <img src={contactImg} alt="Contact us..." />
                </div>
                <form onSubmit={(e) => sendEmail(e)}>
                    <label>Subject:</label>
                    <input type="text" name='subject' required value={subject} onChange={(e) => setSubject(e.target.value)} />
                    <label>Message:</label>
                    <textarea name="message" id="" cols="30" rows="10" required value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                    <button className='--btn --btn-primary --btn-block' type='submit'>Send Message</button>
                </form>
            </div>
            <div className="info">
                    <h3>Our Contact Information</h3>
                    <p>Send us a message, or reach us via other channels</p>

                    <div className="icons">
                        <span>
                            <FaPhoneAlt size={18}/>
                            <p>+381 60 510 50502</p>
                        </span>
                        <span>
                            <FaEnvelope size={18}/>
                            <p>support@m-ventory.com</p>
                        </span>
                        <span>
                            <MdLocationOn size={20}/>
                            <p>Novi Sad, Serbia</p>
                        </span>
                        <span>
                            <AiFillGithub size={18}/>
                            <Link to='https://github.com/Alex21400' target='_blank'>
                                <p>@Alex21400</p>
                            </Link>
                        </span>
                    </div>
                </div>
        </Card>
    </div>
  )
}

export default Contact