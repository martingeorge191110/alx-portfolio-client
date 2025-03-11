import React from "react";
import Navbar from "../../components/nav_bar/nav_bar";
import LandingPageNotAuth from "../landing_page_not_auth/landing.page.not";


const MainPage = ({tokenValidation}) => {


   return (
      <>
         <Navbar tokenValidation={tokenValidation}/>
         <LandingPageNotAuth/>
      </>
   )
}

export default MainPage;
