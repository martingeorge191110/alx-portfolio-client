import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/nav_bar/nav_bar.jsx';
import Profile from './pages/profile/profile.jsx';
import { useSelector } from 'react-redux';
import LoadingPage from './pages/loading/loading.page.jsx';



function AppRoutes({tokenValidation}) {


   const loading = useSelector(
      state => state.user.loading
   )

   return (
      <> 
         
         {!loading && <Navbar tokenValidation={tokenValidation}/>}
         <Routes>
            <Route exact path='/profile' element={!tokenValidation ? <Navigate to={'/'}/> : <Profile />} />
         </Routes>
      </>
   )
}

export default AppRoutes;
