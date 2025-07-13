import React, { useState } from 'react';
import BarcodeEntry from './BarcodeEntry'; // ✅ Import it
import Section from '../components/Section'; // Adjust path as per your folder structure
import InventoryDashboard from './InventoryDashboard'; // Adjust path as per your folder structure
import { useNavigate } from 'react-router-dom'; // ✅ Import useNavigate for navigation

const InventoryPage = () => {
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false); // ✅ State
  const navigate=useNavigate();

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-12 bg-slate-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden p-6 sm:p-8 md:p-10 lg:p-12 border border-gray-100">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent">
            🚀 SmartFlow Inventory Management
          </h1>
          <p className="text-xl sm:text-2xl text-gray-700 font-medium">
            Transforming Your Inventory with Real-Time Intelligence
          </p>
        </header>

        {/* 👇 Add a button to show BarcodeEntry */}
        <div className="text-center mb-12">
          <button
            onClick={() => setShowBarcodeScanner(true) }
            className="bg-indigo-600 text-white px-6 py-3 rounded-full text-lg font-medium shadow-md hover:bg-indigo-700 transition-colors"
          >
            📷 Create Barcode Scanner
          </button>
        </div>

        {/* Conditionally Render the BarcodeEntry Component */}
        {showBarcodeScanner && (
          <div className="mb-12">
            <BarcodeEntry />
          </div>
        )}

        {/* Section 1: Data Capture */}
        {!showBarcodeScanner && (
          <>
            <Section
              bg="bg-blue-50"
              title="Advanced Data Capture & Integration"
              color="blue"
              iconPath="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.592 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.592-1M12 16H9m2.288-6.828L20 14m-7.712-4.828L4 14m7.712-4.828h.001M12 12h.001"
              description="Our system goes beyond conventional methods, integrating cutting-edge data capture to provide unparalleled inventory visibility."
              cards={[
                {
                  title: 'Camera Barcode Scanning',
                  desc: 'Leverage camera-based barcode scanning for rapid and precise product identification.',
                  iconPath: 'M12 4v16m8-8H4',
                },
                {
                  title: 'Automated Data Integrations',
                  desc: 'Integrates with POS, ERP, and supply chain systems to sync inventory.',
                  iconPath: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
                },
              ]}
            />

            {/* ... other sections */}
            <Section
              bg="bg-green-50"
              title="Dynamic Real-Time Stock Tracking"
              color="green"
              iconPath="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              description="Collect and process data from capture points in real time."
              onClick={
                ()=>{
                   navigate('/inventory/inventory-dashboard'); // ✅ Navigate to InventoryDashboard
                }
              }
            >
            </Section>

            <Section
              bg="bg-red-50"
              title="Intelligent Automated Alerts"
              color="red"
              iconPath="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              description="Auto-alerts notify managers about critical stock levels and prevent overstocking."
              onClick={()=>{
                navigate('/inventory/inventory-alerts'); // ✅ Navigate to InventoryAlerts
              }}
            />

            <Section
              bg="bg-purple-50"
              title="Powerful Data Analytics & Reporting"
              color="purple"
              iconPath="M7 12l3-3 3 3 4-4M18 14v4h4m-6 3H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2z"
              description="Detailed reports on inventory turnover, trends, and supplier performance."
              onClick={()=>{
                navigate('/inventory/inventory-analytics'); // ✅ Navigate to InventoryAnalytics
              }}
            />
          </>
        )}

        {/* Footer */}
        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>&copy; 2025 SmartFlow Solutions. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

// Section component remains unchanged...

export default InventoryPage;
