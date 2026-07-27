import React from 'react'
import Hero from '../components/Hero'
import CategoryStrip from '../components/CategoryStrip'
import FeaturedProducts from '../components/FeaturedProducts'
import PromoBanner from '../components/PromoBanner'
import TrustBadges from '../components/TrustBanges'
import Newsletter from '../components/NewsLetter'
import ShopPage from './ShopPage'
import ProductDetail from './ProductDetail'
import CartPage from './CartPage'
import CheckoutPage from './CheckoutPage'
import AuthPage from './AuthPage'
import AccountPage from './AccountPage'

const Home = () => {
  return (
    <> 
    <Hero/>
   <CategoryStrip/>
   <FeaturedProducts/>
   <PromoBanner/>
   <TrustBadges/>
   <Newsletter/>
   {/* <ShopPage/> */}
   {/* <ProductDetail/> */}
   {/* <CartPage/> */}
   {/* <CheckoutPage/> */}
   {/* <AuthPage/> */}
   {/* <AccountPage/> */}
   
   </>
  
  )
}

export default Home