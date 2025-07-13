import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; // Import Chart.js
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import Data Labels Plugin
import annotationPlugin from 'chartjs-plugin-annotation'; // Import Annotation Plugin

// Register the plugins with Chart.js
Chart.register(ChartDataLabels, annotationPlugin);

const DynamicForecasting = () => {
    // State for filters
    const [filters, setFilters] = useState({
        region: 'all',
        store: 'all',
        fc: 'all',
        sku: 'all',
    });

    // State for KPIs (simulated dynamic data)
    const [kpis, setKpis] = useState({
        mape: '88.5%',
        totalDemand: '1.2M Units',
        stockOutRisk: '3.1%',
        inventoryValue: '$125M',
        filteredMape: '89.2%',
        filteredStockOut: '2.8%',
        lastRefresh: new Date().toLocaleString(), // Current date and time
        forecastConfidence: 'High (92%)',
    });

    // State for SKU table data (simulated)
    const [skuData, setSkuData] = useState([
        { sku: 'SKU-12345', productName: 'Organic Apples (Red)', currentStock: 50, forecast30d: 300, forecast60d: 620, forecast90d: 950, coverageDays: 5, reorderQty: 200, confidenceInterval: '+/- 15 units', riskRating: 'High' },
        { sku: 'SKU-67890', productName: 'HDTV 55-inch Smart', currentStock: 120, forecast30d: 40, forecast60d: 85, forecast90d: 130, coverageDays: 90, reorderQty: 0, confidenceInterval: '+/- 5 units', riskRating: 'Medium' },
        { sku: 'SKU-11223', productName: 'Paper Towels (6-pack)', currentStock: 500, forecast30d: 450, forecast60d: 900, forecast90d: 1300, coverageDays: 35, reorderQty: 100, confidenceInterval: '+/- 20 units', riskRating: 'Low' },
        { sku: 'SKU-98765', productName: 'Organic Bananas', currentStock: 80, forecast30d: 200, forecast60d: 410, forecast90d: 600, coverageDays: 12, reorderQty: 150, confidenceInterval: '+/- 10 units', riskRating: 'High' },
        { sku: 'SKU-54321', productName: 'Laptop (Gaming)', currentStock: 30, forecast30d: 20, forecast60d: 45, forecast90d: 70, coverageDays: 45, reorderQty: 0, confidenceInterval: '+/- 3 units', riskRating: 'Low' },
        { sku: 'SKU-90001', productName: 'Wireless Earbuds Pro', currentStock: 250, forecast30d: 180, forecast60d: 350, forecast90d: 500, coverageDays: 40, reorderQty: 0, confidenceInterval: '+/- 10 units', riskRating: 'Low' },
        { sku: 'SKU-77777', productName: 'Coffee Maker (Espresso)', currentStock: 45, forecast30d: 60, forecast60d: 125, forecast90d: 190, coverageDays: 20, reorderQty: 50, confidenceInterval: '+/- 8 units', riskRating: 'Medium' },
        { sku: 'SKU-00100', productName: 'Detergent (Large)', currentStock: 700, forecast30d: 650, forecast60d: 1200, forecast90d: 1700, coverageDays: 28, reorderQty: 0, confidenceInterval: '+/- 25 units', riskRating: 'Low' },
    ]);
    const [sortedColumn, setSortedColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const [searchTerm, setSearchTerm] = useState('');
    const [predictedSales, setPredictedSales] = useState('--');

    // New states for Inventory Performance and Supplier Performance
    const [inventoryPerformance, setInventoryPerformance] = useState({
        turnoverMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        turnoverRates: [3.5, 3.7, 3.2, 3.8, 3.6, 3.9],
        carryingCost: '$1.5M',
        onTimeShipping: '95%',
    });

    const [supplierPerformance, setSupplierPerformance] = useState([
        { name: 'Supplier A (Fruits)', onTimeDelivery: '98%', defectRate: '0.5%', leadTime: '3 days' },
        { name: 'Supplier B (Electronics)', onTimeDelivery: '92%', defectRate: '1.2%', leadTime: '10 days' },
        { name: 'Supplier C (Home Goods)', onTimeDelivery: '95%', defectRate: '0.8%', leadTime: '7 days' },
    ]);

    // State for Key Alerts (NEW)
    const [keyAlerts, setKeyAlerts] = useState([
        { type: 'High', message: 'SKU-12345 (Organic Apples) - Projected Stock-out in 5 days due to demand surge.', action: 'Expedite reorder of 200 units.' },
        { type: 'Medium', message: 'Region North East - Higher than average returns rate detected (7.2%).', action: 'Investigate root cause and adjust safety stock.' },
        { type: 'Low', message: 'Supplier B (Electronics) - Lead time extended to 12 days for specific components.', action: 'Monitor critical SKU stock levels.' },
    ]);


    // Refs for Chart.js instances
    const historicalTrendsChartRef = useRef(null);
    const returnsStockChartRef = useRef(null);
    const demandForecastChartRef = useRef(null);
    const anomalyChartRef = useRef(null);
    const inventoryTurnoverChartRef = useRef(null); // New ref for inventory turnover chart

    // Simulated Chart Data generation functions
    const generateHistoricalData = (baseSales, baseUnits, months = 6) => {
        const labels = [];
        const sales = [];
        const units = [];
        const today = new Date();
        for (let i = months - 1; i >= 0; i--) {
            const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
            labels.push(date.toLocaleString('default', { month: 'short', year: '2-digit' }));
            sales.push(Math.floor(baseSales * (1 + Math.random() * 0.2 - 0.1)));
            units.push(Math.floor(baseUnits * (1 + Math.random() * 0.15 - 0.05)));
        }
        return { labels, sales, units };
    };

    const generateReturnsStockData = (baseReturns, baseStock, months = 6) => {
        const labels = [];
        const returns = [];
        const stock = [];
        const today = new Date();
        for (let i = months - 1; i >= 0; i--) {
            const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
            labels.push(date.toLocaleString('default', { month: 'short', year: '2-digit' }));
            returns.push(Math.floor(baseReturns * (1 + Math.random() * 0.1 - 0.05)));
            stock.push(Math.floor(baseStock * (1 + Math.random() * 0.08 - 0.04)));
        }
        return { labels, returns, stock };
    };

    const generateDemandForecastData = (currentDemand = 1500) => {
        const forecasted30 = Math.floor(currentDemand * (1 + Math.random() * 0.1) + 50); // Add a slight upward trend
        const forecasted60 = Math.floor(forecasted30 * (1 + Math.random() * 0.08) + 30);
        const forecasted90 = Math.floor(forecasted60 * (1 + Math.random() * 0.07) + 20);

        // Confidence bands are +/- percentages
        const ci30Upper = Math.floor(forecasted30 * 1.05);
        const ci30Lower = Math.floor(forecasted30 * 0.95);
        const ci60Upper = Math.floor(forecasted60 * 1.08);
        const ci60Lower = Math.floor(forecasted60 * 0.92);
        const ci90Upper = Math.floor(forecasted90 * 1.10);
        const ci90Lower = Math.floor(forecasted90 * 0.90);

        return {
            labels: ['Current', 'Day 30', 'Day 60', 'Day 90'],
            datasets: [
                {
                    label: 'Actual/Known Demand',
                    data: [currentDemand, null, null, null],
                    borderColor: '#4B5563', // Gray
                    backgroundColor: 'rgba(75, 85, 99, 0.2)',
                    pointRadius: 5,
                    pointBackgroundColor: '#4B5563',
                    tension: 0.3,
                    fill: false,
                },
                {
                    label: 'Forecasted Demand',
                    data: [null, forecasted30, forecasted60, forecasted90],
                    borderColor: '#2563EB', // Blue
                    backgroundColor: 'rgba(37, 99, 235, 0.2)',
                    tension: 0.3,
                    fill: false,
                },
                {
                    label: 'Confidence Upper',
                    data: [null, ci30Upper, ci60Upper, ci90Upper],
                    borderColor: 'rgba(37, 99, 235, 0.3)',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    borderDash: [5, 5],
                    tension: 0.3,
                    pointRadius: 0,
                    fill: '-1', // Fill to the previous dataset (Confidence Lower)
                },
                {
                    label: 'Confidence Lower',
                    data: [null, ci30Lower, ci60Lower, ci90Lower],
                    borderColor: 'rgba(37, 99, 235, 0.3)',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    borderDash: [5, 5],
                    tension: 0.3,
                    pointRadius: 0,
                    fill: false, // Do not fill from here
                },
            ],
        };
    };

    const generateAnomalyChartData = () => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
        // Simulate an anomaly in July (e.g., a flash sale)
        const actualSales = [1000, 1100, 1050, 1200, 1150, 1300, 2400, 1250, 1180, 1220];
        const forecastedSales = [1000, 1080, 1040, 1180, 1130, 1280, 1350, 1250, 1200, 1230];

        return {
            labels: months,
            datasets: [
                {
                    label: 'Actual Sales',
                    data: actualSales,
                    borderColor: '#22C55E', // Green for actual
                    backgroundColor: 'rgba(34, 197, 94, 0.2)',
                    tension: 0.3,
                    fill: false,
                    pointRadius: 5,
                    pointBackgroundColor: '#22C55E',
                },
                {
                    label: 'Forecasted Sales (Baseline)',
                    data: forecastedSales,
                    borderColor: '#EF4444', // Red for baseline forecast
                    backgroundColor: 'rgba(239, 68, 68, 0.2)',
                    tension: 0.3,
                    fill: false,
                    pointRadius: 0,
                    borderDash: [5, 5], // Dashed line for forecast
                },
            ],
        };
    };

    // Initialize charts on component mount and on filter change
    useEffect(() => {
        // Destroy existing chart instances before creating new ones
        if (historicalTrendsChartRef.current) historicalTrendsChartRef.current.destroy();
        if (returnsStockChartRef.current) returnsStockChartRef.current.destroy();
        if (demandForecastChartRef.current) demandForecastChartRef.current.destroy();
        if (anomalyChartRef.current) anomalyChartRef.current.destroy();
        if (inventoryTurnoverChartRef.current) inventoryTurnoverChartRef.current.destroy(); // Destroy new chart

        // Simulate data update based on filters (simple for demo)
        const currentHistoricalData = generateHistoricalData(filters.region === 'north-east' ? 150000 : 100000, filters.store === 'store-101' ? 18000 : 12000);
        const currentReturnsStockData = generateReturnsStockData(filters.region === 'north-east' ? 800 : 500, filters.fc === 'fc-east' ? 15000 : 10000);
        const currentDemandForecastData = generateDemandForecastData(filters.sku === 'sku-12345' ? 200 : 1500); // Specific SKU has lower demand
        const currentAnomalyChartData = generateAnomalyChartData();

        // Historical Trends Chart
        const historicalTrendsCtx = document.getElementById('historicalTrendsChart').getContext('2d');
        historicalTrendsChartRef.current = new Chart(historicalTrendsCtx, {
            type: 'line',
            data: {
                labels: currentHistoricalData.labels,
                datasets: [
                    {
                        label: 'Units Shipped',
                        data: currentHistoricalData.units,
                        borderColor: '#3B82F6', // Blue
                        backgroundColor: 'rgba(59, 130, 246, 0.2)',
                        tension: 0.3,
                        fill: false,
                        yAxisID: 'y', // Primary Y-axis
                    },
                    {
                        label: 'Sales ($)',
                        data: currentHistoricalData.sales,
                        borderColor: '#10B981', // Green
                        backgroundColor: 'rgba(16, 185, 129, 0.2)',
                        tension: 0.3,
                        fill: false,
                        yAxisID: 'y1', // Secondary Y-axis
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: { display: false },
                    legend: { position: 'bottom' },
                    datalabels: { display: false }, // Data labels off by default
                },
                scales: {
                    x: { title: { display: true, text: 'Month' } },
                    y: { title: { display: true, text: 'Units' }, beginAtZero: true },
                    y1: {
                        type: 'linear',
                        position: 'right',
                        title: { display: true, text: 'Sales ($)' },
                        grid: { drawOnChartArea: false }, // Only draw grid lines for the first Y-axis
                    },
                },
            },
        });

        // Returns & Stock on Hand Chart
        const returnsStockCtx = document.getElementById('returnsStockChart').getContext('2d');
        returnsStockChartRef.current = new Chart(returnsStockCtx, {
            type: 'line',
            data: {
                labels: currentReturnsStockData.labels,
                datasets: [
                    {
                        label: 'Returns',
                        data: currentReturnsStockData.returns,
                        borderColor: '#EF4444', // Red
                        backgroundColor: 'rgba(239, 68, 68, 0.2)',
                        tension: 0.3,
                        fill: false,
                        yAxisID: 'y',
                    },
                    {
                        label: 'Stock on Hand',
                        data: currentReturnsStockData.stock,
                        borderColor: '#8B5CF6', // Purple
                        backgroundColor: 'rgba(139, 92, 246, 0.2)',
                        tension: 0.3,
                        fill: false,
                        yAxisID: 'y1',
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: { display: false },
                    legend: { position: 'bottom' },
                    datalabels: { display: false },
                },
                scales: {
                    x: { title: { display: true, text: 'Month' } },
                    y: { title: { display: true, text: 'Units' }, beginAtZero: true },
                    y1: {
                        type: 'linear',
                        position: 'right',
                        title: { display: true, text: 'Stock on Hand' },
                        grid: { drawOnChartArea: false },
                    },
                },
            },
        });

        // Demand Forecast Chart
        const demandForecastCtx = document.getElementById('demandForecastChart').getContext('2d');
        demandForecastChartRef.current = new Chart(demandForecastCtx, {
            type: 'line',
            data: currentDemandForecastData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: { display: false },
                    legend: { position: 'bottom' },
                    datalabels: { display: false },
                },
                scales: {
                    x: { title: { display: true, text: 'Time Horizon' } },
                    y: { title: { display: true, text: 'Demand (Units)' }, beginAtZero: true },
                },
            },
        });

        // Anomaly Detection Chart
        const anomalyChartCtx = document.getElementById('anomalyChart').getContext('2d');
        anomalyChartRef.current = new Chart(anomalyChartCtx, {
            type: 'line',
            data: currentAnomalyChartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: { display: false },
                    legend: { position: 'bottom' },
                    datalabels: { display: false },
                    annotation: {
                        annotations: {
                            line1: {
                                type: 'line',
                                xMin: 'Jul', // X-axis label for July
                                xMax: 'Jul',
                                borderColor: 'rgb(255, 99, 132)', // Red
                                borderWidth: 2,
                                label: {
                                    content: 'Anomaly Detected',
                                    enabled: true,
                                    position: 'end', // Position label at the end of the line
                                    backgroundColor: 'rgba(255, 99, 132, 0.8)',
                                    color: 'white',
                                    font: { size: 10, weight: 'bold' },
                                    yAdjust: -10, // Adjust label position slightly
                                },
                            },
                        },
                    },
                },
                scales: {
                    x: { title: { display: true, text: 'Month' } },
                    y: { title: { display: true, text: 'Sales (Units)' }, beginAtZero: true },
                },
            },
        });

        // Inventory Turnover Chart (NEW)
        const inventoryTurnoverCtx = document.getElementById('inventoryTurnoverChart').getContext('2d');
        inventoryTurnoverChartRef.current = new Chart(inventoryTurnoverCtx, {
            type: 'bar',
            data: {
                labels: inventoryPerformance.turnoverMonths,
                datasets: [{
                    label: 'Inventory Turnover Rate',
                    data: inventoryPerformance.turnoverRates,
                    backgroundColor: '#06B6D4', // Cyan
                    borderColor: '#0891B2',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: { display: false },
                    legend: { display: false },
                    datalabels: {
                        anchor: 'end',
                        align: 'top',
                        formatter: value => value.toFixed(1), // Show one decimal place
                        color: '#4B5563',
                        font: { weight: 'bold' }
                    }
                },
                scales: {
                    x: { title: { display: true, text: 'Month' } },
                    y: {
                        title: { display: true, text: 'Turnover Rate (times)' },
                        beginAtZero: true,
                        max: 5 // Max value for better visualization
                    },
                },
            },
        });


        // Cleanup function for charts
        return () => {
            if (historicalTrendsChartRef.current) historicalTrendsChartRef.current.destroy();
            if (returnsStockChartRef.current) returnsStockChartRef.current.destroy();
            if (demandForecastChartRef.current) demandForecastChartRef.current.destroy();
            if (anomalyChartRef.current) anomalyChartRef.current.destroy();
            if (inventoryTurnoverChartRef.current) inventoryTurnoverChartRef.current.destroy();
        };
    }, [filters, inventoryPerformance]); // Re-run effect when filters or inventoryPerformance changes

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.id.replace('filter-', '')]: e.target.value });
    };

    const applyFilters = () => {
        // In a real application, you'd fetch filtered data from an API based on 'filters' state
        // For this demo, we'll just simulate a change in filtered KPIs
        console.log('Applying filters:', filters);

        // Simulate KPI changes based on filter selection
        let newMape = '89.2%';
        let newStockOut = '2.8%';
        if (filters.region === 'north-east') {
            newMape = '87.0%';
            newStockOut = '4.5%'; // Higher risk in a specific region
        } else if (filters.sku === 'sku-12345') {
            newMape = '85.0%'; // Specific SKU might have lower forecast accuracy
            newStockOut = '7.0%'; // And higher risk
        }

        setKpis(prevKpis => ({
            ...prevKpis,
            filteredMape: newMape,
            filteredStockOut: newStockOut,
        }));

        // Simulate changes to inventory performance based on filters
        const newTurnoverRates = [...inventoryPerformance.turnoverRates];
        if (filters.region === 'north-east') {
            // Increase turnover slightly for north-east
            setInventoryPerformance(prev => ({
                ...prev,
                turnoverRates: prev.turnoverRates.map(rate => rate * 1.1).map(r => parseFloat(r.toFixed(1))),
                carryingCost: '$1.4M'
            }));
        } else {
             // Reset to base if not filtered to north-east
            setInventoryPerformance(prev => ({
                ...prev,
                turnoverRates: [3.5, 3.7, 3.2, 3.8, 3.6, 3.9],
                carryingCost: '$1.5M'
            }));
        }

        // Simulate alerts changing based on filters (e.g., more alerts for a risky SKU)
        let updatedAlerts = [];
        if (filters.sku === 'sku-12345' || filters.region === 'north-east') {
            updatedAlerts.push({ type: 'High', message: 'CRITICAL: High stock-out risk detected for critical SKUs in filtered region!', action: 'Review immediate reorder needs.' });
        }
        updatedAlerts.push({ type: 'Medium', message: 'Supplier A (Fruits) - Recent minor delivery delays.', action: 'Contact supplier for status update.' });
        setKeyAlerts(updatedAlerts);

        // The useEffect hook above will re-render charts with simulated data based on filters
    };

    const filterTable = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const sortTable = (columnIndex) => {
        const newDirection = sortedColumn === columnIndex && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortDirection(newDirection);
        setSortedColumn(columnIndex);

        const sortedData = [...skuData].sort((a, b) => {
            let aValue, bValue;
            switch (columnIndex) {
                case 0: // SKU
                    aValue = a.sku;
                    bValue = b.sku;
                    break;
                case 2: // Current Stock
                    aValue = a.currentStock;
                    bValue = b.currentStock;
                    break;
                case 6: // Coverage Days (number)
                    aValue = a.coverageDays;
                    bValue = b.coverageDays;
                    break;
                case 8: // Risk Rating
                    // Map risk ratings to a numerical value for sorting
                    const riskOrder = { 'Low': 1, 'Medium': 2, 'High': 3 };
                    aValue = riskOrder[a.riskRating];
                    bValue = riskOrder[b.riskRating];
                    break;
                default:
                    return 0; // Should not happen with valid column indexes
            }

            if (typeof aValue === 'string') {
                return newDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            } else {
                return newDirection === 'asc' ? aValue - bValue : bValue - aValue;
            }
        });
        setSkuData(sortedData);
    };

    const processCsvForPrediction = () => {
        const fileInput = document.getElementById('csv-input');
        const file = fileInput.files[0];
        if (!file) {
            alert('Please select a CSV file.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            const lines = text.split('\n').filter(line => line.trim() !== ''); // Filter out empty lines
            if (lines.length < 4) { // Header + 3 data points for 3-month average
                alert('CSV should contain at least 3 months of sales data (e.g., "Month,Sales" header + 3 rows).');
                setPredictedSales('--');
                return;
            }

            try {
                // Skip header line
                const salesData = lines.slice(1).map(line => {
                    const parts = line.split(',');
                    // Assuming format: Month,Sales
                    if (parts.length < 2) throw new Error('Invalid CSV format: Each row must have at least "Month,Sales"');
                    const sales = parseFloat(parts[1].trim());
                    if (isNaN(sales)) throw new Error('Invalid sales data in CSV. Must be a number.');
                    return sales;
                });

                if (salesData.length < 3) {
                    alert('Please provide at least 3 months of valid sales data for prediction.');
                    setPredictedSales('--');
                    return;
                }

                // Simple 3-month moving average prediction
                const lastThreeMonths = salesData.slice(-3);
                const sum = lastThreeMonths.reduce((acc, curr) => acc + curr, 0);
                const average = sum / lastThreeMonths.length;
                setPredictedSales(average.toFixed(0)); // Round to nearest whole unit
            } catch (error) {
                alert(`Error processing CSV: ${error.message}. Please ensure the format is "Month,Sales"`);
                console.error("CSV processing error:", error);
                setPredictedSales('--');
            }
        };
        reader.readAsText(file);
    };

    const filteredSkuData = skuData.filter(sku =>
        sku.sku.toLowerCase().includes(searchTerm) ||
        sku.productName.toLowerCase().includes(searchTerm)
    );

    return (
        <div className="p-4 text-gray-800 bg-gray-100 min-h-screen"> {/* Added min-h-screen and light gray background */}
            <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-xl p-6 md:p-8 lg:p-10">

                {/* Header Section */}
                <header className="mb-8 border-b pb-4 border-gray-200">
                    <h1 className="text-3xl md:text-4xl font-bold text-blue-800 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 mr-3 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM8.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L10 10.586 8.707 9.293z" clipRule="evenodd" />
                        </svg>
                        Walmart Inventory Forecast & Insights
                    </h1>
                    <p className="text-gray-500 mt-2 text-sm md:text-base">Empowering supply chain managers with predictive analytics for optimal inventory management.</p>
                </header>

                {/* Key Performance Indicators (KPIs) Section */}
                <section className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-blue-50 p-6 rounded-lg shadow-md border border-blue-200 flex flex-col justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-blue-700 mb-2">Forecast Accuracy (MAPE)
                                <span className="has-tooltip relative">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block text-gray-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="tooltip">Mean Absolute Percentage Error: Measures accuracy of forecast. Lower is better.</span>
                                </span>
                            </h3>
                            <p className="text-4xl font-bold text-blue-900">{kpis.mape}</p>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">Target: &lt;10%</p>
                    </div>
                    <div className="bg-green-50 p-6 rounded-lg shadow-md border border-green-200 flex flex-col justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-green-700 mb-2">Total Forecasted Demand
                                <span className="has-tooltip relative">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block text-gray-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="tooltip">Total units expected to be sold/needed in the next forecast period.</span>
                                </span>
                            </h3>
                            <p className="text-4xl font-bold text-green-900">{kpis.totalDemand}</p>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">Next 30 days outlook.</p>
                    </div>
                    <div className="bg-red-50 p-6 rounded-lg shadow-md border border-red-200 flex flex-col justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-red-700 mb-2">Stock-Out Risk %
                                <span className="has-tooltip relative">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block text-gray-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="tooltip">Probability of running out of stock for a given SKU.</span>
                                </span>
                            </h3>
                            <p className="text-4xl font-bold text-red-900">{kpis.stockOutRisk}</p>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">Critical threshold: &gt;5%</p>
                    </div>
                    <div className="bg-purple-50 p-6 rounded-lg shadow-md border border-purple-200 flex flex-col justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-purple-700 mb-2">Projected Inventory Value
                                <span className="has-tooltip relative">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block text-gray-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="tooltip">Estimated monetary value of inventory based on current stock and future demand.</span>
                                </span>
                            </h3>
                            <p className="text-4xl font-bold text-purple-900">{kpis.inventoryValue}</p>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">Target utilization: 85%</p>
                    </div>
                    <div className="col-span-full flex justify-between items-center text-sm text-gray-500 mt-4">
                        <p>Last Data Refresh: <span id="last-refresh">{kpis.lastRefresh}</span></p>
                        <p>Overall Forecast Confidence: <span id="forecast-confidence" className="font-semibold text-blue-600">{kpis.forecastConfidence}</span></p>
                    </div>
                </section>

                {/* Interactive Drill-Down Filters Section */}
                <section className="mb-8 bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">Interactive Filters</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <label htmlFor="filter-region" className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                            <select id="filter-region" value={filters.region} onChange={handleFilterChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm">
                                <option value="all">All Regions</option>
                                <option value="north-east">North East</option>
                                <option value="south-east">South East</option>
                                <option value="mid-west">Mid West</option>
                                <option value="west">West</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="filter-store" className="block text-sm font-medium text-gray-700 mb-1">Store</label>
                            <select id="filter-store" value={filters.store} onChange={handleFilterChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm">
                                <option value="all">All Stores</option>
                                <option value="store-101">Store #101 (NYC)</option>
                                <option value="store-205">Store #205 (LA)</option>
                                <option value="store-310">Store #310 (Chicago)</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="filter-fc" className="block text-sm font-medium text-gray-700 mb-1">Fulfillment Center</label>
                            <select id="filter-fc" value={filters.fc} onChange={handleFilterChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm">
                                <option value="all">All FCs</option>
                                <option value="fc-east">FC East</option>
                                <option value="fc-west">FC West</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="filter-sku" className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                            <select id="filter-sku" value={filters.sku} onChange={handleFilterChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm">
                                <option value="all">All SKUs</option>
                                <option value="sku-12345">SKU-12345 (Organic Apples)</option>
                                <option value="sku-67890">SKU-67890 (HDTV 55-inch)</option>
                                <option value="sku-11223">SKU-11223 (Paper Towels)</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <button onClick={applyFilters} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out">
                            Apply Filters
                        </button>
                    </div>
                    <div className="mt-4 text-sm text-gray-600">
                        <p>Filtered Forecast Accuracy: <span id="filtered-mape" className="font-semibold text-blue-600">{kpis.filteredMape}</span></p>
                        <p>Filtered Stock-Out Risk: <span id="filtered-stock-out" className="font-semibold text-red-600">{kpis.filteredStockOut}</span></p>
                    </div>
                </section>

                {/* NEW: Key Alerts & Action Items Section */}
                <section className="mb-8 bg-orange-50 p-6 rounded-lg shadow-md border border-orange-200">
                    <h2 className="text-2xl font-bold text-orange-700 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-3 text-orange-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.342a1.5 1.5 0 00-2.122 0L2.25 6.257A1.5 1.5 0 002.25 8.38v5.757a1.5 1.5 0 001.5 1.5h8.586a1.5 1.5 0 001.06-.44l4.5-4.5a1.5 1.5 0 000-2.122L10.38 3.342a1.5 1.5 0 00-2.122 0zM7.25 7.75a.75.75 0 01.75-.75h2.5a.75.75 0 010 1.5h-2.5a.75.75 0 01-.75-.75zM7.25 10.75a.75.75 0 01.75-.75h2.5a.75.75 0 010 1.5h-2.5a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                        </svg>
                        Key Alerts & Action Items
                    </h2>
                    {keyAlerts.length > 0 ? (
                        <div className="space-y-4">
                            {keyAlerts.map((alert, index) => (
                                <div key={index} className={`p-3 rounded-md shadow-sm ${alert.type === 'High' ? 'bg-red-100 border-l-4 border-red-500 text-red-800' : alert.type === 'Medium' ? 'bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800' : 'bg-blue-100 border-l-4 border-blue-500 text-blue-800'}`}>
                                    <p className="font-semibold text-sm mb-1">{alert.message}</p>
                                    <p className="text-xs text-gray-700">Action Required: <span className="font-medium">{alert.action}</span></p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600 text-sm">No critical alerts or action items at this moment. All systems normal.</p>
                    )}
                    <p className="text-sm text-gray-500 mt-4">
                        <span className="font-semibold">Note:</span> This section highlights immediate concerns and recommended interventions based on forecast analysis and real-time data.
                    </p>
                </section>


                {/* Main Content Area: Charts & Recommendations (2-column layout) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Charts */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Historical Trends Overview */}
                        <section className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-700 mb-4">Historical Trends Overview</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-600 mb-2">Units Shipped & Sales</h3>
                                    <div className="h-64"> {/* Fixed height for consistent layout */}
                                        <canvas id="historicalTrendsChart"></canvas>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-600 mb-2">Returns & Stock on Hand</h3>
                                    <div className="h-64"> {/* Fixed height for consistent layout */}
                                        <canvas id="returnsStockChart"></canvas>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 mt-4">
                                <span className="font-semibold">Insights:</span> Observe seasonal patterns, promotional impacts, and identify significant deviations in sales, units shipped, and inventory levels over time. These trends are crucial for model training.
                            </p>
                        </section>

                        {/* Demand Forecast Section */}
                        <section className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-700 mb-4">Demand Forecast</h2>
                            <h3 className="text-lg font-semibold text-gray-600 mb-2">Actual vs. Forecast (30/60/90-Day)
                                <span className="has-tooltip relative">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block text-gray-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="tooltip">Forecasts for 30, 60, and 90 days with confidence bands.</span>
                                </span>
                            </h3>
                            <div className="h-80"> {/* Fixed height for consistent layout */}
                                <canvas id="demandForecastChart"></canvas>
                            </div>
                            <div className="mt-4 text-sm text-gray-600">
                                <p className="mb-2">
                                    <span className="font-semibold">Models Used:</span> ARIMA (AutoRegressive Integrated Moving Average) and Prophet for time-series forecasting. For complex patterns, Gradient Boosting Machines (GBM) and Neural Networks (e.g., LSTMs) are employed.
                                    <span className="has-tooltip relative">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block text-gray-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="tooltip">ARIMA: Statistical model for time series data. ML: Machine Learning models.</span>
                                    </span>
                                </p>
                                <p className="mb-2">
                                    <span className="font-semibold">Evaluation Metrics:</span> MAPE (Mean Absolute Percentage Error) and RMSE (Root Mean Squared Error) are primary metrics.
                                    <span className="has-tooltip relative">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block text-gray-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="tooltip">RMSE: Measures the magnitude of error. Lower is better.</span>
                                    </span>
                                </p>
                                <p>
                                    <span className="font-semibold">Selection Logic:</span> Models are selected based on historical performance, data characteristics (seasonality, trend, noise), and business context. Ensemble methods combine multiple models for robust predictions.
                                </p>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Recommendations & Anomaly Detection */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Replenishment & Stock Recommendations */}
                        <section className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-700 mb-4">Replenishment & Stock Recommendations</h2>
                            <div id="recommendations-list" className="space-y-4">
                                {/* Sample Recommendation 1: Low Coverage Alert */}
                                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-sm" role="alert">
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                        <p className="font-bold">Low Coverage Alert: SKU-12345</p>
                                    </div>
                                    <p className="text-sm mt-2">Current stock: 50. Forecast (30d): 300. Reorder point: 250.
                                        <span className="has-tooltip relative">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block text-gray-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="tooltip">Reorder Point: Inventory level that triggers a new order.</span>
                                        </span>
                                        <br />
                                        <span className="font-semibold">Suggested Order: 200 units. Urgent.</span>
                                    </p>
                                </div>
                                {/* Sample Recommendation 2: Overstock Risk */}
                                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md shadow-sm" role="alert">
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                        <p className="font-bold">Overstock Risk: SKU-67890</p>
                                    </div>
                                    <p className="text-sm mt-2">Current stock: 120. Forecast (30d): 40.
                                        <br />
                                        <span className="font-semibold">Recommendation: Consider promotions or transfers to other stores.</span>
                                    </p>
                                </div>
                                {/* Sample Recommendation 3: Healthy Stock */}
                                <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded-md shadow-sm" role="alert">
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <p className="font-bold">Healthy Stock: SKU-11223</p>
                                    </div>
                                    <p className="text-sm mt-2">Current stock: 500. Forecast (30d): 450.
                                        <br />
                                        <span className="font-semibold">Recommendation: Maintain current inventory levels.</span>
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Anomaly Detection & Adjustment Explanation */}
                        <section className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-700 mb-4">Anomaly Detection & Adjustment</h2>
                            <h3 className="text-lg font-semibold text-gray-600 mb-2">How Anomalies are Handled
                                <span className="has-tooltip relative">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block text-gray-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="tooltip">Explanation of how the forecasting model accounts for unusual events.</span>
                                </span>
                            </h3>
                            <p className="text-gray-700 mb-4 text-sm">
                                Our forecasting models are designed with advanced anomaly detection algorithms (e.g., Isolation Forest, Seasonal-Trend decomposition using Loess - STL). These algorithms identify unusual data points or patterns that deviate significantly from historical norms.
                            </p>
                            <p className="text-gray-700 mb-4 text-sm">
                                Once detected, these anomalies (like a sudden spike due to a flash sale, or a dip due to a severe weather event) are either:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 text-sm mb-4">
                                <li><span className="font-semibold">Filtered Out:</span> The model learns to treat these as one-time events, preventing them from skewing future forecasts.</li>
                                <li><span className="font-semibold">Accounted For:</span> If the anomaly is a recurring event (e.g., Black Friday sales), the model incorporates it as a known seasonal factor.</li>
                            </ul>
                            <p className="text-gray-700 text-sm">
                                This ensures our forecasts remain robust and are not overly influenced by transient events, providing a clearer picture of underlying demand. Anomalies are visualized on charts with annotations for transparency.
                            </p>
                            <div className="h-48"> {/* Reduced height slightly for better fit in column */}
                                <canvas id="anomalyChart"></canvas>
                            </div>
                        </section>

                        {/* Quick Forecast Section (CSV Input) */}
                        <section className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-700 mb-4">Quick Forecast (CSV Input)</h2>
                            <p className="text-gray-700 mb-4 text-sm">Upload a CSV file with historical sales data (e.g., "Month,Sales") for the last three months to predict the next month's sales.</p>
                            <div className="mb-4">
                                <label htmlFor="csv-input" className="block text-sm font-medium text-gray-700 mb-1">Upload Sales Data CSV</label>
                                <input type="file" id="csv-input" accept=".csv" className="mt-1 block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-md file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-blue-50 file:text-blue-700
                                    hover:file:bg-blue-100" />
                            </div>
                            <button onClick={processCsvForPrediction} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out">
                                Predict Next Month's Sales
                            </button>
                            <div className="mt-4 text-lg font-bold text-gray-800">
                                Predicted Next Month's Sales: <span id="predicted-sales" className="text-green-600">{predictedSales}</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">
                                <span className="font-semibold">Note:</span> This client-side demo uses a simple 3-month moving average. For production, integrate with a robust forecasting API.
                            </p>
                        </section>
                    </div>
                </div>

                {/* Operational Insights Section (Filling the previous gap) */}
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Inventory Performance Metrics */}
                    <section className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-700 mb-4">Inventory Performance Metrics</h2>
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Carrying Cost:</p>
                                <p className="text-2xl font-bold text-indigo-700">{inventoryPerformance.carryingCost}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">On-Time Shipping:</p>
                                <p className="text-2xl font-bold text-green-700">{inventoryPerformance.onTimeShipping}</p>
                            </div>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-600 mb-2">Inventory Turnover Rate
                            <span className="has-tooltip relative">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block text-gray-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="tooltip">Number of times inventory is sold or used in a period. Higher is generally better.</span>
                            </span>
                        </h3>
                        <div className="h-64">
                            <canvas id="inventoryTurnoverChart"></canvas>
                        </div>
                        <p className="text-sm text-gray-500 mt-4">
                            <span className="font-semibold">Analysis:</span> A healthy turnover rate indicates efficient inventory management. High carrying costs suggest potential for optimization. Focus on improving asset utilization.
                        </p>
                    </section>

                    {/* Supplier Performance Overview */}
                    <section className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-700 mb-4">Supplier Performance Overview</h2>
                        <div className="space-y-4">
                            {supplierPerformance.map((supplier, index) => (
                                <div key={index} className="bg-gray-50 p-4 rounded-md border border-gray-100 shadow-sm">
                                    <h3 className="text-lg font-semibold text-gray-700 mb-1">{supplier.name}</h3>
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <p>On-Time Delivery: <span className={`font-medium ${supplier.onTimeDelivery.includes('9') ? 'text-green-600' : 'text-yellow-600'}`}>{supplier.onTimeDelivery}</span></p>
                                        <p>Defect Rate: <span className={`font-medium ${parseFloat(supplier.defectRate) < 1 ? 'text-green-600' : 'text-red-600'}`}>{supplier.defectRate}</span></p>
                                        <p>Avg. Lead Time: <span className="font-medium text-blue-600">{supplier.leadTime}</span></p>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">Evaluate supplier against contractual KPIs. Timeliness directly impacts safety stock.</p>
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-gray-500 mt-4">
                            <span className="font-semibold">Insights:</span> Monitor supplier reliability to mitigate supply chain risks and ensure timely stock replenishment. Address performance deviations promptly to avoid disruption.
                        </p>
                    </section>
                </div>


                {/* SKU-Level Data Table Section */}
                <section className="mt-8 bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">SKU-Level Data Table</h2>
                    <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
                        <input
                            type="text"
                            id="sku-search"
                            value={searchTerm}
                            onChange={filterTable}
                            placeholder="Search by SKU or Product Name..."
                            className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-3 sm:mb-0"
                        />
                        <div className="flex space-x-2">
                            <button onClick={() => sortTable(0)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md shadow-sm hover:bg-gray-300 transition duration-150 ease-in-out">Sort by SKU</button>
                            <button onClick={() => sortTable(2)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md shadow-sm hover:bg-gray-300 transition duration-150 ease-in-out">Sort by Stock</button>
                            <button onClick={() => sortTable(8)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md shadow-sm hover:bg-gray-300 transition duration-150 ease-in-out">Sort by Risk</button>
                        </div>
                    </div>
                    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                        <table id="sku-table" className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stock</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Forecast (30d)</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Forecast (60d)</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Forecast (90d)</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coverage Days
                                        <span className="has-tooltip relative">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 inline-block text-gray-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="tooltip">Number of days current stock can cover forecasted demand.</span>
                                        </span>
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reorder Qty</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confidence Interval
                                        <span className="has-tooltip relative">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 inline-block text-gray-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="tooltip">Range within which the true demand is expected to fall (e.g., 95%).</span>
                                        </span>
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Rating</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredSkuData.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.sku}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.productName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.currentStock}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.forecast30d}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.forecast60d}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.forecast90d}</td>
                                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${item.coverageDays <= 10 ? 'text-red-600' : item.coverageDays <= 30 ? 'text-yellow-600' : 'text-green-600'}`}>
                                            {item.coverageDays} days
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-semibold">{item.reorderQty}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.confidenceInterval}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.riskRating === 'High' ? 'bg-red-100 text-red-800' : item.riskRating === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                                                {item.riskRating}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DynamicForecasting;