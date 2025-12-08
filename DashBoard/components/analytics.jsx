import React, { useState, useEffect } from "react";
import { School2, Trophy, CalendarCheck, DollarSign } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import api from "../../src/Api";
import "./analytics.css";
import { ComposedChart,    Legend  } from "recharts";

const COLORS = ["#facc15", "#22c55e", "#3b82f6"];
export default function Analytics() {
  const [activeTab, setActiveTab] = useState("overview");
  const [overviewData, setOverviewData] = useState({ lineData: [], barData: [] });
  const [performanceData, setPerformanceData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [financeData, setFinanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { id: "overview", label: "School Overview", icon: <School2 /> },
    { id: "performance", label: "Acc grades ", icon: <Trophy /> },
    { id: "attendance", label: "Attendance Report", icon: <CalendarCheck /> },
    { id: "finance", label: "Financial Report", icon: <DollarSign /> },
  ];

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        setLoading(true);

        const [studentsRes, profsRes , gradesRes  ] = await Promise.all([
          api.get("/etudiants"),
          api.get("/professeurs"),
          api.get("/grades")
        ]);

        const students = studentsRes.data;
        const profs = profsRes.data;
     const grades = gradesRes.data
        // --- Overview: Enrollment Trends (students per class)
        const classes = [...new Set(students.map(s => s.Class))];
        const lineData = classes.map(cls => ({
          month: cls,
          students: students.filter(s => s.Class === cls).length
        }));

        // Department statistics (number of professors per department)
        const barData = profs.reduce((acc, prof) => {
          const dept = prof.Department || "Unknown";
          const existing = acc.find(d => d.dept === dept);
          if (existing) existing.value += 1;
          else acc.push({ dept, value: 1 });
          return acc;
        }, []);

        setOverviewData({ lineData, barData });

        // --- Performance: student average per department
    
const courseAnalysis = grades.reduce((acc, grade) => {
  const subject = grade.subject || "Unknown";

  if (!acc[subject]) {
    acc[subject] = { subject, totalGrade: 0, count: 0, above12: 0 };
  }

  // Vérifier que la note est un nombre valide
  const gradeValue = parseFloat(grade.grade);
  if (!isNaN(gradeValue)) {
    acc[subject].totalGrade += gradeValue;
    acc[subject].count += 1;
    if (gradeValue >= 12) acc[subject].above12 += 1;
  }

  return acc;
}, {});

// Convertir l'objet en tableau
const performanceData = Object.values(courseAnalysis).map(d => ({
  course: d.subject,
  avgGrade: d.count ? +(d.totalGrade / d.count).toFixed(2) : 0,
  students: d.count,
  above12: d.above12
}));

setPerformanceData(performanceData);



        // --- Attendance Trends
        const attendanceChart = students.map((s, index) => ({
          month: `Student ${index + 1}`,
          attendance: s.Attendance
        }));
        setAttendanceData(attendanceChart);

        // --- Finance: salaries
        const financeChart = profs.map(prof => ({
          prof: prof.Name,
          salary: prof.Salary
        }));
        setFinanceData(financeChart);

      } catch (error) {
        console.error("Erreur lors du fetch des données :", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAnalytics();
  }, []);

  if (loading) return <p>Loading analytics...</p>;

  return (
    <div className="dashborard-containe">
      <h3>Reports & Analytics</h3>
      <br />
      <div className="tab-bar">
        {tabs.map(tab => (
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

      <div className="tab-content">
        {/* Overview */}
        {activeTab === "overview" && (
          <div style={{ gap: "20px" }}>
            <div className="chart-row">
              <div className="chart-card">
                <h3>Enrollment Trends</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={overviewData.lineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="students" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-card">
                <h3>Department Statistics</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={overviewData.barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="dept" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <br />
         
          </div>
        )}

        {/* Performance */}
        {activeTab === "performance" && (
          <div className="chart-card full">
            {/* <h3>Department Performance </h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dept" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#facc15" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer> */}

<ResponsiveContainer width="100%" height={350}>
  <ComposedChart data={performanceData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="course" />
    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
   
    <Tooltip />
    <Legend />
    
    {/* Bar: Moyenne des notes */}
    <Bar yAxisId="left" dataKey="avgGrade" fill="#facc15" name="Moyenne GPA" />
    
    {/* Line: Nombre d'étudiants ≥12 */}
    <Line yAxisId="right" type="monotone" dataKey="above12" stroke="#22c55e" name="Étudiants ≥12" strokeWidth={3} />
  </ComposedChart>
</ResponsiveContainer>

  
          </div>
        )}

        {/* Attendance */}
        {activeTab === "attendance" && (
          <div className="chart-card full">
            <h3>Attendance Report</h3>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="9 9" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="attendance" stroke="#22c55e" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Finance */}
        {activeTab === "finance" && (
          <div className="chart-card full">
            <h3>Professor Salaries</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={financeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="prof" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="salary" fill="#ef4444" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
