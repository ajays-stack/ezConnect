import React from 'react'
import { Route, Routes,Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import SettingsPage from './pages/SettingsPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import Navbar from './components/Navbar'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
import {Toaster} from 'react-hot-toast'

import {Loader} from 'lucide-react'
import { useThemeStore } from './store/useThemeStore'
const App = () => {
const {theme}=useThemeStore()
  const {authUser,checkAuth,isCheckingAuth,onlineUsers}=useAuthStore();

  console.log("online",onlineUsers)

  useEffect(()=>{
    checkAuth()
  },[checkAuth]);

  console.log({authUser});

if(isCheckingAuth&&!authUser) return (
  <div className="flex items-center justify-center h-screen" >
      
  <Loader className='size-10 animate-spin'></Loader>

  </div>
)

  return (
    <div data-theme={theme}  >
    <Navbar></Navbar>


    <Routes>
      <Route path='/*'element={authUser?<HomePage></HomePage>:<Navigate to ="/login"/>}></Route>
      <Route path='/home' element={authUser?<HomePage></HomePage>:<Navigate to ="/login"/>}></Route>
      <Route path='/signup' element={!authUser?<SignUpPage></SignUpPage>:<Navigate to='/'></Navigate>}></Route>
      <Route path='/login' element={!authUser?<LoginPage></LoginPage>:<Navigate to='/'></Navigate>}></Route>
      <Route path='/profile' element={authUser?<ProfilePage></ProfilePage>:<Navigate to='/login'></Navigate>}></Route>
      <Route path="/settings" element={<SettingsPage></SettingsPage>}></Route>
    </Routes>
    <Toaster/>
    </div>
  )
}

export default App
