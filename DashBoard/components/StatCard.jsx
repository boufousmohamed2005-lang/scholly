import React from "react";
import "./statcard.css";
import { ArrowUp } from "lucide-react";

const StatCard = ({ title, value = 0, icon, color, setActiveItem, id }) => {
  return (
    <div
      className="stat-card"
      style={{
        "--card-color": color,
        borderTop: `4px solid ${color}`,
      }}
    >
      <div className="stat-info">
        <p className="stat-title">{title}</p>
        <h2 className="stat-value">{value}</h2>

        <nav className="statistique">
          <p>
            <ArrowUp size={18} color="rgb(3, 255, 3)" /> {value}%
          </p>
          <span>vs last month</span>
        </nav>
      </div>

      <span
        className="stat-icon"
        style={{ backgroundColor: color }}
        onClick={() => setActiveItem && setActiveItem(id)}
      >
        {icon}
      </span>
    </div>
  );
};

export default StatCard;
