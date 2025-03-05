import { Route, Routes } from 'react-router-dom';
import Register from './pages/auth/register';
import Login from './pages/auth/login';


function App() {

  return (
    <>
      <Routes>
        <Route exact path='register' element={<Register/>}/>
        <Route exact path='login' element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App
