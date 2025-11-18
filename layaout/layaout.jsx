import { Outlet, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Layaout() {
   const location = useLocation();
   return (
     <>
    {location.pathname == "/dashboard" && <h2 style={{position:"fixed", top:"0",
      left:"0", textAlign:"center", width:"100%",
   menuItemFadeInUp:"0.3s ease-out forwards",
   borderBottom:"1px solid blue",
   filter:"drop-shadow(0px 0px 5px blue)",
       color:"white",backgroundColor:"blue",zIndex:"1"}}> 
      Welcome Back  In Your Home Dashboard {location.search}  </h2>}
        <Outlet />
     
     </>
   ) 
};
