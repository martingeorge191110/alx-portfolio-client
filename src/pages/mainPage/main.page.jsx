import React from "react";
import Navbar from "../../components/nav_bar/nav_bar";


const MainPage = ({tokenValidation}) => {


   return (
      <>
         <Navbar tokenValidation={tokenValidation}/>
      </>
   )
}

export default MainPage;
