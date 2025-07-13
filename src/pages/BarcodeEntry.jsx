import React, { useEffect, useState, useRef } from "react";
// Removed direct import: import { Html5QrcodeScanner } from "html5-qrcode";
// Html5QrcodeScanner will be loaded via a script tag and accessed from window

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore"; // Ensure addDoc is imported
import { getAuth, onAuthStateChanged, signInAnonymously, signInWithCustomToken } from "firebase/auth";


const BarcodeEntry = () => {
  const [form, setForm] = useState({
    uniqueNumber: "",
    productName: "",
    brandName: "",
    categoryName: "",
    originalPrice: "",
    discountedPrice: "",
    expiryDate: "",
    stockAvailable: "",
    manufacturer: "",
    batchNumber: "",
    locationInStore: "",
    supplier: "",
    reorderLevel: ""
  });

  const [message, setMessage] = useState({ text: "", type: "info" });
  const [userId, setUserId] = useState("Loading...");
  const [db, setDb] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const scannerRef = useRef(null); // reference for barcode scanner
  const fileInputRef = useRef(null); // Ref for the file input
  const [html5QrcodeScannerLoaded, setHtml5QrcodeScannerLoaded] = useState(false);

  useEffect(() => {
    // Dynamically load the html5-qrcode script (corrected CDN link and async loading)
    const scriptId = "html5-qrcode-script";
    const scriptSrc = "https://cdnjs.cloudflare.com/ajax/libs/html5-qrcode/2.3.8/html5-qrcode.min.js"; 

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = scriptSrc;
      script.async = true; // Load asynchronously to prevent blocking
      script.onload = () => {
        setTimeout(() => {
          if (typeof window.Html5QrcodeScanner === 'function') {
            setHtml5QrcodeScannerLoaded(true);
            console.log("html5-qrcode script loaded and constructor found.");
          } else {
            console.error("html5-qrcode script loaded, but Html5QrcodeScanner constructor not found on window.");
            showMessage("Failed to initialize barcode scanner (constructor missing).", "error");
          }
        }, 100); // Small delay to ensure script parsing
      };
      script.onerror = () => {
        console.error("Failed to load html5-qrcode script from CDN.");
        showMessage("Failed to load barcode scanner library.", "error");
      };
      document.body.appendChild(script);
    } else {
      // If script is already loaded, ensure state reflects that
      if (typeof window.Html5QrcodeScanner === 'function') {
        setHtml5QrcodeScannerLoaded(true);
      } else {
        // If not ready, re-check after a short delay
        setTimeout(() => {
          if (typeof window.Html5QrcodeScanner === 'function') {
            setHtml5QrcodeScannerLoaded(true);
          } else {
            showMessage("Barcode scanner constructor still not found after retry.", "error");
          }
        }, 500);
      }
    }

    // --- Firebase Setup (corrected to use global __firebase_config and __app_id) ---
    const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
    const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};

    if (Object.keys(firebaseConfig).length === 0) {
      showMessage("Firebase configuration is missing. Cannot initialize Firebase.", "error");
      return;
    }

    const app = initializeApp(firebaseConfig);
    const dbInstance = getFirestore(app);
    const auth = getAuth(app);
    setDb(dbInstance);

    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        setAuthUser(user);
        showMessage("User authenticated.", "success");
      } else {
        try {
          if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
            await signInWithCustomToken(auth, __initial_auth_token);
          } else {
            await signInAnonymously(auth);
          }
        } catch (err) {
          showMessage("Firebase authentication failed: " + err.message, "error");
          setUserId("Error");
          setAuthUser(null);
        }
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, []); // Empty dependency array for initial setup

  // Effect for barcode scanner initialization (depends on script load status)
  useEffect(() => {
    // Only attempt to initialize if the script is loaded, the reader element exists,
    // and the scanner hasn't been initialized yet.
    if (html5QrcodeScannerLoaded && document.getElementById("reader") && !scannerRef.current) {
      try {
        const Html5QrcodeScanner = window.Html5QrcodeScanner; 

        scannerRef.current = new Html5QrcodeScanner(
          "reader",
          {
            fps: 10,
            qrbox: 250, // This defines the scanning box size for both QR and Barcodes
            // cameraFacingMode: "environment" // Uncomment if you want to explicitly use the rear camera
          },
          /* verbose= */ false
        );

        scannerRef.current.render(
          (decodedText, decodedResult) => {
            setForm((prev) => ({ ...prev, uniqueNumber: decodedText }));
            showMessage(`Barcode Scanned: ${decodedText}`, "success");
            scannerRef.current.clear(); // Stop scanner after successful scan
          },
          (error) => {
            // console.warn("Scanning error:", error); // Can be noisy, uncomment for debugging
          }
        );
      } catch (e) {
        console.error("Error initializing Html5QrcodeScanner:", e);
        showMessage("Error starting barcode scanner: " + e.message, "error");
      }
    }

    // Cleanup scanner on unmount
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(err => console.error("Scanner cleanup failed:", err));
        scannerRef.current = null;
      }
    };
  }, [html5QrcodeScannerLoaded]); // Re-run effect if html5QrcodeScannerLoaded changes

  const showMessage = (text, type = 'info') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "info" }), 4000);
  };

  const simulateScan = () => {
    setForm({
      uniqueNumber: "UPC1234567890",
      productName: "Ergonomic Keyboard",
      brandName: "KeyMaster",
      categoryName: "Computer Accessories",
      originalPrice: "75.00",
      discountedPrice: "60.00",
      expiryDate: "2026-12-31",
      stockAvailable: "250",
      manufacturer: "Global Tech Solutions",
      batchNumber: "KM-202506-BATCH005",
      locationInStore: "Aisle B, Shelf 7, Bin 3",
      supplier: "ElectroSupply Co.",
      reorderLevel: "30"
    });
    showMessage("Simulated scan loaded", "success");
  };

  // Handler for image file selection
  const onFileSelected = async (event) => {
    if (event.target.files.length === 0) {
      return;
    }
    const imageFile = event.target.files[0];

    if (scannerRef.current && typeof scannerRef.current.scanFile === 'function') {
      try {
        showMessage("Scanning image...", "info");
        // Stop existing camera if running, then scan file
        // Check if scanner is currently running a camera (is property)
        if (scannerRef.current.is  && scannerRef.current.isScanning) { 
            await scannerRef.current.stop();
        }
        const decodedText = await scannerRef.current.scanFile(imageFile);
        setForm((prev) => ({ ...prev, uniqueNumber: decodedText }));
        showMessage(`Barcode Scanned from image: ${decodedText}`, "success");
        // After file scan, re-render the camera for live scanning if needed
        if (document.getElementById("reader")) {
          scannerRef.current.render(
            (decodedText, decodedResult) => {
              setForm((prev) => ({ ...prev, uniqueNumber: decodedText }));
              showMessage(`Barcode Scanned: ${decodedText}`, "success");
              scannerRef.current.clear();
            },
            (error) => { /* console.warn("Scanning error:", error); */ }
          );
        }
      } catch (err) {
        console.error("Error scanning file:", err);
        showMessage("Error scanning image: " + err.message, "error");
        // Ensure camera is restarted if it was stopped and an error occurred
        if (document.getElementById("reader")) {
          scannerRef.current.render(
            (decodedText, decodedResult) => {
              setForm((prev) => ({ ...prev, uniqueNumber: decodedText }));
              showMessage(`Barcode Scanned: ${decodedText}`, "success");
              scannerRef.current.clear();
            },
            (error) => { /* console.warn("Scanning error:", error); */ }
          );
        }
      }
    } else {
      showMessage("Scanner not ready or does not support file scanning.", "error");
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = async () => {
    const { uniqueNumber, productName, originalPrice, stockAvailable } = form;
    if (!uniqueNumber || !productName || !originalPrice || !stockAvailable) {
      showMessage("Please fill in all required fields (Unique Number, Product Name, Original Price, Stock Available).", "error");
      return;
    }

    if (!db || !userId || userId === "Loading..." || userId === "Error") {
      showMessage("Firebase is not initialized or user not authenticated. Please wait.", "error");
      return;
    }

    try {
      const productData = {
        ...form,
        originalPrice: parseFloat(form.originalPrice),
        discountedPrice: form.discountedPrice ? parseFloat(form.discountedPrice) : parseFloat(form.originalPrice),
        stockAvailable: parseInt(form.stockAvailable),
        reorderLevel: parseInt(form.reorderLevel) || 0,
        timestamp: new Date().toISOString(), // Store as ISO string
        addedBy: userId,
      };

      const currentAppId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
      await addDoc(collection(db, `artifacts/${currentAppId}/public/data/products`), productData);
      showMessage("Product saved successfully!", "success");
      
      setForm({
        uniqueNumber: "", productName: "", brandName: "", categoryName: "", originalPrice: "", discountedPrice: "", expiryDate: "", stockAvailable: "", manufacturer: "", batchNumber: "", locationInStore: "", supplier: "", reorderLevel: ""
      });

    } catch (err) {
      showMessage("Save failed: " + err.message, "error");
      console.error("Firebase save error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center font-sans">
      {/* Header */}
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6 mb-6">
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-4">Product Inventory Manager</h1>
        <p className="text-center text-gray-600 text-sm">Welcome! Your User ID: <span className="font-semibold text-blue-600">{userId}</span></p>
      </div>

      {/* Barcode Scanner Section */}
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6 mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Scan Barcode</h3>
        <p className="text-center text-gray-600 mb-4">
          {html5QrcodeScannerLoaded ? "Place a barcode in front of your camera or choose an image file." : "Loading barcode scanner..."}
        </p>
        <div id="reader" className="w-full max-w-md mx-auto aspect-video border-2 border-dashed border-gray-300 rounded-lg overflow-hidden"></div>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            onClick={simulateScan}
            className="flex-1 bg-indigo-600 text-white px-8 py-3 rounded-full hover:bg-indigo-700 text-lg font-medium shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            Simulate Scan
          </button>
          <input
            type="file"
            accept="image/*"
            onChange={onFileSelected}
            ref={fileInputRef}
            className="hidden" // Hide the default file input
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className="flex-1 bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 text-lg font-medium shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            Choose Image to Scan
          </button>
        </div>
      </div>

      {/* Product Information Form */}
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-8 mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Product Details Form</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Object.entries({
            uniqueNumber: { label: "Unique Barcode/Product ID", type: "text", placeholder: "e.g., UPC123456789", required: true },
            productName: { label: "Product Name", type: "text", placeholder: "e.g., Wireless Mouse", required: true },
            brandName: { label: "Brand Name", type: "text", placeholder: "e.g., Logitech", required: false },
            categoryName: { label: "Category", type: "text", placeholder: "e.g., Peripherals, Electronics", required: false },
            originalPrice: { label: "Original Price", type: "number", placeholder: "e.g., 29.99", required: true },
            discountedPrice: { label: "Discounted Price", type: "number", placeholder: "e.g., 24.99 (Optional)", required: false },
            expiryDate: { label: "Expiry Date", type: "date", placeholder: "", required: false },
            stockAvailable: { label: "Stock Available", type: "number", placeholder: "e.g., 100", required: true },
            manufacturer: { label: "Manufacturer", type: "text", placeholder: "e.g., Tech Inc.", required: false },
            batchNumber: { label: "Batch Number", type: "text", placeholder: "e.g., BATCH-001", required: false },
            locationInStore: { label: "Location in Store", type: "text", placeholder: "e.g., Shelf A3", required: false },
            supplier: { label: "Supplier", type: "text", placeholder: "e.g., Supplier Ltd.", required: false },
            reorderLevel: { label: "Reorder Level", type: "number", placeholder: "e.g., 20 (When to reorder)", required: false }
          }).map(([id, { label, type, placeholder, required }]) => (
            <div key={id} className="flex flex-col">
              <label htmlFor={id} className="text-sm font-semibold text-gray-700 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
              </label>
              <input
                id={id}
                type={type}
                placeholder={placeholder}
                value={form[id]}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                required={required}
                min={type === 'number' ? "0" : undefined}
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleSave}
          className="mt-8 w-full bg-green-600 text-white py-4 rounded-full hover:bg-green-700 text-lg font-medium shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Save Product Information
        </button>

        {/* Alert message */}
        {message.text && (
          <div className={`mt-6 p-4 rounded-lg text-center font-medium ${
            message.type === 'success' ? 'bg-green-100 text-green-800' :
            message.type === 'error' ? 'bg-red-100 text-red-800' :
            'bg-blue-100 text-blue-800'
          } shadow-md`}>
            {message.text}
          </div>
        )}
      </div>

      {/* Footer / Credits */}
      <div className="text-center text-gray-500 text-sm mt-8">
        <p>Powered by Firebase & Barcode Scanner</p> {/* Changed from Html5-Qrcode */}
        <p>&copy; 2025 Product Inventory System</p>
      </div>
    </div>
  );
};

export default BarcodeEntry;
