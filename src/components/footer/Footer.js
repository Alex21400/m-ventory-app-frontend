import React from 'react'

const Footer = ({ isOpen }) => {
  return (
    <div className='--flex-center --py2' style={{ paddingLeft: isOpen ? '240px' :'70px', transition: 'all 0.5s' }}>
        <p>All rights reserved.&copy; M-ventory by Alex 2023.</p>
    </div>
  )
}

export default Footer