import { useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import useRedirectLoggedOutUser from '../../components/customHooks/useRedirectLoggedOutUser'

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true)  

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  useRedirectLoggedOutUser('/')

  return (
    <div>
        <Sidebar isOpen={isOpen} toggleMenu={toggleMenu} />
        <Header  isOpen={isOpen}/>
        <main style={{ paddingLeft: isOpen ? '240px' : '70px', transition: 'all 0.5s' }}>   
            <Outlet />
        </main>
        <Footer isOpen={isOpen}/>
    </div>
  )
}

export default Dashboard