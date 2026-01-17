import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const AnalyticsDashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30D');
  const [animateStats, setAnimateStats] = useState(false);

  // Sample data
  const statsData = [
    { title: 'Total API Calls', value: '12,847', change: '+23.5%', positive: true, icon: '🔥' },
    { title: 'Total Cost', value: '$247.89', change: '+12.3%', positive: true, icon: '💰' },
    { title: 'Tokens Used', value: '2.4M', change: '+18.7%', positive: true, icon: '🎯' },
    { title: 'Success Rate', value: '98.7%', change: '-0.3%', positive: false, icon: '✅' },
    { title: 'Avg Response Time', value: '1.2s', change: '15% faster', positive: true, icon: '⚡' },
    { title: 'Active Projects', value: '8', change: '+2 new', positive: true, icon: '📱' }
  ];

  const usageData = {
    '7D': [
      { date: 'Mon', calls: 1200, cost: 24.5 },
      { date: 'Tue', calls: 1100, cost: 22.1 },
      { date: 'Wed', calls: 1300, cost: 26.7 },
      { date: 'Thu', calls: 1450, cost: 29.2 },
      { date: 'Fri', calls: 1600, cost: 32.8 },
      { date: 'Sat', calls: 900, cost: 18.3 },
      { date: 'Sun', calls: 800, cost: 16.1 }
    ],
    '30D': [
      { date: 'Week 1', calls: 8500, cost: 170.2 },
      { date: 'Week 2', calls: 9200, cost: 184.5 },
      { date: 'Week 3', calls: 10100, cost: 202.8 },
      { date: 'Week 4', calls: 11200, cost: 224.7 }
    ],
    '90D': [
      { date: 'Month 1', calls: 35000, cost: 700.5 },
      { date: 'Month 2', calls: 38500, cost: 770.2 },
      { date: 'Month 3', calls: 42000, cost: 840.8 }
    ],
    '1Y': [
      { date: 'Q1', calls: 120000, cost: 2400.5 },
      { date: 'Q2', calls: 135000, cost: 2700.2 },
      { date: 'Q3', calls: 148000, cost: 2960.8 },
      { date: 'Q4', calls: 162000, cost: 3240.1 }
    ]
  };

  const modelDistribution = [
    { name: 'GPT-4 Turbo', value: 45, color: '#6366f1' },
    { name: 'Claude Sonnet 4', value: 30, color: '#8b5cf6' },
    { name: 'GPT-3.5 Turbo', value: 20, color: '#06b6d4' },
    { name: 'DALL-E 3', value: 5, color: '#f59e0b' }
  ];

  const apiUsageData = [
    {
      model: 'GPT-4 Turbo',
      requests: '8,542',
      tokens: '1.2M',
      cost: '$147.23',
      successRate: '99.2%',
      avgTime: '0.9s',
      status: 'Active'
    },
    {
      model: 'Claude Sonnet 4',
      requests: '3,287',
      tokens: '847K',
      cost: '$67.45',
      successRate: '98.7%',
      avgTime: '1.1s',
      status: 'Active'
    },
    {
      model: 'GPT-3.5 Turbo',
      requests: '987',
      tokens: '234K',
      cost: '$12.34',
      successRate: '97.8%',
      avgTime: '0.7s',
      status: 'Active'
    },
    {
      model: 'DALL-E 3',
      requests: '31',
      tokens: '-',
      cost: '$20.87',
      successRate: '96.7%',
      avgTime: '12.3s',
      status: 'Limited'
    }
  ];

  useEffect(() => {
    setAnimateStats(true);
  }, []);

 

  const StatCard = ({ stat, index }) => (
    <div 
      className={`bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-600 rounded-2xl p-6 relative overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-2xl ${
        animateStats ? 'animate-fade-in' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
      
      <div className="flex justify-between items-start mb-4">
        <div className="text-sm text-slate-400 font-medium">{stat.title}</div>
        <div className="text-2xl p-2 bg-indigo-500/10 rounded-lg">{stat.icon}</div>
      </div>
      
      <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
      
      <div className={`flex items-center gap-1 text-xs ${
        stat.positive ? 'text-green-400' : 'text-red-400'
      }`}>
        <span>{stat.positive ? '↗' : '↘'}</span>
        <span>{stat.change} from last month</span>
      </div>
    </div>
  );

  const TimeSelector = () => (
    <div className="flex gap-2">
      {['7D', '30D', '90D', '1Y'].map(range => (
        <button
          key={range}
          onClick={() => setSelectedTimeRange(range)}
          className={`px-3 py-1 text-sm rounded-md transition-all ${
            selectedTimeRange === range
              ? 'bg-indigo-500 text-white'
              : 'border border-slate-600 text-slate-400 hover:text-white hover:border-slate-500'
          }`}
        >
          {range}
        </button>
      ))}
    </div>
  );

  const StatusBadge = ({ status }) => (
    <span className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${
      status === 'Active' 
        ? 'bg-green-500/10 text-green-400' 
        : 'bg-red-500/10 text-red-400'
    }`}>
      {status}
    </span>
  );

  return (
    <div className="flex h-screen bg-slate-900 text-white overflow-hidden">
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex-shrink-0 p-6 border-b border-slate-700 bg-slate-900">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-1">
            Analytics Dashboard
          </h1>
          <p className="text-slate-400 text-sm">Monitor your AI usage, costs, and performance metrics</p>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800 hover:scrollbar-thumb-slate-500">
          <div className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
            {statsData.map((stat, index) => (
              <StatCard key={stat.title} stat={stat} index={index} />
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
            {/* Usage Chart */}
            <div className="xl:col-span-2 bg-slate-800 border border-slate-700 rounded-xl p-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                <h3 className="text-lg font-semibold text-white">API Usage Over Time</h3>
                <TimeSelector />
              </div>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={usageData[selectedTimeRange]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        border: '1px solid #334155',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="calls" 
                      stroke="#6366f1" 
                      strokeWidth={2}
                      dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Model Distribution */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-white mb-4">Model Distribution</h3>
              
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={modelDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {modelDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        border: '1px solid #334155',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-2 mt-3">
                {modelDistribution.map((model, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-2 h-2 rounded-full flex-shrink-0" 
                      style={{ backgroundColor: model.color }}
                    ></div>
                    <span className="text-xs text-slate-300 truncate">{model.name}</span>
                    <span className="text-xs text-slate-400 ml-auto">{model.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Usage Table */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-1">Recent API Usage</h3>
              <p className="text-slate-400 text-sm">Detailed breakdown of your recent API calls and costs</p>
            </div>
            
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="bg-slate-900">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Model
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Requests
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Tokens
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Cost
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Success Rate
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Avg Time
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {apiUsageData.map((row, index) => (
                    <tr key={index} className="border-b border-slate-700 hover:bg-slate-700/50">
                      <td className="px-4 py-3 text-white font-medium text-sm">{row.model}</td>
                      <td className="px-4 py-3 text-slate-300 text-sm">{row.requests}</td>
                      <td className="px-4 py-3 text-slate-300 text-sm">{row.tokens}</td>
                      <td className="px-4 py-3 text-yellow-400 font-medium text-sm">{row.cost}</td>
                      <td className="px-4 py-3 text-slate-300 text-sm">{row.successRate}</td>
                      <td className="px-4 py-3 text-slate-300 text-sm">{row.avgTime}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={row.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        </div>
      </div>

      <style jsx>{`
        /* Custom Scrollbar Styles */
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: #475569 #1e293b;
        }
        
        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #1e293b;
          border-radius: 4px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #475569;
          border-radius: 4px;
          border: 1px solid #1e293b;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }
        
        .scrollbar-thin::-webkit-scrollbar-corner {
          background: #1e293b;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AnalyticsDashboard;