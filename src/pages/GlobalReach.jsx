import React from 'react';

const GlobalReachSection = () => {
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white text-gray-800">
            <div className="max-w-7xl mx-auto">
                {/* Headline */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-6 leading-tight">
                    Global Reach with Multi-Location Support
                </h1>

                {/* Subheading */}
                <p className="text-lg sm:text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
                    Effortlessly manage your operations across multiple regions with unified dashboards, real-time reporting, and smart automation.
                </p>

                {/* Feature Blocks Grid */}
                <div className="grid grid-cols-1 gap-8 mb-12">
                    {/* Feature 1: Multi-Location Inventory Management */}
                    <div className="feature-card bg-white p-6 rounded-xl border border-gray-100 flex flex-col items-center text-center">
                        <div className="mb-4 p-3 bg-blue-100 rounded-full">
                            {/* Icon: Box with arrows */}
                            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10m-8-4l8 4m0-10l-8 4"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Multi-Location Inventory Management</h3>
                        <p className="text-gray-600 mb-4">Track and manage inventory levels across all your stores and warehouses from a single, integrated system. This includes everything from fast-moving consumer goods like groceries and electronics to seasonal apparel and home goods. Ensure optimal stock levels to meet demand and minimize waste across different regions and climates.</p>
                        <div className="w-full mt-auto pt-4 border-t border-gray-200">
                            <h4 className="font-semibold text-md mb-2">Real-Time Inventory Levels by Region</h4>
                            <p className="text-sm text-gray-500 mb-3">Visualize real-time stock for various product categories across different distribution centers to prevent stockouts and optimize replenishment.</p>
                            <svg className="w-full h-48" viewBox="0 0 300 150" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
                                {/* Background and Axis */}
                                <rect x="0" y="0" width="300" height="150" fill="#f0f9ff"/>
                                <line x1="30" y1="120" x2="270" y2="120" stroke="#94a3b8" strokeWidth="1"/>
                                <line x1="30" y1="50" x2="30" y2="120" stroke="#94a3b8" strokeWidth="1"/>

                                {/* Y-axis labels */}
                                <text x="25" y="55" textAnchor="end" fontSize="10" fill="#475569">300</text>
                                <text x="25" y="80" textAnchor="end" fontSize="10" fill="#475569">200</text>
                                <text x="25" y="105" textAnchor="end" fontSize="10" fill="#475569">100</text>
                                <text x="25" y="125" textAnchor="end" fontSize="10" fill="#475569">0</text>

                                {/* Bar Groups */}
                                {/* CA */}
                                <rect x="40" y="78" width="12" height="42" fill="#ef4444"/> {/* Healthcare */}
                                <rect x="55" y="69" width="12" height="51" fill="#f97316"/> {/* Personal Care */}
                                <rect x="70" y="50" width="12" height="70" fill="#22c55e"/> {/* Groceries */}
                                <text x="56" y="130" textAnchor="middle" fontSize="10" fill="#475569">CA</text>

                                {/* TX */}
                                <rect x="100" y="85" width="12" height="35" fill="#ef4444"/> {/* Healthcare */}
                                <rect x="115" y="78" width="12" height="42" fill="#f97316"/> {/* Personal Care */}
                                <rect x="130" y="62" width="12" height="58" fill="#22c55e"/> {/* Groceries */}
                                <text x="116" y="130" textAnchor="middle" fontSize="10" fill="#475569">TX</text>

                                {/* NY */}
                                <rect x="160" y="97" width="12" height="23" fill="#ef4444"/> {/* Healthcare */}
                                <rect x="175" y="91" width="12" height="29" fill="#f97316"/> {/* Personal Care */}
                                <rect x="190" y="73" width="12" height="47" fill="#22c55e"/> {/* Groceries */}
                                <text x="176" y="130" textAnchor="middle" fontSize="10" fill="#475569">NY</text>

                                {/* FL */}
                                <rect x="220" y="102" width="12" height="18" fill="#ef4444"/> {/* Healthcare */}
                                <rect x="235" y="97" width="12" height="23" fill="#f97316"/> {/* Personal Care */}
                                <rect x="250" y="85" width="12" height="35" fill="#22c55e"/> {/* Groceries */}
                                <text x="236" y="130" textAnchor="middle" fontSize="10" fill="#475569">FL</text>

                                {/* Legend */}
                                <rect x="200" y="10" width="10" height="10" fill="#ef4444"/>
                                <text x="215" y="19" fontSize="10" fill="#475569">Healthcare</text>

                                <rect x="200" y="25" width="10" height="10" fill="#f97316"/>
                                <text x="215" y="34" fontSize="10" fill="#475569">Personal Care</text>

                                <rect x="200" y="40" width="10" height="10" fill="#22c55e"/>
                                <text x="215" y="49" fontSize="10" fill="#475569">Groceries</text>
                            </svg>
                        </div>
                    </div>

                    {/* Feature 2: Centralized Dashboard */}
                    <div className="feature-card bg-white p-6 rounded-xl border border-gray-100 flex flex-col items-center text-center">
                        <div className="mb-4 p-3 bg-green-100 rounded-full">
                            {/* Icon: Dashboard/Monitor */}
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1l-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Centralized Dashboard</h3>
                        <p className="text-gray-600 mb-4">Gain a comprehensive overview of all your operations, sales, and performance metrics in one intuitive dashboard.</p>
                        <div className="w-full mt-auto pt-4 border-t border-gray-200">
                            <h4 className="font-semibold text-md mb-2">Global Sales Performance (Q1 2025)</h4>
                            <p className="text-sm text-gray-500 mb-3">See total sales and revenue from "Groceries" and "Electronics" across USA, Canada, and Mexico in a single view, allowing for quick strategic adjustments.</p>
                            <svg className="w-full h-48" viewBox="0 0 300 150" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
                                {/* Background and Axis */}
                                <rect x="0" y="0" width="300" height="150" fill="#ecfdf5"/>
                                <line x1="30" y1="120" x2="270" y2="120" stroke="#94a3b8" strokeWidth="1"/>
                                <line x1="30" y1="20" x2="30" y2="120" stroke="#94a3b8" strokeWidth="1"/>

                                {/* Y-axis labels */}
                                <text x="25" y="25" textAnchor="end" fontSize="10" fill="#475569">$10M</text>
                                <text x="25" y="47.5" textAnchor="end" fontSize="10" fill="#475569">$7.5M</text>
                                <text x="25" y="70" textAnchor="end" fontSize="10" fill="#475569">$5M</text>
                                <text x="25" y="92.5" textAnchor="end" fontSize="10" fill="#475569">$2.5M</text>
                                <text x="25" y="115" textAnchor="end" fontSize="10" fill="#475569">$0M</text>

                                {/* Data Points and Lines for Groceries */}
                                <polyline points="30,100 90,70 150,85 210,50 270,30" fill="none" stroke="#34d399" strokeWidth="2"/>
                                <circle cx="30" cy="100" r="3" fill="#34d399"/>
                                <circle cx="90" cy="70" r="3" fill="#34d399"/>
                                <circle cx="150" cy="85" r="3" fill="#34d399"/>
                                <circle cx="210" cy="50" r="3" fill="#34d399"/>
                                <circle cx="270" cy="30" r="3" fill="#34d399"/>
                                <text x="275" y="30" fontSize="10" fill="#10b981">Groceries</text>

                                {/* Data Points and Lines for Electronics */}
                                <polyline points="30,90 90,110 150,60 210,95 270,75" fill="none" stroke="#10b981" strokeWidth="2"/>
                                <circle cx="30" cy="90" r="3" fill="#10b981"/>
                                <circle cx="90" cy="110" r="3" fill="#10b981"/>
                                <circle cx="150" cy="60" r="3" fill="#10b981"/>
                                <circle cx="210" cy="95" r="3" fill="#10b981"/>
                                <circle cx="270" cy="75" r="3" fill="#10b981"/>
                                <text x="275" y="75" fontSize="10" fill="#10b981">Electronics</text>

                                {/* X-axis labels */}
                                <text x="30" y="130" textAnchor="middle" fontSize="10" fill="#475569">Jan</text>
                                <text x="90" y="130" textAnchor="middle" fontSize="10" fill="#475569">Feb</text>
                                <text x="150" y="130" textAnchor="middle" fontSize="10" fill="#475569">Mar</text>
                                <text x="210" y="130" textAnchor="middle" fontSize="10" fill="#475569">Apr</text>
                                <text x="270" y="130" textAnchor="middle" fontSize="10" fill="#475569">May</text>
                            </svg>
                        </div>
                    </div>

                    {/* Feature 3: Geo-Specific Customization */}
                    <div className="feature-card bg-white p-6 rounded-xl border border-gray-100 flex flex-col items-center text-center">
                        <div className="mb-4 p-3 bg-purple-100 rounded-full">
                            {/* Icon: Globe with settings */}
                            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 018.67 15.429m1.416-4.246a18.022 18.022 0 01-.105 4.246m-1.556 0L5 17.558A2.25 2.25 0 013.25 15.5V11.25m8.444-1.5l.282-.563a1.5 1.5 0 012.636 0l.282.563m-1.556 0H14.25a1.5 1.5 0 011.5 1.5V17.5a1.5 1.5 0 01-1.5 1.5h-2.5a1.5 1.5 0 01-1.5-1.5V11.25a1.5 1.5 0 011.5-1.5z"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Geo-Specific Customization</h3>
                        <p className="text-gray-600 mb-4">Tailor pricing, promotions, and product availability to specific regions, catering to local market demands.</p>
                        <div className="w-full mt-auto pt-4 border-t border-gray-200">
                            <h4 className="font-semibold text-md mb-2">"Organic Produce" Pricing</h4>
                            <p className="text-sm text-gray-500 mb-3">Compare average prices for "Organic Produce" in different markets like NYC, rural Iowa, and London to optimize local competitiveness.</p>
                            <svg className="w-full h-48" viewBox="0 0 300 150" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
                                {/* Background and Axis */}
                                <rect x="0" y="0" width="300" height="150" fill="#ede9fe"/>
                                <line x1="30" y1="120" x2="270" y2="120" stroke="#94a3b8" strokeWidth="1"/>
                                <line x1="30" y1="20" x2="30" y2="120" stroke="#94a3b8" strokeWidth="1"/>

                                {/* Y-axis labels */}
                                <text x="25" y="25" textAnchor="end" fontSize="10" fill="#475569">$6</text>
                                <text x="25" y="47.5" textAnchor="end" fontSize="10" fill="#475569">$5</text>
                                <text x="25" y="70" textAnchor="end" fontSize="10" fill="#475569">$4</text>
                                <text x="25" y="92.5" textAnchor="end" fontSize="10" fill="#475569">$3</text>
                                <text x="25" y="115" textAnchor="end" fontSize="10" fill="#475569">$2</text>

                                {/* Bars */}
                                <rect x="50" y="55" width="40" height="65" fill="#8b5cf6"/>
                                <text x="70" y="50" textAnchor="middle" fontSize="10" fill="#6d28d9">$4.99</text>
                                <text x="70" y="130" textAnchor="middle" fontSize="10" fill="#475569">NYC</text>

                                <rect x="110" y="80" width="40" height="40" fill="#8b5cf6"/>
                                <text x="130" y="75" textAnchor="middle" fontSize="10" fill="#6d28d9">$3.49</text>
                                <text x="130" y="130" textAnchor="middle" fontSize="10" fill="#475569">Iowa</text>

                                <rect x="170" y="30" width="40" height="70" fill="#8b5cf6"/>
                                <text x="190" y="45" textAnchor="middle" fontSize="10" fill="#6d28d9">£5.20</text>
                                <text x="190" y="130" textAnchor="middle" fontSize="10" fill="#475569">London</text>

                                <rect x="230" y="65" width="40" height="55" fill="#8b5cf6"/>
                                <text x="250" y="60" textAnchor="middle" fontSize="10" fill="#6d28d9">€4.50</text>
                                <text x="250" y="130" textAnchor="middle" fontSize="10" fill="#475569">Berlin</text>
                            </svg>
                        </div>
                    </div>

                    {/* Feature 4: Remote Configuration */}
                    <div className="feature-card bg-white p-6 rounded-xl border border-gray-100 flex flex-col items-center text-center">
                        <div className="mb-4 p-3 bg-yellow-100 rounded-full">
                            {/* Icon: Wrench/Gear with wireless */}
                            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.262 2.572-1.065z"></path>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Remote Configuration</h3>
                        <p className="text-gray-600 mb-4">Configure settings, update product information, and manage user roles from anywhere in the world.</p>
                        <div className="w-full mt-auto pt-4 border-t border-gray-200">
                            <h4 className="font-semibold text-md mb-2">POS Software Version Rollout Status</h4>
                            <p className="text-sm text-gray-500 mb-3">Monitor the status of the latest Point-of-Sale (POS) software updates pushed to all stores globally.</p>
                            <svg className="w-full h-48" viewBox="0 0 300 150" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
                                {/* Background */}
                                <rect x="0" y="0" width="300" height="150" fill="#fffbeb"/>

                                {/* Pie Chart Slices */}
                                {/* Center (cx, cy) = (100, 75), Radius = 60 */}
                                {/* Start point (100, 15) for 12 o'clock */}

                                {/* Updated (60%) - 216 degrees */}
                                <path d="M100,75 L100,15 A60,60 0 1,1 64.74,123.54 Z" fill="#10b981" />
                                {/* Pending (25%) - 90 degrees */}
                                <path d="M100,75 L64.74,123.54 A60,60 0 0,1 51.46,39.74 Z" fill="#fcd34d" />
                                {/* Failed (15%) - 54 degrees */}
                                <path d="M100,75 L51.46,39.74 A60,60 0 0,1 100,15 Z" fill="#ef4444" />

                                {/* Legend */}
                                <rect x="200" y="30" width="10" height="10" fill="#10b981"/>
                                <text x="215" y="39" fontSize="12" fill="#475569">Updated (60%)</text>

                                <rect x="200" y="55" width="10" height="10" fill="#fcd34d"/>
                                <text x="215" y="64" fontSize="12" fill="#475569">Pending (25%)</text>

                                <rect x="200" y="80" width="10" height="10" fill="#ef4444"/>
                                <text x="215" y="89" fontSize="12" fill="#475569">Failed (15%)</text>
                            </svg>
                        </div>
                    </div>

                    {/* Feature 5: Real-Time Data Syncing */}
                    <div className="feature-card bg-white p-6 rounded-xl border border-gray-100 flex flex-col items-center text-center">
                        <div className="mb-4 p-3 bg-red-100 rounded-full">
                            {/* Icon: Improved Sync Icon (Two arrows circling) */}
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356-2A8.001 8.001 0 004 12c0 2.138.679 4.159 1.817 5.654M20 20v-5h-.581m0 0a8.001 8.001 0 01-15.357-2c0-2.138-.679-4.159-1.818-5.654"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Real-Time Data Syncing</h3>
                        <p className="text-gray-600 mb-4">Ensure all your locations are always up-to-date with the latest inventory, sales, and customer data.</p>
                        <div className="w-full mt-auto pt-4 border-t border-gray-200">
                            <h4 className="font-semibold text-md mb-2">Online Order Fulfillment Flow</h4>
                            <p className="text-sm text-gray-500 mb-3">Track an online order from customer placement to final delivery, with real-time updates across systems.</p>
                            <div className="flex flex-col items-center space-y-2">
                                <div className="flow-node">Order Placed (Online)</div>
                                <div className="flow-arrow"></div>
                                <div className="flow-node">Inventory Updated (Warehouse A)</div>
                                <div className="flow-arrow"></div>
                                <div className="flow-node">Picked & Packed (Warehouse A)</div>
                                <div className="flow-arrow"></div>
                                <div className="flow-node">In Transit (Logistics Partner)</div>
                                <div className="flow-arrow"></div>
                                <div className="flow-node">Delivered (Customer)</div>
                            </div>
                        </div>
                    </div>

                    {/* Feature 6: Secure User Access Control */}
                    <div className="feature-card bg-white p-6 rounded-xl border border-gray-100 flex flex-col items-center text-center">
                        <div className="mb-4 p-3 bg-indigo-100 rounded-full">
                            {/* Icon: Lock */}
                            <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Secure User Access Control</h3>
                        <p className="text-gray-600 mb-4">Define granular permissions for each user, ensuring data security and operational integrity across all locations.</p>
                        <div className="w-full mt-auto pt-4 border-t border-gray-200">
                            <h4 className="font-semibold text-md mb-2">Recent User Activity Log</h4>
                            <p className="text-sm text-gray-500 mb-3">View a detailed log of administrative actions performed by users across different regions, ensuring accountability and compliance.</p>
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm text-left text-gray-700 activity-table">
                                    <thead className="text-xs uppercase">
                                        <tr>
                                            <th scope="col" className="px-2 py-1">User ID</th>
                                            <th scope="col" className="px-2 py-1">Action</th>
                                            <th scope="col" className="px-2 py-1">Location</th>
                                            <th scope="col" className="px-2 py-1">Timestamp</th>
                                            <th scope="col" className="px-2 py-1">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b">
                                            <td className="px-2 py-1">USR001</td>
                                            <td className="px-2 py-1">Updated Price (SKU123)</td>
                                            <td className="px-2 py-1">NYC Store</td>
                                            <td className="px-2 py-1">2025-07-03 10:30 AM</td>
                                            <td className="px-2 py-1 text-green-600">Success</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="px-2 py-1">USR005</td>
                                            <td className="px-2 py-1">Approved Purchase Order</td>
                                            <td className="px-2 py-1">California DC</td>
                                            <td className="px-2 py-1">2025-07-03 09:15 AM</td>
                                            <td className="px-2 py-1 text-green-600">Success</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="px-2 py-1">USR010</td>
                                            <td className="px-2 py-1">Attempted Inventory Adjust</td>
                                            <td className="px-2 py-1">Texas Store</td>
                                            <td className="px-2 py-1">2025-07-03 08:40 AM</td>
                                            <td className="px-2 py-1 text-red-600">Failed (Perm.)</td>
                                        </tr>
                                        <tr>
                                            <td className="px-2 py-1">USR001</td>
                                            <td className="px-2 py-1">Viewed Sales Report</td>
                                            <td className="px-2 py-1">London HQ</td>
                                            <td className="px-2 py-1">2025-07-02 05:00 PM</td>
                                            <td className="px-2 py-1 text-green-600">Success</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Concluding Statement Section */}
                <div className="mt-16 pt-8 border-t border-gray-200 text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 mb-4">Empower Your Global Enterprise</h2>
                    <p className="text-md text-gray-600 max-w-2xl mx-auto">
                        Our platform is designed to provide seamless, integrated management for your multi-location retail operations. From real-time inventory synchronization to geo-specific customizations and robust security, we empower you to maintain centralized control and visibility, ensuring operational efficiency and strategic growth across all your markets. Streamline your global business with confidence and precision.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default GlobalReachSection;