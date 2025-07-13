import React, { useState, useEffect } from 'react';
import { MapPin, Truck, Clock, Navigation, Zap, CheckCircle } from 'lucide-react';

const DeliveryMap = () => {
  const [deliveries, setDeliveries] = useState([
    {
      id: 'DEL001',
      driver: 'Mike Johnson',
      vehicle: 'Truck A',
      destination: '123 Main St, Downtown',
      status: 'in_transit',
      progress: 75,
      eta: '14:30',
      distance: '2.3 km',
      priority: 'high'
    },
    {
      id: 'DEL002',
      driver: 'Sarah Wilson',
      vehicle: 'Van B',
      destination: '456 Oak Ave, Riverside',
      status: 'in_transit',
      progress: 45,
      eta: '15:15',
      distance: '5.1 km',
      priority: 'medium'
    },
    {
      id: 'DEL003',
      driver: 'John Davis',
      vehicle: 'Truck C',
      destination: '789 Pine Rd, Uptown',
      status: 'delivered',
      progress: 100,
      eta: 'Delivered',
      distance: '0 km',
      priority: 'low'
    },
    {
      id: 'DEL004',
      driver: 'Lisa Chen',
      vehicle: 'Van D',
      destination: '321 Elm St, Westside',
      status: 'pending',
      progress: 0,
      eta: '16:45',
      distance: '8.7 km',
      priority: 'high'
    }
  ]);

  const [activeFilter, setActiveFilter] = useState('all');

  // Simulate real-time progress updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDeliveries(prev => prev.map(delivery => {
        if (delivery.status === 'in_transit' && delivery.progress < 100) {
          const newProgress = Math.min(100, delivery.progress + Math.random() * 5);
          return {
            ...delivery,
            progress: newProgress,
            status: newProgress >= 100 ? 'delivered' : 'in_transit'
          };
        }
        return delivery;
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusInfo = (status) => {
    switch (status) {
      case 'pending':
        return {
          color: 'text-yellow-600 bg-yellow-100 border-yellow-200',
          icon: Clock,
          text: 'Pending'
        };
      case 'in_transit':
        return {
          color: 'text-blue-600 bg-blue-100 border-blue-200',
          icon: Truck,
          text: 'In Transit'
        };
      case 'delivered':
        return {
          color: 'text-green-600 bg-green-100 border-green-200',
          icon: CheckCircle,
          text: 'Delivered'
        };
      default:
        return {
          color: 'text-gray-600 bg-gray-100 border-gray-200',
          icon: MapPin,
          text: 'Unknown'
        };
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const filteredDeliveries = activeFilter === 'all' 
    ? deliveries 
    : deliveries.filter(delivery => delivery.status === activeFilter);

  const statusCounts = {
    all: deliveries.length,
    pending: deliveries.filter(d => d.status === 'pending').length,
    in_transit: deliveries.filter(d => d.status === 'in_transit').length,
    delivered: deliveries.filter(d => d.status === 'delivered').length
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Truck className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Live Deliveries</h2>
              <p className="text-gray-600 text-sm">Real-time tracking & routes</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Navigation className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-600">Route Optimized</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {Object.entries(statusCounts).map(([status, count]) => (
            <button
              key={status}
              onClick={() => setActiveFilter(status)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === status
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1)} ({count})
            </button>
          ))}
        </div>
      </div>

      {/* Mock Map Area */}
      <div className="p-6 border-b border-gray-200">
        <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <div className="absolute top-8 right-8 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="absolute bottom-6 left-1/2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <div className="absolute bottom-4 right-4 w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
          </div>
          
          <div className="relative text-center py-8">
            <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Interactive Map View</h3>
            <p className="text-sm text-gray-600 mb-4">
              Real-time delivery tracking with optimized routes
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span>AI Route Optimization</span>
              </div>
              <div className="flex items-center space-x-1">
                <Truck className="w-4 h-4 text-blue-500" />
                <span>Live GPS Tracking</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery List */}
      <div className="p-6">
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {filteredDeliveries.map((delivery) => {
            const statusInfo = getStatusInfo(delivery.status);
            const StatusIcon = statusInfo.icon;
            
            return (
              <div
                key={delivery.id}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Truck className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${getPriorityColor(delivery.priority)}`}></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">{delivery.id}</h3>
                      <p className="text-xs text-gray-500">{delivery.driver} • {delivery.vehicle}</p>
                    </div>
                  </div>
                  
                  <div className={`flex items-center px-2 py-1 rounded-lg border text-xs font-medium ${statusInfo.color}`}>
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {statusInfo.text}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{delivery.destination}</span>
                  </div>
                  
                  {delivery.status !== 'pending' && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-semibold text-gray-900">{Math.round(delivery.progress)}%</span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-1000 ${
                            delivery.status === 'delivered' ? 'bg-green-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${delivery.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>ETA: {delivery.eta}</span>
                    <span>Distance: {delivery.distance}</span>
                    <span className={`capitalize font-medium ${
                      delivery.priority === 'high' ? 'text-red-600' : 
                      delivery.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {delivery.priority} priority
                    </span>
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

export default DeliveryMap;