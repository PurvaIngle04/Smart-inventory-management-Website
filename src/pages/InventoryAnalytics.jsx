import React from 'react';

// Define a reusable Card component for displaying features
const FeatureCard = ({ title, description, icon }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:border-blue-400 transition-all duration-300">
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="text-xl font-semibold text-blue-700 ml-3">{title}</h3>
    </div>
    {/* Render description directly, as it can contain multiple elements and styled divs */}
    <div className="text-gray-700 text-sm">{description}</div>
  </div>
);

// Main App component
const InventoryAnalytics = () => {
  return (
    // Main container with full height and width, light background for modern look
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800 font-['Inter'] p-4 sm:p-8">
      {/* Header section */}
      <header className="text-center mb-10 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 mb-4 leading-tight">
          Powerful Data Analytics and Reporting
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
          Unlock powerful insights for optimized operations and supply chain excellence.
        </p>
      </header>

      {/* Main content area, organized in a responsive grid */}
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* Inventory Turnover Analytics Section */}
        <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-3xl font-bold text-teal-600 mb-6 flex items-center border-b-2 border-teal-100 pb-3">
            {/* Simple Inventory Icon (Box) */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10m0 0h16m-4-4h4m-4 4v-4m0-4h4m-4 0v-4m-4 0h4m-4 0v-4M4 7h16m-4-4h4m-4 4v-4" />
            </svg>
            Inventory Turnover Analytics
          </h2>
          <div className="space-y-6">
            <FeatureCard
              title="Inventory Turnover Ratio"
              description={
                <>
                  <p className="mb-3">Assess efficiency in converting inventory into sales with visual turnover ratios.</p>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded-md flex justify-between items-center shadow-sm border border-gray-100">
                      <div>
                        <p className="font-semibold text-gray-800">Clothing Retail (Seasonal Apparel)</p>
                        <p className="text-xs text-gray-500">COGS: $1.2M | Avg. Inv: $200K</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-blue-600 mr-2">6.0x</span>
                        <div className="w-20 bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '60%' }}></div> {/* Visual bar */}
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md flex justify-between items-center shadow-sm border border-gray-100">
                      <div>
                        <p className="font-semibold text-gray-800">Grocery Store (Fresh Produce)</p>
                        <p className="text-xs text-gray-500">COGS: $800K | Avg. Inv: $40K</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-blue-600 mr-2">20.0x</span>
                        <div className="w-20 bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '95%' }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md flex justify-between items-center shadow-sm border border-gray-100">
                      <div>
                        <p className="font-semibold text-gray-800">Healthcare Supplier (Medical Disposables)</p>
                        <p className="text-xs text-gray-500">COGS: $950K | Avg. Inv: $190K</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-blue-600 mr-2">5.0x</span>
                        <div className="w-20 bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '50%' }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md flex justify-between items-center shadow-sm border border-gray-100">
                      <div>
                        <p className="font-semibold text-gray-800">Personal Care (Cosmetics Line A)</p>
                        <p className="text-xs text-gray-500">COGS: $600K | Avg. Inv: $120K</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-blue-600 mr-2">5.0x</span>
                        <div className="w-20 bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '50%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-gray-500">
                    Higher ratios (indicated by longer blue bars) signify more efficient inventory management.
                  </p>
                </>
              }
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              }
            />
            <FeatureCard
              title="Dead Stock Identification"
              description={
                <>
                  <p className="mb-3">Quickly identify slow-moving or obsolete inventory with visual alerts.</p>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded-md flex items-center shadow-sm border border-gray-100">
                      <span className="w-3 h-3 rounded-full bg-red-500 mr-3 flex-shrink-0"></span>
                      <div>
                        <p className="font-semibold text-gray-800">CLT001: Winter Coat (2022 Collection)</p>
                        <p className="text-xs text-gray-500">Qty: 150 | Last Sale: 365+ Days Ago | Monthly Cost: $1,500</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md flex items-center shadow-sm border border-gray-100">
                      <span className="w-3 h-3 rounded-full bg-red-500 mr-3 flex-shrink-0"></span>
                      <div>
                        <p className="font-semibold text-gray-800">HCT005: Expired Medication Batch #A</p>
                        <p className="text-xs text-gray-500">Qty: 20 | Status: Expired | Disposal Cost: $500</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md flex items-center shadow-sm border border-gray-100">
                      <span className="w-3 h-3 rounded-full bg-yellow-500 mr-3 flex-shrink-0"></span>
                      <div>
                        <p className="font-semibold text-gray-800">GRC010: Limited Edition Cereal</p>
                        <p className="text-xs text-gray-500">Qty: 500 | Last Sale: 120+ Days Ago | Monthly Cost: $800</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md flex items-center shadow-sm border border-gray-100">
                      <span className="w-3 h-3 rounded-full bg-yellow-500 mr-3 flex-shrink-0"></span>
                      <div>
                        <p className="font-semibold text-gray-800">PSC015: Old Packaging Shampoo</p>
                        <p className="text-xs text-gray-500">Qty: 250 | Last Sale: 90+ Days Ago | Monthly Cost: $300</p>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-gray-500">
                    Red indicators for critical dead stock, yellow for slow-moving items requiring attention.
                  </p>
                </>
              }
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
              }
            />
            <FeatureCard
              title="Sales Forecasting Integration"
              description={
                <>
                  <p className="mb-3">Proactively adjust inventory based on forecasted demand to avoid stockouts or overstock.</p>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded-md flex justify-between items-center shadow-sm border border-gray-100">
                      <div>
                        <p className="font-semibold text-gray-800">Clothing: Spring Dresses</p>
                        <p className="text-xs text-gray-500">Current Stock: 150 | Forecast (Next Month): 300 (+100%)</p>
                      </div>
                      <span className="font-bold text-red-600">REORDER 150</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md flex justify-between items-center shadow-sm border border-gray-100">
                      <div>
                        <p className="font-semibold text-gray-800">Healthcare: Flu Vaccinations</p>
                        <p className="text-xs text-gray-500">Current Stock: 50 | Forecast (Next Month): 200 (+300%)</p>
                      </div>
                      <span className="font-bold text-red-600">URGENT REORDER 150</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md flex justify-between items-center shadow-sm border border-gray-100">
                      <div>
                        <p className="font-semibold text-gray-800">Groceries: Organic Milk</p>
                        <p className="text-xs text-gray-500">Current Stock: 80 | Forecast (Next Month): 120 (+50%)</p>
                      </div>
                      <span className="font-bold text-red-600">REORDER 40</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md flex justify-between items-center shadow-sm border border-gray-100">
                      <div>
                        <p className="font-semibold text-gray-800">Personal Care: Sunscreen SPF 50</p>
                        <p className="text-xs text-gray-500">Current Stock: 100 | Forecast (Next Month): 180 (+80%)</p>
                      </div>
                      <span className="font-bold text-red-600">REORDER 80</span>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-gray-500">
                    Proactive alerts and recommended actions based on demand predictions.
                  </p>
                </>
              }
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3m0 0l3 3m-3-3v8m0-9a9 9 0 110 18 9 9 0 010-18z" />
                </svg>
              }
            />
          </div>
        </section>

        {/* Supplier Performance Reporting Section */}
        <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-3xl font-bold text-teal-600 mb-6 flex items-center border-b-2 border-teal-100 pb-3">
            {/* Simple Supplier Icon (Handshake) */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            Supplier Performance Reporting
          </h2>
          <div className="space-y-6">
            <FeatureCard
              title="Quality Compliance Metrics"
              description={
                <>
                  <p className="mb-3">Visual insight into supplier quality and adherence to specifications.</p>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded-md flex justify-between items-center shadow-sm border border-gray-100">
                      <div>
                        <p className="font-semibold text-gray-800">Textile Innovations (Cotton Fabrics)</p>
                        <p className="text-xs text-gray-500">Defect Rate: 0.2%</p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">98% Excellent</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md flex justify-between items-center shadow-sm border border-gray-100">
                      <div>
                        <p className="font-semibold text-gray-800">Pharma Solutions (Active Ingredients)</p>
                        <p className="text-xs text-gray-500">Defect Rate: 0.05%</p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">99% Excellent</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md flex justify-between items-center shadow-sm border border-gray-100">
                      <div>
                        <p className="font-semibold text-gray-800">Agri-Fresh Co. (Organic Vegetables)</p>
                        <p className="text-xs text-gray-500">Defect Rate: 1.5%</p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">85% Good</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md flex justify-between items-center shadow-sm border border-gray-100">
                      <div>
                        <p className="font-semibold text-gray-800">Beauty Blends Ltd. (Skincare Raw Mat.)</p>
                        <p className="text-xs text-gray-500">Defect Rate: 0.3%</p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">97% Excellent</span>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-gray-500">
                    Color-coded scores provide quick insights into supplier quality and compliance.
                  </p>
                </>
              }
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
            <FeatureCard
              title="Cost Analysis & Savings Opportunities"
              description={
                <>
                  <p className="mb-3">Visualize potential cost savings from optimized supplier agreements.</p>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded-md flex justify-between items-center shadow-sm border border-gray-100">
                      <div>
                        <p className="font-semibold text-gray-800">Fabrics Global (Denim Fabric)</p>
                        <p className="text-xs text-gray-500">Current: $5.20/yd | Proposed: $4.95/yd</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-green-600 mr-2">$10K</span>
                        <div className="w-16 bg-gray-200 rounded-full h-2.5">
                          <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '80%' }}></div> {/* Represent savings visually */}
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md flex justify-between items-center shadow-sm border border-gray-100">
                      <div>
                        <p className="font-semibold text-gray-800">MediSupply Corp. (Surgical Gloves)</p>
                        <p className="text-xs text-gray-500">Current: $12.50/box | Proposed: $11.80/box</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-green-600 mr-2">$8.4K</span>
                        <div className="w-16 bg-gray-200 rounded-full h-2.5">
                          <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md flex justify-between items-center shadow-sm border border-gray-100">
                      <div>
                        <p className="font-semibold text-gray-800">Fresh Foods Dist. (Dairy Products)</p>
                        <p className="text-xs text-gray-500">Current: $2.5K/wk | Proposed: $2.35K/wk</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-green-600 mr-2">$7.8K</span>
                        <div className="w-16 bg-gray-200 rounded-full h-2.5">
                          <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md flex justify-between items-center shadow-sm border border-gray-100">
                      <div>
                        <p className="font-semibold text-gray-800">Essence Fragrances (Perfume Bottles)</p>
                        <p className="text-xs text-gray-500">Current: $0.85/unit | Proposed: $0.78/unit</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-green-600 mr-2">$5.6K</span>
                        <div className="w-16 bg-gray-200 rounded-full h-2.5">
                          <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '55%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-gray-500">
                    Direct cost reductions and efficiency gains highlighted with projected savings.
                  </p>
                </>
              }
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0H9m3 0h3m-6-10h2.42l1.623-1.623A2 2 0 0116.148 2H20a2 2 0 012 2v2.148a2 2 0 01-.586 1.414L19.42 10H22m-4 4h.01M18 10h.01" />
                </svg>
              }
            />
            <FeatureCard
              title="Risk Assessment & Mitigation"
              description={
                <>
                  <p className="mb-3">Assess and mitigate supplier risks with clear status indicators.</p>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded-md flex justify-between items-center shadow-sm border border-gray-100">
                      <div>
                        <p className="font-semibold text-gray-800">Silk Road Textiles (High-End Silks)</p>
                        <p className="text-xs text-gray-500">Risk: Geopolitical Instability | Strategy: Diversifying suppliers</p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">In Progress</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md flex justify-between items-center shadow-sm border border-gray-100">
                      <div>
                        <p className="font-semibold text-gray-800">Vital Meds Corp. (Critical Drugs)</p>
                        <p className="text-xs text-gray-500">Risk: Single Source Dependency | Strategy: Qualifying 2nd domestic supplier</p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">High Priority</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md flex justify-between items-center shadow-sm border border-gray-100">
                      <div>
                        <p className="font-semibold text-gray-800">Farm Fresh Inc. (Seasonal Produce)</p>
                        <p className="text-xs text-gray-500">Risk: Weather Dependent Supply | Strategy: Farms in different climate zones</p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">Mitigated</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md flex justify-between items-center shadow-sm border border-gray-100">
                      <div>
                        <p className="font-semibold text-gray-800">Eco-Bottle Mfg. (Recycled Plastic Bottles)</p>
                        <p className="text-xs text-gray-500">Risk: Raw Material Price Volatility | Strategy: Long-term contracts with caps</p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">Monitoring</span>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-gray-500">
                    Visual status indicators help prioritize risk mitigation efforts for business continuity.
                  </p>
                </>
              }
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              }
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default InventoryAnalytics;
