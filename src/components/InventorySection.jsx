import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, AlertTriangle, Package, TrendingDown, TrendingUp } from 'lucide-react';

const InventorySection = () => {
  const [inventory, setInventory] = useState([
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      sku: 'PWH-001',
      currentStock: 45,
      minStock: 20,
      maxStock: 200,
      status: 'optimal',
      category: 'Electronics',
      lastRestock: '2024-01-10',
      trend: 'up'
    },
    {
      id: 2,
      name: 'Organic Coffee Beans 1kg',
      sku: 'OCB-002',
      currentStock: 8,
      minStock: 15,
      maxStock: 100,
      status: 'low',
      category: 'Food & Beverage',
      lastRestock: '2024-01-08',
      trend: 'down'
    },
    {
      id: 3,
      name: 'Smart Fitness Tracker',
      sku: 'SFT-003',
      currentStock: 185,
      minStock: 30,
      maxStock: 150,
      status: 'overstock',
      category: 'Electronics',
      lastRestock: '2024-01-12',
      trend: 'up'
    },
    {
      id: 4,
      name: 'Eco-Friendly Water Bottle',
      sku: 'EWB-004',
      currentStock: 67,
      minStock: 25,
      maxStock: 120,
      status: 'optimal',
      category: 'Lifestyle',
      lastRestock: '2024-01-11',
      trend: 'up'
    },
    {
      id: 5,
      name: 'Wireless Charging Pad',
      sku: 'WCP-005',
      currentStock: 12,
      minStock: 20,
      maxStock: 80,
      status: 'low',
      category: 'Electronics',
      lastRestock: '2024-01-09',
      trend: 'down'
    }
  ]);

  const [filter, setFilter] = useState('all');

  // Simulate stock changes
  useEffect(() => {
    const interval = setInterval(() => {
      setInventory(prev => prev.map(item => {
        const change = Math.floor(Math.random() * 10) - 5;
        const newStock = Math.max(0, item.currentStock + change);
        let status = 'optimal';
        
        if (newStock <= item.minStock) status = 'low';
        else if (newStock >= item.maxStock) status = 'overstock';
        
        return {
          ...item,
          currentStock: newStock,
          status,
          trend: change > 0 ? 'up' : change < 0 ? 'down' : item.trend
        };
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getStatusInfo = (status) => {
    switch (status) {
      case 'low':
        return {
          color: 'text-red-600 bg-red-100 border-red-200',
          icon: AlertTriangle,
          text: 'Low Stock'
        };
      case 'overstock':
        return {
          color: 'text-orange-600 bg-orange-100 border-orange-200',
          icon: AlertCircle,
          text: 'Overstock'
        };
      default:
        return {
          color: 'text-green-600 bg-green-100 border-green-200',
          icon: CheckCircle,
          text: 'Optimal'
        };
    }
  };

  const getStockPercentage = (current, max) => {
    return Math.min((current / max) * 100, 100);
  };

  const filteredInventory = filter === 'all' 
    ? inventory 
    : inventory.filter(item => item.status === filter);

  const statusCounts = {
    all: inventory.length,
    low: inventory.filter(item => item.status === 'low').length,
    optimal: inventory.filter(item => item.status === 'optimal').length,
    overstock: inventory.filter(item => item.status === 'overstock').length
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Smart Inventory</h2>
              <p className="text-gray-600 text-sm">Real-time stock monitoring</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {Object.entries(statusCounts).map(([status, count]) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  filter === status
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)} ({count})
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {filteredInventory.map((item) => {
            const statusInfo = getStatusInfo(item.status);
            const StatusIcon = statusInfo.icon;
            const TrendIcon = item.trend === 'up' ? TrendingUp : TrendingDown;
            const stockPercentage = getStockPercentage(item.currentStock, item.maxStock);
            
            return (
              <div
                key={item.id}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm">{item.name}</h3>
                      <p className="text-xs text-gray-500">SKU: {item.sku}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className={`flex items-center px-2 py-1 rounded-lg border text-xs font-medium ${statusInfo.color}`}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {statusInfo.text}
                    </div>
                    <div className={`p-1 rounded ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      <TrendIcon className="w-4 h-4" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Stock Level</span>
                    <span className="font-semibold text-gray-900">
                      {item.currentStock} / {item.maxStock}
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        item.status === 'low' 
                          ? 'bg-red-500' 
                          : item.status === 'overstock'
                          ? 'bg-orange-500'
                          : 'bg-green-500'
                      }`}
                      style={{ width: `${stockPercentage}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Min: {item.minStock}</span>
                    <span>Category: {item.category}</span>
                    <span>Last restock: {item.lastRestock}</span>
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

export default InventorySection;