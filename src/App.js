import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getLoginStatus } from './services/authService';
import { SET_LOGIN } from './redux/features/auth/authSlice';

// Pages
import Home from './pages/home/Home';
import RootLayout from './pages/layout/RootLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register'
import ResetPassword from './pages/auth/ResetPassword'
import ForgotPassword from './pages/auth/ForgotPassword'
import Dashboard from './pages/dashboard/Dashboard';
import AddProduct from './pages/addProduct/AddProduct';
import Stats from './pages/stats/Stats';
import ProductDetails from './components/product/productDetails/ProductDetails';
import EditProduct from './pages/editProduct/EditProduct';
import Profile from './pages/profile/Profile';
import EditProfile from './pages/profile/EditProfile';
import Contact from './pages/contact/Contact';
import ChangePassword from './pages/profile/ChangePassword';

// Set withCredentials for axios across whole app
axios.defaults.withCredentials = true

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    // Set login status when user is logged in or logged out
    async function loginStatus() {
      const status = await getLoginStatus()
      dispatch(SET_LOGIN(status))
    }

    loginStatus()
  }, [dispatch])

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<RootLayout />} >
      <Route index element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='forgot-password' element={<ForgotPassword />} />
      <Route path='resetpassword/:resetToken' element={<ResetPassword />} />

      <Route path='dashboard' element={<Dashboard />}>
        <Route path='stats' element={<Stats />} />
        <Route path='stats/product-details/:id' element={<ProductDetails />} />
        <Route path='stats/edit-product/:id' element={<EditProduct />} />
        <Route path='add-product' element={<AddProduct />} />
        <Route path='profile' element={<Profile />} />
        <Route path='edit-profile' element={<EditProfile />} />
        <Route path='contact-us' element={<Contact />} />
        <Route path='change-password' element={<ChangePassword />} />
      </Route>
    </Route>
  ))

  return (
    <div>
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

// green #03daa4
