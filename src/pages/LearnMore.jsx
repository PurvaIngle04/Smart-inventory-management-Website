import React from 'react';
import { Package, Truck, CheckCircle, BarChart2, ShieldCheck, Globe } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
    <div className="flex justify-center mb-4">
      <Icon className="w-10 h-10 text-blue-600" />
    </div>
    <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

const WarehouseLearnMorePage = () => {
  return (
    <div className="bg-gray-50 text-gray-800 font-sans">

      {/* Hero Section */}
      <section className="bg-blue-700 text-white py-20 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">Smart Warehouse Management</h1>
        <p className="text-xl max-w-2xl mx-auto mb-8">
          Transform your supply chain with a unified, intelligent inventory platform that adapts to your business needs.
        </p>
        <button className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition">
          Get Started
        </button>
      </section>

      {/* Why Inventory Management */}
      <section className="py-16 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Why Is Inventory Management Critical?</h2>
        <p className="text-gray-700 mb-4">
          Businesses lose billions each year due to inefficient inventory systems—resulting in overstocking, stockouts, and delayed deliveries.
        </p>
        <p className="text-gray-700 mb-4">
          A modern warehouse solution ensures real-time visibility, reduces waste, and optimizes storage and distribution—all from a single dashboard.
        </p>
        <p className="text-gray-700">
          Our platform gives you that power. Whether you're a growing retailer or a large enterprise, we help you scale efficiently.
        </p>
      </section>

      {/* How It Works */}
      <section className="bg-white py-16 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <FeatureCard
            icon={BarChart2}
            title="Track Everything Live"
            description="Get real-time inventory counts, movement logs, and automated updates across warehouses."
          />
          <FeatureCard
            icon={ShieldCheck}
            title="Automate Reordering"
            description="Set thresholds for low-stock alerts and let the system trigger restocking."
          />
          <FeatureCard
            icon={Globe}
            title="Multi-location Management"
            description="Easily manage products across cities, warehouses, and retail outlets."
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Core Platform Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon={Package}
            title="Inventory Accuracy"
            description="Reduce human error with automated, real-time stock tracking and sync."
          />
          <FeatureCard
            icon={Truck}
            title="Delivery Tracking"
            description="Follow shipments with GPS integration and receive live status updates."
          />
          <FeatureCard
            icon={CheckCircle}
            title="On-Time Fulfillment"
            description="Predict delays and optimize delivery routes for maximum efficiency."
          />
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Who Is It For?</h2>
        <p className="text-gray-700 mb-4">
          🛍️ **Retailers** – Optimize shelf space and avoid stockouts.<br />
          🏭 **Manufacturers** – Keep raw material flow steady and meet production targets.<br />
          📦 **Distributors** – Manage multiple warehouses and delivery schedules effortlessly.<br />
        </p>
        <p className="text-gray-700">
          Regardless of scale or industry, our system adapts to your needs.
        </p>
      </section>

      {/* Testimonials (Optional) */}
      <section className="bg-white py-16 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <p className="italic mb-2">
              “We cut delivery times by 25% and improved inventory accuracy overnight.”
            </p>
            <p className="font-semibold text-gray-800">— Raj Mehta, Logistics Manager</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <p className="italic mb-2">
              “Managing multiple store locations was a nightmare. Now it’s all in one place.”
            </p>
            <p className="font-semibold text-gray-800">— Anjali Kumar, Retail Director</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-blue-600 text-white py-20 text-center px-6">
        <h2 className="text-4xl font-bold mb-4">Ready to Take Control of Your Inventory?</h2>
        <p className="text-lg mb-8">
          Start your free trial or schedule a personalized demo today.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-white text-blue-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
            Start Free Trial
          </button>
          <button className="border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-700 transition">
            Book a Demo
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-sm text-center py-6">
        &copy; 2025 Supply Chain Pro. All rights reserved.
      </footer>
    </div>
  );
};

export default WarehouseLearnMorePage;
