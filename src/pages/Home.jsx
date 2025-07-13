import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Package,
  Truck,
  BarChart3,
  Shield,
  Zap,
  Globe,
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Package,
      title: "Smart Inventory",
      description:
        "Real-time stock monitoring with predictive alerts and automated reordering.",
      color: "text-blue-600 bg-blue-100",
      sectionId: "inventory",
    },
    {
      icon: Truck,
      title: "Delivery Tracking",
      description:
        "Live route optimization and last-mile delivery monitoring with ETA updates.",
      color: "text-green-600 bg-green-100",
      sectionId: "delivery",
    },
    {
      icon: BarChart3,
      title: "Demand Forecasting",
      description:
        "ML-powered analytics to predict demand patterns and optimize stock levels.",
      color: "text-purple-600 bg-purple-100",
      sectionId: "forecast",
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description:
        "End-to-end quality control with automated compliance checking.",
      color: "text-red-600 bg-red-100",
      sectionId: "quality", // Placeholder
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description:
        "Instant notifications and live data synchronization across all channels.",
      color: "text-yellow-600 bg-yellow-100",
      sectionId: "updates", // Placeholder
    },
    {
      icon: Globe,
      title: "Global Reach",
      description:
        "Multi-location support with centralized visibility and control.",
      color: "text-indigo-600 bg-indigo-100",
      sectionId: "global", // Placeholder
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Optimize Your
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                    Supply Chain
                  </span>
                </h1>
                <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
                  From inventory management to last-mile delivery - get complete
                  visibility and control over your retail operations.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="group bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
                >
                  View Dashboard
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-700 transition-all duration-300" onClick={() => navigate("/learn-more")}>
                  Learn More
                </button>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl blur-3xl opacity-30 transform rotate-6"></div>
                <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl">
                      <span className="text-blue-200">Inventory Level</span>
                      <span className="text-2xl font-bold text-green-400">
                        94%
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl">
                      <span className="text-blue-200">Active Deliveries</span>
                      <span className="text-2xl font-bold text-yellow-400">
                        127
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl">
                      <span className="text-blue-200">On-Time Rate</span>
                      <span className="text-2xl font-bold text-green-400">
                        98.5%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Complete Supply Chain Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Streamline operations from warehouse to customer doorstep with our
              comprehensive platform
            </p>
          </div>

          <div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group p-8 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white"
                        onClick={() => {
        if (feature.sectionId) {
          navigate(`/${feature.sectionId}`); // ✅ Navigates to /inventory, /delivery, etc.
        }}}
                >
                  <div
                    className={`w-16 h-16 rounded-xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Transform Your Supply Chain?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of retailers who trust our platform for their
            operations
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-12 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center mx-auto"
          >
            Explore Dashboard
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
