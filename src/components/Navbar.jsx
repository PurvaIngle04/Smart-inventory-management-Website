import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Package, BarChart3, Home } from 'lucide-react';

const Navbar = () => {
  const location = useLocation(); // To highlight active nav item

  const navItems = [
    { id: '/', label: 'Home', icon: Home },
    { id: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Supply Chain Pro</h1>
              <p className="text-xs text-gray-500">Inventory to Delivery</p>
            </div>
          </div>

          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.id;

              return (
                <Link
                  to={item.id}
                  key={item.id}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-100 text-blue-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
