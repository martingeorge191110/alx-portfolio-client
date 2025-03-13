import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/nav_bar/nav_bar.jsx';
import Profile from './pages/profile/profile.jsx';
import { useSelector } from 'react-redux';
import CompanyDashboard from './pages/company_dashboard/company.dashboard.jsx';
import CompanySearch from './pages/searching_companies/searching.companies.jsx';
import MainPage from './pages/mainPage/main.page.jsx';
import LandingPageNotAuth from './pages/landing_page_not_auth/landing.page.not.jsx';
import UserNotificationCard from './components/notifications/notifications.jsx';



function AppRoutes({tokenValidation}) {


   const loading = useSelector(
      state => state.user.loading
   )


   return (
      <> 
         {/* <UserNotificationCard user={{f_n: 'martin', l_n: "george", avatar: "awdawd"}}/> */}
         {!loading && <Navbar tokenValidation={tokenValidation}/>}
         <Routes>
            <Route exact path='/profile' element={!tokenValidation ? <Navigate to={'/'}/> : <Profile />} />
            <Route exact path='/company/:id' element={!tokenValidation ? <Navigate to={'/'}/> : <CompanyDashboard />} />
            <Route exact path='/company/search' element={!tokenValidation ? <Navigate to={'/'}/> : <CompanySearch />} />
            <Route path='/*' element={<LandingPageNotAuth/>}/>
         </Routes>
      </>
   )
}

export default AppRoutes;
