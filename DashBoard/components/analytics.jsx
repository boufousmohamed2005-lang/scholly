import React, { useState } from "react";
import {
  LayoutDashboard,
  Trophy,
  CalendarCheck,
  DollarSign,
  Users,
  School2
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./analytics.css";

export default function Analytics({children,lineData,barData}) {

  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "School Overview", icon: <School2/> },
    { id: "performance", label: "Acc Performance", icon: <Trophy /> },
    { id: "attendance", label: "Attendance Report", icon: <CalendarCheck /> },
    { id: "finance", label: "Financial Report", icon: <DollarSign /> },
    
  ];

 

  return (
    <div className="dashborard-containe">
      <h3>Reports & Analytics</h3><br />
      <div className="tab-bar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Conditional Render */}
      <div className="tab-content">
        {activeTab === "overview" && (
          <>
           

            <div className="chart-row">
              <div className="chart-card">
                <h3>Enrollment Trends</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="students"
                      stroke="#2563eb"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-card">
                <h3>Department Statistics</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="dept" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            {children}
          </>
        )}

        {activeTab === "attendance" && (
          
          <div className="chart-card full">
            <h3>Attendance Trends</h3>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="9 9" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="students" stroke="#22c55e" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

       

       
      </div>
    </div>
  );
}


