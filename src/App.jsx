import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Register from './pages/auth/register';
import Login from './pages/auth/login';
import { useDispatch, useSelector } from 'react-redux';
import {  useEffect, useLayoutEffect, useState } from 'react';
import Navbar from './components/nav_bar/nav_bar.jsx';
import Profile from './pages/profile/profile.jsx';
import AppRoutes from './main.routes.jsx';
import { TokenValidApi } from './services/user.js';
import LoadingPage from './pages/loading/loading.page.jsx';
import MainPage from './pages/mainPage/main.page.jsx';
import { TokenValidAction } from './redux/actions.js';
import ForgotPassword from './pages/auth/forget.password.jsx';
import CheckPasswordCode from './pages/auth/check.password.code.jsx';


function App() {

  const dispatch = useDispatch()
  const token = useSelector(
    state => state.user.token
  )

    const navigate = useNavigate()
    const [tokenValid, setTokenValid] = useState(false)

    const [isLoading, setIsLoading] = useState(true)

    useLayoutEffect(() => {
      setIsLoading(true)
      if (!token) {
        setIsLoading(false)
        return;
      } else {
      TokenValidApi({token}).then(
        res => {
            if (res.success) {
              dispatch(TokenValidAction(res.user))
              setTokenValid(true)
            } else {
              localStorage.removeItem("token")
              navigate('/')
            }
            setIsLoading(false)
            
        }
      ).catch(
        err => {
          setTokenValid(false)
          setIsLoading(false)
          localStorage.removeItem("token")
          navigate('/')
        }
      )
    }}, [token])

  return (
    <>
        <Routes>
          <Route exact path='/register' element={isLoading ? <LoadingPage/> : tokenValid ? <Navigate to="/" /> : <Register />} />
          <Route exact path='/login' element={isLoading ? <LoadingPage/> : tokenValid ? <Navigate to="/" /> : <Login />} />
          <Route exact path='/forgot-password' element={isLoading ? <LoadingPage/> : tokenValid ? <Navigate to="/" /> : <ForgotPassword />} />
          <Route exact path='/check-password-code' element={isLoading ? <LoadingPage/> : tokenValid ? <Navigate to="/" /> : <CheckPasswordCode />} />
          <Route exact path="/*" element={isLoading ? <LoadingPage /> : tokenValid ? <AppRoutes tokenValidation={tokenValid} /> : <Navigate to="/" />} />
          <Route exact path='/' element={isLoading ? <LoadingPage /> : <MainPage tokenValidation={tokenValid}/>}/>
        </Routes>
    </>
  )
}

export default App
