import React from 'react'
import {Routes,Route} from "react-router-dom"
import { PublicLayout } from './layouts/PublicLayout'
import Navbar from './components/Navbar'
import Home from './pages/Home'

const AppRoutes = () => {
  return (
    // <div>AppRoutes</div>
    <Routes>
        <Route element={<PublicLayout/>}>
        <Route path="/" element={<Home/>}/>

        </Route>



    </Routes>
  )
}

export default AppRoutes