import { Routes,Route,useLocation } from "react-router-dom";
import Navbar from "../components/navbar";
import Home from "../pages/home";
import Register from "../pages/auth/register";
import Login from "../pages/auth/login";


function Router() {
    const location = useLocation();
    const hideNavbarRoutes = ["/register", "/login"];
    const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);
  return (
    <>
    {!shouldHideNavbar && <Navbar />}
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login />} />
    </Routes>
      
    </>
  )
}

export default Router
