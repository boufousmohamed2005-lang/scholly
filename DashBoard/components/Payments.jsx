import React from 'react';
import StatCard from './StatCard';

const Payments = () => {
  const stats = [
    { title: 'Total Revenue', value: '$250,000', icon: '💰' },
    { title: 'Pending Payments', value: '$15,000', icon: '⏳' },
    { title: 'Paid Students', value: '1,100', icon: '✅' },
    { title: 'Overdue Payments', value: '50', icon: '⚠️' },
  ];

  return (
    <div>
      <h2>Payments Management</h2>
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <StatCard key={index} title={stat.title} value={stat.value} icon={stat.icon} />
        ))}
      </div>
      <p>Here you can manage tuition fees, payments, and financial records.</p>
    </div>
  );
};

export default Payments;
