import React from 'react'
import { Link } from 'react-router-dom'
import './Home.scss'
import heroImg from '../../assets/inv-img.png'
import M from '../../assets/M.png'
import { ShowOnLogin, ShowOnLogout } from '../../components/hiddenLinks/hiddenLinks'

const Home = () => {
  return (
    <div className='home'>
        <nav className='container --flex-between'>
            <div className='logo'>
                <img src={M} alt="logo.png" width={50}/>
            </div>
            <ul className='home-links'>
                <ShowOnLogout>
                    <li><Link to='register'>Register</Link></li>
                </ShowOnLogout>
                <ShowOnLogout>
                    <li>
                        <button className='--btn --btn-primary'>
                            <Link to='login'>Login</Link>
                        </button>               
                    </li>
                </ShowOnLogout>
                <ShowOnLogin>
                    <li>
                        <button className='--btn --btn-primary'>
                            <Link to='dashboard/stats'>Dashboard</Link>
                        </button>               
                    </li>
                </ShowOnLogin>
            </ul>
        </nav>
        {/* HERO SECTION */}
        <section className="container hero">
            <div className='hero-text'>
                <h2>Your Solution for Inventory and Stock Management</h2>
                <p>Managing products in the warehouse has never been easier! Level-up your business with this app, using our system to manage and control your inventory.</p>
                <div className="hero-buttons">
                    <button className='--btn --btn-secondary'>
                        <Link to='dashboard/stats'>Free Trial 1 Month</Link>
                    </button>  
                </div>
                <div className='--flex-start'>
                    <div className='--mr'>
                        <h3 className='--color-white'>13k+</h3>
                        <p className='--color-white'>Brand Owners</p>
                    </div>
                    <div className='--mr'>
                        <h3 className='--color-white'>21k+</h3>
                        <p className='--color-white'>Active users</p>
                    </div>
                    <div className='--mr'>
                        <h3 className='--color-white'>400+</h3>
                        <p className='--color-white'>Partners</p>
                    </div>
                </div>
            </div>
            <div className="hero-image">
                <img src={heroImg} alt="heroImg" />
            </div>
        </section>
    </div>
  )
}

export default Home