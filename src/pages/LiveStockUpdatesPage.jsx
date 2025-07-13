import React, { useState, useEffect, useRef, useCallback } from 'react';
// Import all necessary Lucide icons
import { Bell, Search, Filter, CheckCircle, AlertTriangle, XCircle, X, Scan, Package, Truck, DollarSign, MapPin } from 'lucide-react';

// Firebase imports - these will be resolved by the build system in a React app.
// The global variables __app_id, __firebase_config, __initial_auth_token are assumed
// to be provided by the Canvas environment at runtime and do not need explicit import.
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, signInAnonymously, signInWithCustomToken } from 'firebase/auth';


// Main Live Stock Updates Page Component
const LiveStockUpdatesPage = () => {
  // State for SKUs, notifications, events, and filters
  const [skus, setSkus] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [events, setEvents] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'healthy', 'low', 'critical'
  const [filterLocation, setFilterLocation] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);

  // Refs for unique filter options (locations, categories)
  const uniqueLocations = useRef(new Set());
  const uniqueCategories = useRef(new Set());

  // --- States and Refs for Barcode Entry functionality (if you choose to re-add it later) ---
  const [form, setForm] = useState({
    uniqueNumber: "", productName: "", brandName: "", categoryName: "", originalPrice: "",
    discountedPrice: "", expiryDate: "", stockAvailable: "", manufacturer: "",
    batchNumber: "", locationInStore: "", supplier: "", reorderLevel: ""
  });
  const [barcodeMessage, setBarcodeMessage] = useState({ text: "", type: "info" });
  const [userId, setUserId] = useState("Loading...");
  const [db, setDb] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const scannerContainerRef = useRef(null); // This ref is for the scanner's HTML container
  const [scannerActive, setScannerActive] = useState(false);
  const html5QrcodeScannerRef = useRef(null); // Ref to hold the scanner instance

  /**
   * showMessage function: Displays a temporary message (for barcode section, or general use).
   * @param {string} text The message content.
   * @param {string} type The type of message ('success', 'error', 'info', 'warning').
   */
  const showMessage = (text, type = 'info') => {
    setBarcodeMessage({ text, type }); // Reusing barcodeMessage state for general messages
    setTimeout(() => setBarcodeMessage({ text: "", type: "info" }), 4000);
  };


  // Effect for Firebase Initialization and Authentication
  useEffect(() => {
    // Safely access global Firebase config.
    const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
    const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
    const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

    let app;
    let dbInstance;
    let auth;
    let unsubscribeAuth;

    // IMPORTANT FIX: Initialize Firebase app ONLY if projectId is provided
    if (firebaseConfig && firebaseConfig.projectId) {
      app = initializeApp(firebaseConfig);
      dbInstance = getFirestore(app);
      auth = getAuth(app);
      setDb(dbInstance);

      unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
        if (user) {
          setUserId(user.uid);
          setAuthUser(user);
          showMessage("User authenticated", "success");
        } else {
          try {
            if (initialAuthToken) {
              await signInWithCustomToken(auth, initialAuthToken);
            } else {
              await signInAnonymously(auth);
            }
            setUserId(auth.currentUser?.uid || "anonymous");
            setAuthUser(auth.currentUser);
            showMessage("Signed in anonymously", "info");
          } catch (err) {
            showMessage("Firebase authentication failed: " + err.message, "error");
            setUserId("Error");
          }
        }
      });
    } else {
      console.error("Firebase Error: 'projectId' not found in firebaseConfig. Please ensure __firebase_config is properly set in the environment.");
      showMessage("Firebase setup incomplete. Missing Project ID. Please contact support.", "error");
      setUserId("Error: Config Missing");
    }


    // --- Dynamic loading and initialization of Html5QrcodeScanner ---
    const initializeScanner = () => {
      // Check if Html5QrcodeScanner is available globally and if the container ref exists
      if (typeof window.Html5QrcodeScanner !== 'undefined' && scannerContainerRef.current && !html5QrcodeScannerRef.current) {
        const Html5QrcodeScanner = window.Html5QrcodeScanner; // Access from global window

        const html5QrcodeScanner = new Html5QrcodeScanner(
            "reader", // ID of the HTML element where the scanner will be rendered
            {
                fps: 10,
                qrbox: { width: 250, height: 250 },
                disableFlip: false
            },
            /* verbose= */ false
        );

        const onScanSuccess = (decodedText, decodedResult) => {
            showMessage(`Barcode Scanned: ${decodedText}`, "success");
            html5QrcodeScanner.clear().catch(error => console.error("Failed to clear scanner: ", error));
            setScannerActive(false);
        };

        const onScanError = (errorMessage) => {
            console.warn("Scanning error:", errorMessage);
        };

        html5QrcodeScanner.render(onScanSuccess, onScanError);
        html5QrcodeScannerRef.current = html5QrcodeScanner;
        setScannerActive(true);
      }
    };

    // Load the html5-qrcode script if it's not already on the window object
    if (typeof window.Html5QrcodeScanner === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/html5-qrcode@latest/dist/html5-qrcode.min.js';
        script.async = true;
        script.onload = () => {
            console.log("html5-qrcode script loaded successfully.");
            initializeScanner(); // Try initializing scanner after script loads
        };
        script.onerror = () => {
            console.error("Failed to load html5-qrcode script.");
            showMessage("Failed to load barcode scanner. Please try again.", "error");
        };
        document.body.appendChild(script);
    } else {
        initializeScanner(); // If already loaded, initialize directly
    }

    // Cleanup function for this useEffect
    return () => {
      if (unsubscribeAuth) { // Only unsubscribe if it was set
        unsubscribeAuth();
      }
      if (html5QrcodeScannerRef.current) {
        html5QrcodeScannerRef.current.clear().catch(err => console.error("Scanner cleanup failed:", err));
        html5QrcodeScannerRef.current = null;
      }
      setScannerActive(false);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount


  // Effect to simulate real-time data for SKUs, notifications, and events
  useEffect(() => {
    // Request notification permission on component mount
    if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }

    // Simulate initial SKUs and populate filter options
    const initialSkus = Array.from({ length: 20 }, (_, i) => {
      const location = ['Warehouse A', 'Warehouse B', 'Store C', 'Distribution Hub'][Math.floor(Math.random() * 4)];
      const category = ['Electronics', 'Home Goods', 'Apparel', 'Books', 'Groceries'][Math.floor(Math.random() * 5)];
      uniqueLocations.current.add(location);
      uniqueCategories.current.add(category);

      return {
        id: `SKU${1000 + i}`,
        name: `Product ${String.fromCharCode(65 + i)}`,
        currentStock: Math.floor(Math.random() * 200) + 50,
        reserved: Math.floor(Math.random() * 20),
        inTransit: Math.floor(Math.random() * 10),
        thresholds: {
          low: 50,
          critical: 20,
        },
        location: location,
        category: category,
        syncStatus: 'synced', // Initial sync status
        syncLag: '0s lag',    // Initial sync lag
      };
    });
    setSkus(initialSkus);

    // Simulate real-time updates for SKUs, notifications, and events
    const interval = setInterval(() => {
      setSkus(prevSkus => {
        const updatedSkus = prevSkus.map(sku => { // Use a new array for mapping
          // Simulate stock fluctuation
          const newStock = sku.currentStock + Math.floor(Math.random() * 10) - 5;
          const updatedSku = { ...sku, currentStock: Math.max(0, newStock) };

          // Determine SKU status based on thresholds
          let status = 'healthy';
          if (updatedSku.currentStock <= updatedSku.thresholds.critical) {
            status = 'critical';
          } else if (updatedSku.currentStock <= updatedSku.thresholds.low) {
            status = 'low';
          }

          // Simulate sync status and lag
          const syncStates = ['synced', 'syncing', 'sync error'];
          const newSyncStatus = syncStates[Math.floor(Math.random() * syncStates.length)];
          let newSyncLag = '0s lag';
          if (newSyncStatus === 'syncing') {
            newSyncLag = `${Math.floor(Math.random() * 5) + 1}s lag`;
          } else if (newSyncStatus === 'sync error') {
            newSyncLag = 'sync error';
          }

          // Generate notifications if threshold is crossed
          if (sku.status !== status && (status === 'low' || status === 'critical')) {
            const message = `${updatedSku.name} (${updatedSku.id}) is now ${status}! Current stock: ${updatedSku.currentStock}`;
            setNotifications(prev => [{ id: Date.now(), message, read: false, type: status }, ...prev]);
            if (Notification.permission === 'granted') {
              new Notification('Inventory Alert', { body: message });
            }
            // Add to event stream
            setEvents(prev => [{ id: Date.now(), type: 'threshold_alert', description: message, timestamp: new Date().toLocaleTimeString() }, ...prev].slice(0, 50));
          }

          // Add to event stream if sync status changes
          if (sku.syncStatus !== newSyncStatus) {
            const syncEventMessage = `Sync status for ${updatedSku.name} (${updatedSku.id}) changed to ${newSyncStatus}.`;
            setEvents(prev => [{ id: Date.now(), type: 'sync_update', description: syncEventMessage, timestamp: new Date().toLocaleTimeString() }, ...prev].slice(0, 50));
          }

          return { ...updatedSku, status, syncStatus: newSyncStatus, syncLag: newSyncLag };
        });
        return updatedSkus; // Return the new array
      });

      // Simulate other random inventory events (purchase, sale, adjustment, return)
      const eventTypes = ['purchase', 'sale', 'adjustment', 'return'];
      const randomEventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
      // Select a random SKU from the current `skus` state for events
      // Access skus directly here as it's within the interval closure,
      // but ensure it's not causing a direct re-render of this useEffect.
      // The `skus` state itself is updated by the `setSkus` call above.
      const currentSkus = skus; // Capture current skus for this interval tick
      const randomSku = currentSkus[Math.floor(Math.random() * currentSkus.length)];
      if (randomSku) { // Ensure randomSku is not undefined
        const eventDescription = `${randomEventType.charAt(0).toUpperCase() + randomEventType.slice(1)} event for ${randomSku.name} (${randomSku.id})`;
        setEvents(prev => [{ id: Date.now(), type: randomEventType, description: eventDescription, timestamp: new Date().toLocaleTimeString() }, ...prev].slice(0, 50));
      }

    }, 3000); // Update every 3 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []); // Removed 'skus' from dependency array to prevent infinite loop
  // The 'initialSkus' are only used once on mount. The interval uses the updater function for setSkus.


  // Function to mark all notifications as read
  const markAllNotificationsAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  // Filter SKUs based on search text, status, location, and category
  const filteredSkus = skus.filter(sku => {
    const matchesSearch = sku.id.toLowerCase().includes(filterText.toLowerCase()) ||
                          sku.name.toLowerCase().includes(filterText.toLowerCase()) ||
                          sku.category.toLowerCase().includes(filterText.toLowerCase());
    const matchesStatus = filterStatus === 'all' || sku.status === filterStatus;
    const matchesLocation = filterLocation === 'all' || sku.location === filterLocation;
    const matchesCategory = filterCategory === 'all' || sku.category === filterCategory;
    return matchesSearch && matchesStatus && matchesLocation && matchesCategory;
  });

  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;

  /**
   * simulateBarcodeScan: Fills the barcode form with sample data to demonstrate functionality.
   * Note: This function is present but its UI is not rendered on this page.
   * It's included for consistency if barcode entry were to be re-added.
   */
  const simulateBarcodeScan = () => {
    // This function is not directly tied to a UI element on this page,
    // but can be used for debugging or if the barcode entry section is re-added.
    setForm({
      uniqueNumber: "UPC" + Math.floor(Math.random() * 10000000000), // Random UPC
      productName: "Simulated Product " + String.fromCharCode(65 + Math.floor(Math.random() * 26)),
      brandName: "SimBrand",
      categoryName: ['Electronics', 'Home Goods', 'Apparel', 'Books', 'Groceries'][Math.floor(Math.random() * 5)],
      originalPrice: (Math.random() * 100 + 10).toFixed(2),
      discountedPrice: (Math.random() * 80 + 10).toFixed(2),
      expiryDate: `202${Math.floor(Math.random() * 5) + 8}-12-31`, // e.g., 2028-2032
      stockAvailable: String(Math.floor(Math.random() * 500) + 50),
      manufacturer: "SimManufacturer",
      batchNumber: "BATCH-" + Math.floor(Math.random() * 1000),
      locationInStore: ['Warehouse A', 'Warehouse B', 'Store C', 'Distribution Hub'][Math.floor(Math.random() * 4)],
      supplier: "SimSupplier",
      reorderLevel: String(Math.floor(Math.random() * 50) + 10)
    });
    showMessage("Simulated scan loaded", "success");
  };

  /**
   * handleChange for barcode form: Updates the form state as user types in input fields.
   * Note: This function is present but its UI is not rendered on this page.
   */
  const handleBarcodeFormChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  /**
   * handleSave for barcode form: Saves the product information to Firestore and updates local SKUs state.
   * Note: This function is present but its UI is not rendered on this page.
   */
  const handleSaveProduct = async () => {
    const { uniqueNumber, productName, originalPrice, stockAvailable } = form;
    if (!uniqueNumber || !productName || !originalPrice || !stockAvailable) {
      showMessage("Please fill in all required fields (Unique Number, Product Name, Original Price, Stock Available).", "error");
      return;
    }

    if (!db || !authUser) {
      showMessage("Database not ready or user not authenticated. Please wait.", "warning");
      return;
    }

    try {
      const productData = {
        ...form,
        originalPrice: parseFloat(form.originalPrice),
        discountedPrice: parseFloat(form.discountedPrice) || parseFloat(form.originalPrice),
        stockAvailable: parseInt(form.stockAvailable, 10),
        reorderLevel: parseInt(form.reorderLevel, 10),
        timestamp: new Date(),
        addedBy: userId,
      };

      const productsCollectionRef = collection(db, `artifacts/${__app_id}/public/data/products`);
      await addDoc(productsCollectionRef, productData);

      showMessage("Product saved successfully!", "success");

      // Add the new product to the local SKUs state to reflect it immediately in the table
      setSkus(prevSkus => {
          const newSkuForDisplay = {
              id: productData.uniqueNumber,
              name: productData.productName,
              currentStock: productData.stockAvailable,
              reserved: 0, // Default for new product
              inTransit: 0, // Default for new product
              thresholds: {
                  low: productData.reorderLevel * 2 || 50, // Example: low is twice reorder level
                  critical: productData.reorderLevel || 20, // Example: critical is reorder level
              },
              location: productData.locationInStore || 'Unknown', // Use location from form or default
              category: productData.categoryName || 'Uncategorized', // Use category from form or default
              syncStatus: 'synced', // Assume newly added is synced
              syncLag: '0s lag',
          };
          // Update unique filters for new product
          uniqueLocations.current.add(newSkuForDisplay.location);
          uniqueCategories.current.add(newSkuForDisplay.category);

          return [...prevSkus, newSkuForDisplay];
      });

      // Clear the form after successful save
      setForm({
        uniqueNumber: "", productName: "", brandName: "", categoryName: "", originalPrice: "", discountedPrice: "", expiryDate: "", stockAvailable: "", manufacturer: "", batchNumber: "", locationInStore: "", supplier: "", reorderLevel: ""
      });
    } catch (err) {
      showMessage("Failed to save product: " + err.message, "error");
      console.error("Firestore Save Error:", err);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 p-4 font-['Inter'] text-gray-800">
      {/* Header Section */}
      <header className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-lg shadow-md mb-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 sm:mb-0">Live Stock Dashboard</h1>
        <div className="relative">
          <button
            onClick={() => setShowNotificationsDropdown(prev => !prev)}
            className="relative p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
            aria-label="Notifications"
          >
            <Bell size={24} />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                {unreadCount}
              </span>
            )}
          </button>
          {showNotificationsDropdown && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg z-10 max-h-80 overflow-y-auto border border-gray-200">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-semibold text-lg">Notifications</h3>
                <button
                  onClick={markAllNotificationsAsRead}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Mark all as read
                </button>
              </div>
              {notifications.length === 0 ? (
                <p className="p-4 text-gray-500">No new notifications.</p>
              ) : (
                <ul>
                  {notifications.map(n => (
                    <li key={n.id} className={`p-3 border-b border-gray-100 last:border-b-0 ${n.read ? 'bg-gray-50 text-gray-500' : 'bg-white text-gray-800 font-medium'}`}>
                      <span className={`inline-flex items-center mr-2 ${n.type === 'critical' ? 'text-red-500' : n.type === 'low' ? 'text-yellow-500' : 'text-green-500'}`}>
                        {n.type === 'critical' ? <XCircle size={16} /> : n.type === 'low' ? <AlertTriangle size={16} /> : <CheckCircle size={16} />}
                      </span>
                      {n.message}
                    </li>
                  ))}
                </ul>
              )}
              <button
                onClick={() => setShowNotificationsDropdown(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                aria-label="Close notifications"
              >
                <X size={20} />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column: Search/Filter and Inventory Table */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Barcode Scanner & Product Entry Section (Hidden in this version, but logic is present) */}
          {/* This section is intentionally not rendered in this "updates page" variant.
              The `scannerContainerRef` and `html5QrcodeScannerRef` are still used in useEffect
              to manage the scanner lifecycle, but the UI for it is commented out.
              If you want to see the barcode scanner UI, you would uncomment this section.
          */}
          {/*
          <section className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center border-b border-gray-200 pb-4">
              <Scan className="h-7 w-7 mr-3 text-indigo-600" />
              Barcode Scanner & Product Entry
            </h2>
            <div id="reader" ref={scannerContainerRef} className="w-full max-w-md mx-auto aspect-video border-2 border-dashed border-gray-300 rounded-lg overflow-hidden flex items-center justify-center bg-gray-50">
              {!scannerActive && (
                <p className="text-gray-500 p-4 text-center">
                  Loading scanner... Please ensure camera access is granted.
                  <br/>If the scanner does not appear, your browser or device may not support it directly in this embedded view, or camera permissions are required.
                </p>
              )}
            </div>
            <div className="text-center mt-6">
              <button
                onClick={simulateBarcodeScan}
                className="bg-indigo-600 text-white px-8 py-3 rounded-full hover:bg-indigo-700 text-lg font-semibold shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                Simulate Scan (Load Sample Data)
              </button>
            </div>


            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-center">
                <Package className="h-6 w-6 mr-2 text-teal-600" />
                Product Details Form
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: "uniqueNumber", label: "Unique Number (SKU/UPC)", type: "text", placeholder: "e.g., UPC123456789", required: true },
                  { id: "productName", label: "Product Name", type: "text", placeholder: "e.g., Wireless Mouse", required: true },
                  { id: "brandName", label: "Brand Name", type: "text", placeholder: "e.g., Logitech" },
                  { id: "categoryName", label: "Category", type: "text", placeholder: "e.g., Electronics" },
                  { id: "originalPrice", label: "Original Price ($)", type: "number", placeholder: "e.g., 29.99", step: "0.01", required: true },
                  { id: "discountedPrice", label: "Discounted Price ($)", type: "number", placeholder: "e.g., 24.99", step: "0.01" },
                  { id: "expiryDate", label: "Expiry Date", type: "date", placeholder: "" },
                  { id: "stockAvailable", label: "Stock Available", type: "number", placeholder: "e.g., 100", min: "0", required: true },
                  { id: "manufacturer", label: "Manufacturer", type: "text", placeholder: "e.g., Global Tech Solutions" },
                  { id: "batchNumber", label: "Batch Number", type: "text", placeholder: "e.g., KM-202506-BATCH005" },
                  { id: "locationInStore", label: "Location in Store", type: "text", placeholder: "e.g., Aisle B, Shelf 7, Bin 3" },
                  { id: "supplier", label: "Supplier", type: "text", placeholder: "e.g., ElectroSupply Co." },
                  { id: "reorderLevel", label: "Reorder Level", "type": "number", placeholder: "e.g., 30", min: "0" }
                ].map((field) => (
                  <div key={field.id} className="flex flex-col">
                    <label htmlFor={field.id} className="text-sm font-medium text-gray-700 mb-1 capitalize flex items-center">
                      {field.label} {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <input
                      id={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.id]}
                      onChange={handleBarcodeFormChange}
                      min={field.min}
                      step={field.step}
                      required={field.required}
                      className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={handleSaveProduct}
                className="mt-6 w-full bg-green-600 text-white py-3 rounded-full hover:bg-green-700 text-lg font-medium shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle size={20} />
                  Save Product Information
                </div>
              </button>
              {barcodeMessage.text && (
                <div className={`mt-4 p-3 rounded-lg text-center font-semibold text-md
                  ${barcodeMessage.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' :
                    barcodeMessage.type === 'error' ? 'bg-red-100 text-red-800 border border-red-200' :
                    barcodeMessage.type === 'warning' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                    'bg-blue-100 text-blue-800 border border-blue-200'}`}
                >
                  {barcodeMessage.text}
                </div>
              )}
            </div>
          </section>
          */}

          {/* Search and Filter Section */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">Filter Inventory</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Search Input */}
              <div className="relative col-span-full md:col-span-2 lg:col-span-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search by SKU, name, or category..."
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {/* Status Filter */}
              <div>
                <label htmlFor="status-filter" className="sr-only">Filter by Status</label>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <select
                    id="status-filter"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Statuses</option>
                    <option value="healthy">Healthy (Green)</option>
                    <option value="low">Low (Yellow)</option>
                    <option value="critical">Critical (Red)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>
              {/* Location Filter */}
              <div>
                <label htmlFor="location-filter" className="sr-only">Filter by Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <select
                    id="location-filter"
                    value={filterLocation}
                    onChange={(e) => setFilterLocation(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Locations</option>
                    {[...uniqueLocations.current].map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>
              {/* Category Filter */}
              <div>
                <label htmlFor="category-filter" className="sr-only">Filter by Category</label>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <select
                    id="category-filter"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Categories</option>
                    {[...uniqueCategories.current].map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Inventory Table */}
          <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
            <h2 className="text-xl font-semibold mb-3">SKU Inventory List</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU ID</th>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reserved</th>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">In-Transit</th>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sync Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSkus.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-4 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                      No matching SKUs found.
                    </td>
                  </tr>
                ) : (
                  filteredSkus.map(sku => (
                    <tr key={sku.id}>
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{sku.id}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{sku.name}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{sku.currentStock}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{sku.reserved}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{sku.inTransit}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${(sku.status || '') === 'healthy' ? 'bg-green-100 text-green-800' :
                            (sku.status || '') === 'low' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'}`
                        }>
                          {(sku.status || '').charAt(0).toUpperCase() + (sku.status || '').slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{sku.location}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${(sku.syncStatus || '') === 'synced' ? 'bg-blue-100 text-blue-800' :
                            (sku.syncStatus || '') === 'syncing' ? 'bg-orange-100 text-orange-800' :
                            'bg-red-100 text-red-800'}`
                        }>
                          {(sku.syncStatus || '').charAt(0).toUpperCase() + (sku.syncStatus || '').slice(1)} ({sku.syncLag})
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Event Stream and Analytics */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          {/* Activity Feed / Event Stream */}
          <div className="bg-white p-4 rounded-lg shadow-md flex-1 min-h-[300px] max-h-[500px] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-3">Activity Feed (Last 50 Events)</h2>
            {events.length === 0 ? (
              <p className="text-gray-500">No events yet.</p>
            ) : (
              <ul className="space-y-2">
                {events.map(event => (
                  <li key={event.id} className="text-sm text-gray-700 border-b border-gray-100 pb-2 last:border-b-0">
                    <span className="font-semibold text-gray-900 mr-1">[{event.timestamp}]</span>
                    <span className={`font-medium ${event.type === 'threshold_alert' ? 'text-red-600' : 'text-blue-600'}`}>
                      {event.type.replace(/_/g, ' ').toUpperCase()}:
                    </span> {event.description}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Analytics & Insights Preview */}
          <div className="bg-white p-4 rounded-lg shadow-md flex-1">
            <h2 className="text-xl font-semibold mb-3">Analytics & Insights Preview</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                <h3 className="font-medium text-gray-800 mb-1 flex items-center"><DollarSign size={18} className="mr-2 text-green-600"/>Inventory Turnover Rate</h3>
                <p className="text-gray-600 text-sm">
                  <span className="font-bold text-lg text-green-600">4.2x</span> (Last 30 Days)
                </p>
                <p className="text-xs text-gray-500">
                  <span className="text-green-500">↑ 0.5x</span> from previous period.
                </p>
                <div className="h-4 bg-blue-200 rounded-full mt-2">
                  <div className="h-full bg-blue-500 rounded-full w-[70%]"></div> {/* Placeholder for mini-chart */}
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                <h3 className="font-medium text-gray-800 mb-1 flex items-center"><Truck size={18} className="mr-2 text-yellow-600"/>Days-of-Stock Remaining</h3>
                <p className="text-gray-600 text-sm">
                  <span className="font-bold text-lg text-yellow-600">28 Days</span> (Average)
                </p>
                <p className="text-xs text-gray-500">
                  <span className="text-red-500">↓ 3 Days</span> from target.
                </p>
                <div className="h-4 bg-yellow-200 rounded-full mt-2">
                  <div className="h-full bg-yellow-500 rounded-full w-[50%]"></div> {/* Placeholder for mini-chart */}
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                <h3 className="font-medium text-gray-800 mb-1 flex items-center"><AlertTriangle size={18} className="mr-2 text-red-600"/>Low-Stock Forecast (Next 7 Days)</h3>
                <p className="text-gray-600 text-sm">
                  <span className="font-bold text-lg text-red-600">5 SKUs</span> projected to be critical.
                </p>
                <p className="text-xs text-gray-500">
                  Action required for high-demand items.
                </p>
                <div className="h-4 bg-red-200 rounded-full mt-2">
                  <div className="h-full bg-red-500 rounded-full w-[80%]"></div> {/* Placeholder for mini-chart */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveStockUpdatesPage;
