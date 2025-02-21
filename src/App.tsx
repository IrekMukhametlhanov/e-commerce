import React, { Suspense } from "react";
import PrivateRoutes from "pages/routes/PrivateRoutes";
import { AppStyles, Footer } from "AppStyled";
import Header from "features/Header";
import { useLocation } from "react-router-dom";
import { paths } from "routes/helpers";
import PublicRoutes from "routes/PublicRoutes";
function App() {
 const location = useLocation()
const notIsAuthPage = ![paths.login, paths.register].includes(location.pathname)

  return (
    <>
    <AppStyles/>
     {notIsAuthPage && <Header />}
      <Suspense fallback={"Loading..."}>
        <PublicRoutes  />
      </Suspense>
      {notIsAuthPage && (
        <Footer>Магазин номер</Footer>
      )}
    </>
  );
}

export default App;
