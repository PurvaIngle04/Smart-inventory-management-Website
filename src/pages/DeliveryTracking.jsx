import React, { useState, useEffect } from 'react';

// Reusable Info component for displaying tracking details
const Info = ({ label, value, color = 'text-gray-800' }) => (
  <div>
    <p className="text-sm text-gray-600">{label}</p>
    <p className={`font-medium ${color}`}>{value}</p>
  </div>
);

// Reusable FeatureCard component for interactive buttons
const FeatureCard = ({ title, description, onClick, buttonText, buttonColor }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 transition hover:shadow-xl">
    <h3 className="font-semibold text-gray-800">{title}</h3>
    <p className="text-sm text-gray-600 mt-1">{description}</p>
    <button
      onClick={onClick}
      className={`mt-4 text-white px-4 py-2 rounded-lg transition ${buttonColor}`}
    >
      {buttonText}
    </button>
  </div>
);

const DeliveryTracking = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [message, setMessage] = useState({ text: '', type: 'info' });
  const [truckAnimation, setTruckAnimation] = useState(false);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes realisticTruckMove {
        0% { transform: translateX(0) rotate(0deg); }
        25% { transform: translateX(100px) rotate(1deg); }
        50% { transform: translateX(200px) rotate(-1deg); }
        75% { transform: translateX(300px) rotate(1deg); }
        100% { transform: translateX(0) rotate(0deg); }
      }
      .truck-animation {
        animation: realisticTruckMove 8s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const mockTrackingData = {
    'WEL123456789': {
      orderId: 'WEL123456789',
      status: 'In Transit',
      eta: '2025-07-03 14:00',
      truckId: 'TRK-456',
      location: 'Springfield, IL',
      lastUpdate: '2025-07-01 10:00',
      timeline: [
        { status: 'Order Confirmed', location: 'Chicago, IL', time: '2025-06-30 09:00' },
        { status: 'Picked Up by Truck', location: 'Chicago, IL', time: '2025-06-30 12:00' },
        { status: 'In Transit', location: 'Springfield, IL', time: '2025-07-01 10:00' },
      ],
    },
    'WEL987654321': {
      orderId: 'WEL987654321',
      status: 'Delivered',
      eta: '2025-06-29 11:30',
      truckId: 'TRK-101',
      location: 'Metropolis, NY',
      lastUpdate: '2025-06-29 11:35',
      timeline: [
        { status: 'Order Confirmed', location: 'Gotham, NJ', time: '2025-06-28 08:00' },
        { status: 'Out for Delivery', location: 'Metropolis, NY', time: '2025-06-29 07:00' },
        { status: 'Delivered', location: 'Metropolis, NY', time: '2025-06-29 11:30' },
      ],
    },
  };

  const showMessage = (text, type = 'info') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: 'info' }), 4000);
  };

  const trackPackage = () => {
    const info = mockTrackingData[trackingNumber];
    if (info) {
      setTrackingData(info);
      showMessage(`Tracking data found for ${trackingNumber}!`, 'success');
      setTruckAnimation(true);
    } else {
      showMessage('Invalid tracking number. Please try WEL123456789 or WEL987654321.', 'error');
      setTrackingData(null);
      setTruckAnimation(false);
    }
  };

  const subscribeNotifications = () => {
    if (trackingNumber) {
      showMessage(`Subscribed to SMS/Email notifications for ${trackingNumber}!`, 'success');
    } else {
      showMessage('Please enter a tracking number first to subscribe.', 'info');
    }
  };

  const viewMap = () => {
    if (trackingData && trackingData.location) {
      const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(trackingData.location)}`;
      window.open(mapUrl, '_blank');
      showMessage(`Opening map for ${trackingData.location}...`, 'info');
    } else {
      showMessage('No location data available to show on map.', 'info');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex flex-col items-center py-8 px-4 font-sans">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-2 text-center">
        Welmart Delivery <span className="text-blue-600">Tracking</span>
      </h1>
      <p className="text-lg text-gray-600 mb-8 text-center">Track your packages in real-time with ease.</p>

      {message.text && (
        <div className={`w-full max-w-lg p-3 mb-4 rounded-lg text-center font-medium ${
          message.type === 'success' ? 'bg-green-100 text-green-800' :
          message.type === 'error' ? 'bg-red-100 text-red-800' :
          'bg-blue-100 text-blue-800'
        } shadow-md transition-opacity duration-300`}>
          {message.text}
        </div>
      )}

      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6 mb-10">
        <label htmlFor="track" className="block mb-2 text-sm font-medium text-gray-700">
          Enter Tracking Number
        </label>
        <div className="flex">
          <input
            id="track"
            type="text"
            placeholder="e.g., WEL123456789"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={trackPackage}
            className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Track
          </button>
        </div>
      </div>

      {trackingData && (
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8 mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Tracking Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Info label="Order ID" value={trackingData.orderId} />
            <Info label="Status" value={trackingData.status} color="text-blue-600" />
            <Info label="Estimated Delivery" value={trackingData.eta} />
            <Info label="Truck ID" value={trackingData.truckId} />
            <Info label="Current Location" value={trackingData.location} />
            <Info label="Last Updated" value={trackingData.lastUpdate} />
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mb-4">Delivery Timeline</h3>
          <div className="space-y-6">
            {trackingData.timeline.map((event, index) => (
              <div key={index} className="flex items-start">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-800">{event.status}</p>
                  <p className="text-sm text-gray-600">{event.location}</p>
                  <p className="text-sm text-gray-500">{event.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Truck animation after showing tracking */}
          {truckAnimation && (
            <div className="mt-10 text-center">
              <span role="img" aria-label="truck" className="text-5xl inline-block truck-animation">
                🚚
              </span>
              <p className="text-sm text-gray-600 mt-2">Simulating truck movement...</p>
            </div>
          )}
        </div>
      )}

      <div className="w-full max-w-3xl mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Explore More Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FeatureCard
            title="Real-Time Notifications"
            description="Get SMS or email updates instantly."
            onClick={subscribeNotifications}
            buttonText="Subscribe Now"
            buttonColor="bg-green-600 hover:bg-green-700"
          />
          <FeatureCard
            title="Route Visualization"
            description="See the truck's route on a live map."
            onClick={viewMap}
            buttonText="View Route"
            buttonColor="bg-blue-600 hover:bg-blue-700"
          />
        </div>
      </div>
    </div>
  );
};

export default DeliveryTracking;
