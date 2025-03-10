import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/nav_bar/nav_bar.jsx';
import Profile from './pages/profile/profile.jsx';
import { useSelector } from 'react-redux';
import LoadingPage from './pages/loading/loading.page.jsx';
import CompanyDashboard from './pages/company_dashboard/company.dashboard.jsx';
import CompanySearch from './pages/searching_companies/searching.companies.jsx';



function AppRoutes({tokenValidation}) {


   const loading = useSelector(
      state => state.user.loading
   )

   return (
      <> 
         
         {!loading && <Navbar tokenValidation={tokenValidation}/>}
         <Routes>
            <Route exact path='/profile' element={!tokenValidation ? <Navigate to={'/'}/> : <Profile />} />
            <Route exact path='/company/:id' element={!tokenValidation ? <Navigate to={'/'}/> : <CompanyDashboard />} />
            <Route exact path='/company/search' element={!tokenValidation ? <Navigate to={'/'}/> : <CompanySearch />} />
         </Routes>
      </>
   )
}

export default AppRoutes;
