import React from 'react';
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
 
} from 'recharts';

const LineChart = ({ data,title }) => {
  
  return (
    <div className="chart-section">
      <h3 className="chart-title">{title} </h3>
      <ResponsiveContainer width="100%" height={300}>
        <ReLineChart data={data}   margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid  strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          < Tooltip 
           contentStyle={{
                backgroundColor: '#c4c4c4ff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px'
              }}
                   />
          <YAxis />

          <Line type="monotone" dataKey="inscriptions"    stroke="#f6703bff" strokeWidth={2} />
          <Line type="monotone" dataKey="visiteurs"  stroke="#3b82f6" strokeWidth={2} />
         
        </ReLineChart>

      </ResponsiveContainer>

        
    </div>
  );
};

export default LineChart;
