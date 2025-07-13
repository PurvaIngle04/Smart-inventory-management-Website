import React, { useState, useEffect } from 'react';

// Initial product data with stock levels and alert thresholds
const initialProducts = {
  SKU001: { name: 'Organic Milk (Gallon)', stock: 5, minStock: 10, maxStock: 50, imageUrl: 'https://placehold.co/100x100/AEC6CF/FFFFFF?text=Milk' },
  SKU002: { name: 'Fresh Apples (Bag)', stock: 150, minStock: 20, maxStock: 100, imageUrl: 'https://placehold.co/100x100/FFD700/FFFFFF?text=Apples' },
  SKU003: { name: 'Paper Towels (6-pack)', stock: 8, minStock: 15, maxStock: 70, imageUrl: 'https://placehold.co/100x100/87CEEB/FFFFFF?text=Paper' },
  SKU004: { name: 'Canned Soup (Tomato)', stock: 200, minStock: 30, maxStock: 150, imageUrl: 'https://placehold.co/100x100/FF6347/FFFFFF?text=Soup' },
  SKU005: { name: 'Laundry Detergent', stock: 25, minStock: 10, maxStock: 40, imageUrl: 'https://placehold.co/100x100/98FB98/FFFFFF?text=Detergent' },
  SKU006: { name: 'Bottled Water (24-pack)', stock: 0, minStock: 50, maxStock: 200, imageUrl: 'https://placehold.co/100x100/ADD8E6/FFFFFF?text=Water' },
  SKU007: { name: 'Whole Wheat Bread', stock: 12, minStock: 20, maxStock: 60, imageUrl: 'https://placehold.co/100x100/DDA0DD/FFFFFF?text=Bread' },
  SKU008: { name: 'Ground Coffee (1lb)', stock: 7, minStock: 10, maxStock: 30, imageUrl: 'https://placehold.co/100x100/CD853F/FFFFFF?text=Coffee' },
};

/**
 * AlertCard component displays individual product stock status.
 * It shows product image, name, SKU, and an alert message based on stock levels.
 */
const AlertCard = ({ sku, product }) => {
  const { name, stock, minStock, maxStock, imageUrl } = product;
  let alertMessage = '';
  let alertColor = '';
  let borderColor = '';

  // Determine alert message and styling based on stock level
  if (stock <= minStock) {
    alertMessage = `LOW STOCK! Current: ${stock}, Min: ${minStock}. Please reorder!`;
    alertColor = 'text-red-700';
    borderColor = 'border-red-500';
  } else if (stock >= maxStock) {
    alertMessage = `OVERSTOCK! Current: ${stock}, Max: ${maxStock}. Consider reducing orders.`;
    alertColor = 'text-yellow-700';
    borderColor = 'border-yellow-500';
  } else {
    alertMessage = `Stock Optimal. Current: ${stock}, Min: ${minStock}, Max: ${maxStock}.`;
    alertColor = 'text-green-700';
    borderColor = 'border-green-500';
  }

  return (
    <div className={`bg-white p-4 rounded-xl shadow-lg border-l-8 ${borderColor} flex items-center space-x-4 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1`}>
      <img
        src={imageUrl}
        alt={name}
        className="w-16 h-16 rounded-lg object-cover flex-shrink-0 border border-gray-200"
        // Fallback for image loading errors
        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/100x100/CCCCCC/FFFFFF?text=No+Image"; }}
      />
      <div>
        <h4 className="text-lg font-semibold text-gray-900">{name} <span className="text-sm text-gray-500 font-normal">(SKU: {sku})</span></h4>
        <p className={`text-sm font-medium ${alertColor}`}>{alertMessage}</p>
      </div>
    </div>
  );
};

/**
 * TemporaryAlert component displays a transient notification at the top of the screen.
 * It automatically fades out after a few seconds.
 */
const TemporaryAlert = ({ message, type }) => {
  if (!message) return null;

  let bgColor = '';
  let textColor = '';
  let borderColor = '';

  switch (type) {
    case 'success':
      bgColor = 'bg-green-500';
      textColor = 'text-white';
      borderColor = 'border-green-700';
      break;
    case 'error':
      bgColor = 'bg-red-500';
      textColor = 'text-white';
      borderColor = 'border-red-700';
      break;
    case 'warning':
      bgColor = 'bg-yellow-500';
      textColor = 'text-gray-900'; // Darker text for yellow background
      borderColor = 'border-yellow-700';
      break;
    case 'info':
    default:
      bgColor = 'bg-blue-500';
      textColor = 'text-white';
      borderColor = 'border-blue-700';
      break;
  }

  return (
    <div
      className={`fixed top-5 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-xl font-semibold text-center shadow-lg transition-all duration-500 ease-out opacity-0 animate-fade-in-out
                  ${bgColor} ${textColor} border-2 ${borderColor}`}
    >
      {message}
      {/* Tailwind CSS keyframes for fade-in and fade-out animation */}
      <style>{`
        @keyframes fade-in-out {
          0% { opacity: 0; transform: translate(-50%, -20px); }
          10% { opacity: 1; transform: translate(-50%, 0); }
          90% { opacity: 1; transform: translate(-50%, 0); }
          100% { opacity: 0; transform: translate(-50%, -20px); }
        }
        .animate-fade-in-out {
          animation: fade-in-out 7s forwards; /* 7 seconds duration, same as setTimeout */
        }
      `}</style>
    </div>
  );
};

/**
 * Main SmartInventoryAlerts component.
 * Provides an input for scanning SKUs and displays a grid of product alerts.
 */
const SmartInventoryAlerts = () => {
  // Use state for products to allow potential future updates (though not implemented in this example)
  const [products, setProducts] = useState(initialProducts);
  const [skuInput, setSkuInput] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('info');

  /**
   * Displays a temporary alert message.
   * @param {string} message The message content.
   * @param {string} type The type of alert ('success', 'error', 'warning', 'info').
   */
  const showTemporaryAlert = (message, type = 'info') => {
    setAlertMessage(message);
    setAlertType(type);
    // Clear the message after 7 seconds, matching the CSS animation duration
    setTimeout(() => setAlertMessage(''), 7000);
  };

  /**
   * Handles the 'Scan Product' button click.
   * Checks the SKU, updates the temporary alert, and triggers re-render of AlertCards if stock changes were simulated.
   */
  const handleScan = () => {
    const sku = skuInput.trim().toUpperCase();
    setSkuInput(''); // Clear input after scan attempt

    if (!sku) {
      showTemporaryAlert('Please enter a Product SKU or simulate a scan.', 'info');
      return;
    }

    // Simulate stock change for demonstration purposes on scan
    setProducts(prevProducts => {
      const updatedProducts = { ...prevProducts };
      if (updatedProducts[sku]) {
        // Toggle stock between optimal/low/overstock for demonstration
        if (updatedProducts[sku].stock <= updatedProducts[sku].minStock) {
          // If low, bring to optimal (minStock + 5) or max if it was 0
          updatedProducts[sku] = { ...updatedProducts[sku], stock: Math.min(updatedProducts[sku].minStock + 5, updatedProducts[sku].maxStock - 1) };
          showTemporaryAlert(`${updatedProducts[sku].name} (SKU: ${sku}) stock adjusted to ${updatedProducts[sku].stock}. No longer low.`, 'success');
        } else if (updatedProducts[sku].stock >= updatedProducts[sku].maxStock) {
          // If overstock, bring to optimal (maxStock - 5)
          updatedProducts[sku] = { ...updatedProducts[sku], stock: updatedProducts[sku].maxStock - 5 };
          showTemporaryAlert(`${updatedProducts[sku].name} (SKU: ${sku}) stock adjusted to ${updatedProducts[sku].stock}. No longer overstock.`, 'success');
        } else {
          // If optimal, simulate a low stock for next scan (or overstock if preferred)
          updatedProducts[sku] = { ...updatedProducts[sku], stock: Math.floor(updatedProducts[sku].minStock / 2) };
          showTemporaryAlert(`${updatedProducts[sku].name} (SKU: ${sku}) stock simulated to low: ${updatedProducts[sku].stock}.`, 'info');
        }
      } else {
        showTemporaryAlert(`Product with SKU: ${sku} not found. Please check the SKU.`, 'error');
      }
      return updatedProducts;
    });

    // Note: The temporary alert will be triggered by the setProducts callback to reflect the *new* state.
    // If you remove the stock simulation, you'd move the alert logic directly here.
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex flex-col items-center justify-center p-4 font-inter text-gray-800">
      <div className="container mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-5xl w-full border border-gray-200">
        <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-8 leading-tight">
          Smart Inventory Alerts
        </h2>
        <p className="text-center text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
          Monitor your product stock levels in real-time and get smart alerts for low stock or overstock situations.
        </p>

        {/* Input and Scan Button Section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10 p-4 bg-blue-50 rounded-xl shadow-inner border border-blue-200">
          <input
            type="text"
            value={skuInput}
            onChange={(e) => setSkuInput(e.target.value)}
            onKeyPress={(e) => { if (e.key === 'Enter') handleScan(); }}
            placeholder="Enter Product SKU or Scan Barcode"
            className="flex-grow p-3 border border-blue-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full md:w-auto text-lg"
            aria-label="Product SKU input"
          />
          <button
            onClick={handleScan}
            className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 w-full md:w-auto text-lg flex items-center justify-center gap-2"
            aria-label="Scan Product button"
          >
            {/* SVG for Scan Icon (optional, but good for visual appeal) */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m-2-2h4m-4-8h4M4 12h16" />
            </svg>
            Scan Product
          </button>
        </div>

        {/* Temporary Alert Display */}
        <TemporaryAlert message={alertMessage} type={alertType} />

        {/* Current Stock Status & Alerts Grid */}
        <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-6 text-center border-b-2 border-gray-200 pb-3">Stock Status & Alerts Overview</h3>
        <div className="scroll-container bg-gray-50 p-6 rounded-lg shadow-inner max-h-[60vh] overflow-y-auto border border-gray-200">
          {Object.entries(products).length === 0 ? (
            <p className="text-center text-gray-500 italic py-10">No products to display. Add some products to get started!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(products).map(([sku, data]) => (
                <AlertCard key={sku} sku={sku} product={data} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartInventoryAlerts;
