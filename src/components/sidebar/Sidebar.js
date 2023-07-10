import './Sidebar.scss'
import { HiMenuAlt3 } from 'react-icons/hi'
import M from '../../assets/M.png'
import menu from '../../data/sidebar'
import SidebarItem from './SidebarItem'
import { useNavigate } from 'react-router-dom'

const Sidebar = ({ isOpen, toggleMenu }) => {
  const navigate = useNavigate()

  const navigateHome = () => {
    navigate('/')
  }

  return (
    <div className='layout'>
        <div className='sidebar' style={{ width: isOpen ? '230px' : '60px' }}>
            <div className='top_section'>
                <div className="logo" style={{ display: isOpen ? 'block' : 'none' }} onClick={navigateHome}>
                    <img src={M} alt="logo.png" />
                </div>
                <div className="bars" style={{ marginLeft: isOpen ? '100px' : '0px'}}>
                    <HiMenuAlt3 size={35} onClick={toggleMenu} />
                </div>
            </div>
          {menu.map((item, index) => {
            return (
              <SidebarItem key={index} item={item} isOpen={isOpen}/>
            )
          })}
        </div>
    </div>
  )
}

export default Sidebar