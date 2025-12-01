import { Outlet} from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./layaout.css";

export default function Layaout() {
const location = useLocation();
    return(
 <div>
   {
      location.pathname == "/dashboard" && <h3 className="dashboard-header" >
        welcome  </h3>

   }
        <Outlet />
     </div>
   ) 
};
