import { Route, Routes, Navigate } from 'react-router-dom';
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


function App() {

  const dispatch = useDispatch()
  const token = useSelector(
    state => state.user.token
  )

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
            }
            setIsLoading(false)
        }
      ).catch(
        err => {
          setTokenValid(false)
          setIsLoading(false)
        }
      )
    }}, [token])

  return (
    <>
        <Routes>
          <Route exact path='/register' element={isLoading ? <LoadingPage/> : tokenValid ? <Navigate to="/" /> : <Register />} />
          <Route exact path='/login' element={isLoading ? <LoadingPage/> : tokenValid ? <Navigate to="/" /> : <Login />} />
          <Route exact path="/*" element={isLoading ? <LoadingPage /> : tokenValid ? <AppRoutes tokenValidation={tokenValid} /> : <MainPage tokenValidation={false}/>} />
        </Routes>
    </>
  )
}

export default App
