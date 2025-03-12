import React, { lazy, Suspense } from "react";
import Navbar from "../../components/nav_bar/nav_bar";

const LandingPageNotAuth = lazy(() => import("../landing_page_not_auth/landing.page.not"));

const MainPage = ({ tokenValidation }) => {
   return (
      <>
         <Navbar tokenValidation={tokenValidation} />
         <Suspense fallback={<div>Loading...</div>}>
            <LandingPageNotAuth />
         </Suspense>
      </>
   );
};

export default MainPage;
