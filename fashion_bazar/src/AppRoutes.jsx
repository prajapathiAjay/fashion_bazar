import React from 'react'
import {Routes,Route} from "react-router-dom"
import { PublicLayout } from './layouts/PublicLayout'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AuthPage from './pages/AuthPage'
import ShopPage from './pages/ShopPage'
import ProductDetail from './pages/ProductDetail'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import AccountPage from './pages/AccountPage'

const AppRoutes = () => {
  return (
    // <div>AppRoutes</div>
    <Routes>
        <Route element={<PublicLayout/>}>
         <Route path="/" element={<Home />} />
          <Route path="/products" element={<ShopPage />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/categories" element={<ShopPage />} />
          <Route path="/categories/:categorySlug" element={<ShopPage />} />
          <Route path="/new-arrivals" element={<ShopPage />} />
          <Route path="/deals" element={<ShopPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/orders/:orderId" element={<AccountPage />} />

        </Route>
      
        <Route path="login" element={<AuthPage/>}/>



    </Routes>
  )
}

export default AppRoutes