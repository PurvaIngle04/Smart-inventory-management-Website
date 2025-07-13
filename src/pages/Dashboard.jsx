import React, { useState, useEffect } from 'react';
import SummaryCards from '../components/SummaryCards';
import InventorySection from '../components/InventorySection';
import DeliveryMap from '../components/DeliveryMap';
import ForecastChart from '../components/ForecastChart';
import { RefreshCw } from 'lucide-react';

const Dashboard = () => {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsRefreshing(false);
    }, 1000);
  };

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Supply Chain Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh Data
          </button>
        </div>

        {/* Summary Cards */}
        <SummaryCards />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Inventory Section */}
          <div className="space-y-8">
            <InventorySection />
            <ForecastChart />
          </div>

          {/* Delivery Map */}
          <div>
            <DeliveryMap />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;