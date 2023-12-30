import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate, } from "react-router-dom";
import Home from './pages/home/Home';
import Order from './pages/Order/Order';
import Cart from './pages/cart/Cart';
import Dashboard from './pages/admin/dashboard/Dashboard';
import Nopage from './pages/nopage/Nopage';
import MyState from './context/data/myState';
import Login from './pages/registration/Login';
import Signup from './pages/registration/Signup';
import ProductInfo from './pages/productInfo/ProductInfo';
import AddProduct from './pages/admin/pages/AddProduct';
import UpdateProduct from './pages/admin/pages/UpdateProduct';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function App() {
  return (
    <div>
      <MyState>
        <Router>
          <Routes>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/order' element={
              <ProtectedRoute>
                <Order></Order>
              </ProtectedRoute>
            }></Route>
            <Route path='/cart' element={<Cart></Cart>}></Route>
            <Route path="/dashboard" element={
              <ProtectedRouteForAdmin>
                <Dashboard></Dashboard>
              </ProtectedRouteForAdmin>
            } />
            <Route path='/login' element={<Login></Login>}></Route>
            <Route path='/signup' element={<Signup></Signup>}></Route>
            <Route path="/productinfo/:id" element={<ProductInfo></ProductInfo>}></Route>
            <Route path='/addproduct' element={
              <ProtectedRouteForAdmin>
                <AddProduct></AddProduct>
              </ProtectedRouteForAdmin>
            }></Route>
            <Route path='/updateproduct' element={
              <ProtectedRouteForAdmin>
                <UpdateProduct></UpdateProduct>
              </ProtectedRouteForAdmin>
            }></Route>
            <Route path="/*" element={<Nopage></Nopage>} />
          </Routes>
          <ToastContainer></ToastContainer>
        </Router>
      </MyState>

    </div>
  )
}

// user

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user')

  if (user) {
    return children
  } else {
    return <Navigate to={'/login'} />
  }
}

// Admin

const ProtectedRouteForAdmin = ({children}) =>{
  const admin = JSON.parse(localStorage.getItem('user'))

  if(admin.user.email === 'dkanani456@gmail.com'){
    return children
  }else {
    return <Navigate to={'/login'} />
  }
}

