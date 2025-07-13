import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { TrendingUp, BarChart3, Calendar, Target } from 'lucide-react';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ForecastChart = () => {
  const [chartType, setChartType] = useState('line');
  const [timeRange, setTimeRange] = useState('7days');
  const [chartData, setChartData] = useState(null);

  // Generate mock forecast data
  useEffect(() => {
    const generateData = () => {
      let labels, dataPoints;
      
      if (timeRange === '7days') {
        labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        dataPoints = [120, 145, 135, 165, 180, 160, 140];
      } else if (timeRange === '30days') {
        labels = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);
        dataPoints = Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 100);
      } else {
        labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        dataPoints = [1200, 1450, 1350, 1650, 1800, 2100, 2300, 2200, 1900, 1700, 1500, 1400];
      }

      const forecastPoints = dataPoints.map(point => point * (1 + (Math.random() * 0.3 - 0.15)));

      return {
        labels,
        datasets: [
          {
            label: 'Historical Demand',
            data: dataPoints,
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            fill: chartType === 'line',
            tension: 0.4,
          },
          {
            label: 'ML Forecast',
            data: forecastPoints,
            borderColor: 'rgb(34, 197, 94)',
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            borderDash: [5, 5],
            fill: false,
            tension: 0.4,
          }
        ]
      };
    };

    setChartData(generateData());
  }, [timeRange, chartType]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 15,
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };

  const insights = [
    {
      icon: TrendingUp,
      title: 'Growth Trend',
      value: '+12.5%',
      description: 'Projected increase next month',
      color: 'text-green-600 bg-green-100'
    },
    {
      icon: Target,
      title: 'Accuracy',
      value: '94.2%',
      description: 'Model prediction accuracy',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: Calendar,
      title: 'Peak Day',
      value: 'Friday',
      description: 'Highest demand forecast',
      color: 'text-purple-600 bg-purple-100'
    }
  ];

  if (!chartData) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <BarChart3 className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Demand Forecasting</h2>
              <p className="text-gray-600 text-sm">AI-powered demand prediction</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="7days">7 Days</option>
              <option value="30days">30 Days</option>
              <option value="12months">12 Months</option>
            </select>
            
            <select
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="line">Line Chart</option>
              <option value="bar">Bar Chart</option>
            </select>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="h-80 mb-6">
          {chartType === 'line' ? (
            <Line data={chartData} options={chartOptions} />
          ) : (
            <Bar data={chartData} options={chartOptions} />
          )}
        </div>

        {/* Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${insight.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">{insight.value}</p>
                    <p className="text-sm font-medium text-gray-900">{insight.title}</p>
                    <p className="text-xs text-gray-600">{insight.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ForecastChart;