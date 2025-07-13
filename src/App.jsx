/* import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

function App() {
  const [currentView, setCurrentView] = useState('home');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />
      <main className="pt-16">
        {currentView === 'home' && <Home setCurrentView={setCurrentView} />}
        {currentView === 'dashboard' && <Dashboard />}
      </main>
    </div>
  );
}

export default App; */

import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import InventoryPage from './pages/InventoryPage';
import InventoryDashboard from './pages/InventoryDashboard';
import SmartInventoryAlerts from './pages/InventoryAlerts';
import InventoryAnalytics from './pages/InventoryAnalytics';
import LearnMorePage from './pages/LearnMore';
import QualityAssaurance from './pages/QualityAssaurance';
import DeliveryTracking from './pages/DeliveryTracking';
import LiveStockUpdatesPage from './pages/LiveStockUpdatesPage';
import GlobalReachSection from './pages/GlobalReach';
import DynamicForecasting from './pages/DynamicForecasting';

// Layout component to wrap navbar and content
const Layout = ({ children }) => (
  <div className="min-h-screen bg-gray-50">
    <Navbar />
    <main className="pt-16">{children}</main>
  </div>
);

// Define the routes
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <Layout>
        <Dashboard />
      </Layout>
    ),
  },
  {
    path: '/inventory',
    element: (
      <Layout>
        <InventoryPage />
      </Layout>
    ),
  },
  {
    path: '/inventory/inventory-Dashboard',
    element: (
      <Layout>
        <InventoryDashboard />
      </Layout>
    ),
  },
  {
    path: '/inventory/inventory-alerts',
    element: (
      <Layout>
        <SmartInventoryAlerts />
      </Layout>
    ),
  },
  {
    path: '/inventory/inventory-analytics',
    element: (
      <Layout>
        <InventoryAnalytics />
      </Layout>
    ),
  },
  {
    path: '/learn-more',
    element: (
      <Layout>
        <LearnMorePage />
      </Layout>
    ),
  },
  {
    path: '/quality',
    element: (
      <Layout>
        <QualityAssaurance />
      </Layout>
    ),
  },
  {
    path: '/delivery',
    element: (
      <Layout>
        <DeliveryTracking />
      </Layout>
    ),
  },
  {
    path: '/updates',
    element: (
      <Layout>
        <LiveStockUpdatesPage />
      </Layout>
    ),
  },
  {
    path: '/global',
    element: (
      <Layout>
        <GlobalReachSection />
      </Layout>
    ),
  },
  {
    path: '/forecast',
    element: (
      <Layout>
        <DynamicForecasting />
      </Layout>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
