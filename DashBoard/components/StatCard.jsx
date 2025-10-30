import React from "react";
 import "./statcard.css";
import { ArrowUp } from "lucide-react";
const StatCard = ({ title, value = 0, icon, color,setActiveItem,id }) => {
  return (
    
    
    <div className="stat-card" style={{ "--card-color": color,borderTop: `5px solid ${color}` }}>
     

      <div className="stat-info" style={{}}>
        <p className="stat-title">{title}</p>
        <h2 className="stat-value">{value }</h2>
        {/* <nav> | 5% vs last month </nav> */}
       {/* ici je veut faire les statistiques des users modification   */}
       <nav  className="statistique" ><p > <ArrowUp size={8}  color="rgb(3, 255, 3)" /> {value}%</p>   vs last month    </nav>
      </div>
      
        <span className="stat-icon" style={{backgroundColor:color}} onClick={() => setActiveItem(id)} >{icon}</span>
   
      {/* <Link className="link" to={to}> <Plus /> {title} Étudiants</Link> */}
     {/* < button className="add-button" onClick={() => setActiveItem(id)}>
        ➕ {title} 
      </button> */}
       
    </div>
   
  );
};

export default StatCard;
