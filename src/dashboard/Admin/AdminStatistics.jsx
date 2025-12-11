import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie } from 'recharts';

const AdminStatistics = () => {
  const [stats, setStats] = useState({
    users: 0,
    requests: 0,
    orders: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);

  const data = [
    { name: 'Users', value: stats.users },
    { name: 'Requests', value: stats.requests },
    { name: 'Orders', value: stats.orders },
    { name: 'Revenue', value: stats.revenue }
  ];

  const pieData = [
    { name: 'Total Users', value: stats.users },
    { name: 'Total Requests', value: stats.requests },
    { name: 'Total Orders', value: stats.orders }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("access-token");
      try {
        const res = await axios.get("http://localhost:3000/admin-stats", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="flex justify-center mt-10"><span className="loading loading-spinner loading-lg"></span></div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-8">Hi, Welcome Back!</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="stat bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl text-white shadow-lg">
          <div className="stat-figure text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <div className="stat-title text-white opacity-90">Revenue</div>
          <div className="stat-value text-4xl">${stats.revenue}</div>
          <div className="stat-desc text-white opacity-80">Jan 1st - Feb 1st</div>
        </div>

        <div className="stat bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl text-white shadow-lg">
          <div className="stat-figure text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
          </div>
          <div className="stat-title text-white opacity-90">Users</div>
          <div className="stat-value text-4xl">{stats.users}</div>
          <div className="stat-desc text-white opacity-80">↗︎ 400 (22%)</div>
        </div>

        <div className="stat bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl text-white shadow-lg">
          <div className="stat-figure text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
          </div>
          <div className="stat-title text-white opacity-90">Requests</div>
          <div className="stat-value text-4xl">{stats.requests}</div>
          <div className="stat-desc text-white opacity-80">↘︎ 90 (14%)</div>
        </div>
        
        <div className="stat bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl text-white shadow-lg">
           <div className="stat-figure text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
          </div>
          <div className="stat-title text-white opacity-90">Orders</div>
          <div className="stat-value text-4xl">{stats.orders}</div>
          <div className="stat-desc text-white opacity-80">↗︎ 5 (2%)</div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mt-10">
        <div className="w-full lg:w-1/2 h-[400px] p-6 shadow-xl rounded-xl border bg-white">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Bar dataKey="value" fill="#8884d8" shape={<triangleBar />} label={{ position: 'top' }}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % 20]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full lg:w-1/2 h-[400px] p-6 shadow-xl rounded-xl border bg-white">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminStatistics;