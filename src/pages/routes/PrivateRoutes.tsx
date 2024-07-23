import React from "react"
import { lazy } from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
import { checkPathMath, paths} from "./helpers";


const HomePage = lazy(() => import('pages/HomePage'))
const ProductDetailsPage = lazy(() => import('pages/ProductDetailsPage'))
const AccountSettingsPage = lazy(() => import('pages/AccountSettingsPage'))
const PrivateRoutes: React.FC = () => {
    const location = useLocation()
    const isMath = checkPathMath(location.pathname, paths)
  return (
    <Routes>
        <Route path={paths.home} element={<HomePage/>} />
        <Route path={paths.accountSettings} element={<AccountSettingsPage />} />
        <Route path={paths.productDetails} element={<ProductDetailsPage/>}  />
        <Route path='*' element={!isMath ? <Navigate to={paths.home} /> : null} />
    </Routes>
  )
};

export default PrivateRoutes
