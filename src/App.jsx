import { Route, Routes } from 'react-router-dom';
import Register from './pages/auth/register';
import Login from './pages/auth/login';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';


function App() {

  const token = useSelector(
    state => state.user.token
  )

    const [tokenValid, setTokenValid] = useState(false)
  // useEffect()
  return (
    <>
      <Routes>
        <Route exact path='/register' element={token ? "" : <Register />} />
        <Route exact path='/login' element={token ? "" : <Login />} />
      </Routes>
    </>
  )
}

export default App
