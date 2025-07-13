import React, { useState, useEffect } from 'react';
import { Package, Truck, AlertTriangle, TrendingUp, Clock, DollarSign } from 'lucide-react';

const SummaryCards = () => {
  const [metrics, setMetrics] = useState({
    totalSKUs: 2847,
    ordersToday: 156,
    delays: 3,
    revenue: 47580,
    avgDeliveryTime: 2.3,
    stockTurnover: 8.2
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        ordersToday: prev.ordersToday + Math.floor(Math.random() * 3),
        delays: Math.max(0, prev.delays + (Math.random() > 0.7 ? 1 : -1)),
        revenue: prev.revenue + Math.floor(Math.random() * 500)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const cards = [
    {
      title: 'Total SKUs',
      value: metrics.totalSKUs.toLocaleString(),
      change: '+12%',
      icon: Package,
      color: 'text-blue-600 bg-blue-100',
      borderColor: 'border-blue-200',
      positive: true
    },
    {
      title: 'Orders Today',
      value: metrics.ordersToday,
      change: '+8%',
      icon: TrendingUp,
      color: 'text-green-600 bg-green-100',
      borderColor: 'border-green-200',
      positive: true
    },
    {
      title: 'Active Delays',
      value: metrics.delays,
      change: '-2%',
      icon: AlertTriangle,
      color: 'text-red-600 bg-red-100',
      borderColor: 'border-red-200',
      positive: false
    },
    {
      title: 'Revenue Today',
      value: `$${metrics.revenue.toLocaleString()}`,
      change: '+15%',
      icon: DollarSign,
      color: 'text-green-600 bg-green-100',
      borderColor: 'border-green-200',
      positive: true
    },
    {
      title: 'Avg Delivery Time',
      value: `${metrics.avgDeliveryTime}h`,
      change: '-5%',
      icon: Clock,
      color: 'text-blue-600 bg-blue-100',
      borderColor: 'border-blue-200',
      positive: true
    },
    {
      title: 'Stock Turnover',
      value: `${metrics.stockTurnover}x`,
      change: '+3%',
      icon: Truck,
      color: 'text-purple-600 bg-purple-100',
      borderColor: 'border-purple-200',
      positive: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className={`bg-white p-6 rounded-xl border-2 ${card.borderColor} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${card.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-sm font-semibold ${
                card.positive ? 'text-green-600' : 'text-red-600'
              }`}>
                {card.change}
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{card.value}</p>
              <p className="text-sm text-gray-600">{card.title}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCards;