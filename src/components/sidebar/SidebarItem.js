import React, { useState } from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { NavLink } from 'react-router-dom'


const activeLink = ({ isActive }) => (isActive ? 'active' : 'link')
const activeSublink = ({ isActive }) => (isActive ? 'active' : 'link')

const SidebarItem = ({ item, isOpen }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  // Items with child
  if(item.children) {
    return(<div className={isExpanded ? `sidebar-item s-parent open` : `sidebar-item s-parent`}>
            <div className='sidebar-title'>
              <span>
                {item.icon && <div className='icon' style={{ marginLeft: '3px' }}>{item.icon}</div>}
                {isOpen && <div>{item.title}</div>}
              </span>
              <MdKeyboardArrowRight size={25} className='arrow-icon' onClick={() => setIsExpanded(!isExpanded)}/>
            </div>
            <div className='sidebar-content'>
              {item.children.map((child, index) => {
                return (
                  <div key={index} className='s-child'>
                    <NavLink to={child.path} className={activeSublink}>
                      <div className='sidebar-item'>
                        <div className="sidebar-title">
                          {child.icon && <div className='icon'>{child.icon}</div>}
                          {isOpen && <div>{child.title}</div>}
                        </div>
                      </div>
                    </NavLink>
                  </div>  
                )
              })}
            </div>
          </div>)
  } else {
    // Regular items
    return (
      <NavLink to={item.path} className={activeLink}>
        <div className='sidebar-item'>
          <div className='sidebar-title'>
            <span>
              {item.icon && <div className='icon'>{item.icon}</div>}
              {isOpen && <div>{item.title}</div>}
            </span>
          </div>
        </div>
      </NavLink>
    )
  }
}

export default SidebarItem