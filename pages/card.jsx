// import React from "react"
// import "./Card.css" // optionnel, si tu veux ajouter du style spécifique au Card

// export function Card({ children, className = "" }) {
//   return <div className={`card ${className}`}>{children}</div>
// }

// export function CardContent({ children, className = "" }) {
//   return <div className={`card-content ${className}`}>{children}</div>
// }
import React from "react";
import "./home.css";

export function Button({ children, variant = "primary", size = "md", className = "", ...props }) {
  return (
    <button className={`btn ${variant} ${size} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function Card({ children, className = "", ...props }) {
  return (
    <div className={`card ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = "", ...props }) {
  return (
    <div className={`card-content ${className}`} {...props}>
      {children}
    </div>
  );
}

