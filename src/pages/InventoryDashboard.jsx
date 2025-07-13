import React, { useState, useRef } from 'react';

const InventoryDashboard = () => {
  const [inventory, setInventory] = useState({});
  const [movements, setMovements] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info');

  const skuRef = useRef(null);
  const qtyRef = useRef(null);

  /**
   * Displays a transient message to the user.
   * @param {string} msg The message to display.
   * @param {string} type The type of message (e.g., 'info', 'success', 'warning', 'error').
   */
  const showMessage = (msg, type = 'info') => {
    setMessage(msg);
    setMessageType(type);
    // Clear the message after 5 seconds
    setTimeout(() => setMessage(''), 5000);
  };

  /**
   * Processes a scan operation (product 'in' or 'out').
   * @param {'in' | 'out'} type The type of scan operation.
   */
  const processScan = (type) => {
    const sku = skuRef.current.value.trim();
    const qty = parseInt(qtyRef.current.value.trim(), 10);

    // --- Input Validation ---
    if (!sku) {
      showMessage('Please enter a valid SKU / Product ID', 'warning');
      return;
    }

    if (!qty || isNaN(qty) || qty < 1) {
      showMessage('Please enter a quantity greater than 0', 'warning');
      return;
    }

    // --- State Update Logic ---
    let finalMovementEntry = null;
    let finalMessage = '';
    let finalMessageType = '';
    let shouldClearInputs = true; // Flag to decide if inputs should be cleared

    setInventory((prevInventory) => {
      // Create a shallow copy of the previous inventory object to ensure immutability
      const updatedInventory = { ...prevInventory };

      const isNewProduct = !updatedInventory[sku];
      const currentQuantity = updatedInventory[sku]?.quantity || 0;

      // If it's a new product, initialize its entry in the inventory
      if (isNewProduct) {
        updatedInventory[sku] = {
          name: `New Product (${sku})`, // Default name for new products
          sku,
          skuid: sku, // Assuming skuid is the same as sku for simplicity
          quantity: 0,
        };
      }

      // Handle 'in' (add stock) operation
      if (type === 'in') {
        updatedInventory[sku].quantity = currentQuantity + qty;
        finalMessage = `${isNewProduct ? 'New product added. ' : ''}Scanned IN ${qty} of ${updatedInventory[sku].name}. Total stock: ${updatedInventory[sku].quantity}`;
        finalMessageType = 'success';
        finalMovementEntry = {
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }), // e.g., "22:10:11"
          product: updatedInventory[sku].name,
          type,
          quantity: qty,
        };
      }
      // Handle 'out' (remove stock) operation
      else if (type === 'out') {
        if (currentQuantity >= qty) {
          updatedInventory[sku].quantity = currentQuantity - qty;
          finalMessage = `Scanned OUT ${qty} of ${updatedInventory[sku].name}. Remaining stock: ${updatedInventory[sku].quantity}`;
          finalMessageType = 'success';
          finalMovementEntry = {
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
            product: updatedInventory[sku].name,
            type,
            quantity: qty,
          };
        } else {
          // If insufficient stock for 'out' operation, show an error and prevent inventory update
          showMessage(`Cannot scan out ${qty}. Only ${currentQuantity} in stock.`, 'error');
          shouldClearInputs = false; // Don't clear inputs on failed 'out'
          return prevInventory; // Return the previous state to cancel this update
        }
      }

      // Return the updated inventory state. React will then re-render if state changed.
      return updatedInventory;
    });

    // --- Side Effects (After Inventory State is Scheduled/Processed) ---
    setTimeout(() => {
      if (finalMovementEntry) { // Only add movement and show success message if the operation was successful
        setMovements((prev) => [finalMovementEntry, ...prev.slice(0, 14)]); // Keep last 15 movements
        showMessage(finalMessage, finalMessageType);
      }

      // Clear inputs regardless of whether the movement was added (e.g., if 'out' failed but we still want to reset)
      if (shouldClearInputs) {
        skuRef.current.value = '';
        qtyRef.current.value = '';
      }
    }, 0); // Use a tiny timeout to defer execution slightly, especially useful in React Strict Mode
  };

  return (
    <div className="min-h-screen bg-gray-100 font-['Inter']">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Inventory Dashboard</h1>
        </div>
      </header>

      <main className="container mx-auto p-6 grid gap-6">
        {/* Product Scanner Section */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Product Scanner</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              ref={skuRef}
              type="text"
              placeholder="Enter Product ID (SKU)"
              className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Product SKU"
            />
            <input
              ref={qtyRef}
              type="number"
              placeholder="Quantity"
              min="1"
              className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Quantity"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button
              onClick={() => processScan('in')}
              className="flex-1 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-200 ease-in-out shadow-sm"
            >
              Scan In
            </button>
            <button
              onClick={() => processScan('out')}
              className="flex-1 bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition duration-200 ease-in-out shadow-sm"
            >
              Scan Out
            </button>
          </div>

          {message && (
            <div className={`mt-4 p-3 rounded-md text-sm font-medium ${
              messageType === 'success' ? 'bg-green-100 text-green-800 border border-green-200' :
              messageType === 'error' ? 'bg-red-100 text-red-800 border border-red-200' :
              messageType === 'warning' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
              'bg-blue-100 text-blue-800 border border-blue-200'}`}>{message}</div>
          )}
        </section>

        {/* Current Stock Levels Section */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Current Stock Levels</h2>
          <div className="overflow-x-auto">
            {Object.values(inventory).length === 0 ? (
              <p className="text-gray-500 italic">No products in stock yet. Scan some in!</p>
            ) : (
              <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Product Name</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Product ID</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">SKU ID</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Quantity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {Object.values(inventory)
                    .sort((a, b) => a.name.localeCompare(b.name)) // Sort by product name for consistent display
                    .map((item) => (
                      <tr key={item.sku} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.sku}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{item.skuid}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">{item.quantity}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

        {/* Recent Movements Section */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Movements</h2>
          <div className="overflow-x-auto">
            {movements.length === 0 ? (
              <p className="text-gray-500 italic">No recent movements.</p>
            ) : (
              <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Time</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Product</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Qty</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {movements.map((move, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{move.time}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{move.product}</td>
                      <td className={`px-4 py-3 whitespace-nowrap text-sm font-medium capitalize ${move.type === 'in' ? 'text-green-600' : 'text-red-600'}`}>{move.type}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{move.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white p-4 text-center text-sm">
        &copy; 2025 Inventory Manager. All rights reserved.
      </footer>
    </div>
  );
};

export default InventoryDashboard;
