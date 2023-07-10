import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const RootLayout = () => {
  return (
    <div>
        <ToastContainer />
        <main>
            <Outlet />
        </main>
    </div>
  )
}

export default RootLayout