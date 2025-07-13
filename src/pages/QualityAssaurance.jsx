import React from 'react';
import {
  LucidePackageCheck,
  LucideTruck,
  LucideMicroscope,
  LucideCheckCircle,
  LucideClipboardCheck,
  LucideFileText,
  LucideDatabase,
  LucideCheckSquare,
  LucideAlertTriangle,
  LucideAlertCircle,
  LucideInfo,
  LucideBrain,
  LucideCamera,
  LucideCpu,
  LucideXCircle,
  LucideStar,
  LucideX,
  LucideLayoutDashboard,
  LucideFileSpreadsheet,
  FileText,
} from 'lucide-react';

const QualityAssurance = () => {
  // Data for End-to-End Product Control
  const supplierAudits = [
    { supplier: 'Global Materials Inc.', date: '2025-05-15', score: '95%' },
    { supplier: 'Component Solutions Ltd.', date: '2025-04-20', score: '92%' },
  ];

  const productJourney = [
    { date: '2025-06-01 09:00 AM', event: 'Raw Material Ingested (Batch #RM123)' },
    { date: '2025-06-05 02:30 PM', event: 'Production Line QA Check (Stage 1)' },
    { date: '2025-06-10 11:00 AM', event: 'Packaging & Labeling Inspection' },
    { date: '2025-06-12 04:00 PM', event: 'Final Warehouse Dispatch' },
  ];

  // Data for Compliance Checking
  const alerts = [
    {
      type: 'urgent',
      icon: LucideAlertTriangle,
      title: 'Urgent: Product Batch #P789 Failed FDA Labeling Check!',
      description: 'Detected missing allergen information. Immediate action required to prevent distribution.',
    },
    {
      type: 'warning',
      icon: LucideAlertCircle,
      title: 'Warning: ISO 9001 Deviation in Production Line 3',
      description: 'Minor process inconsistency detected. Review recommended to maintain certification standards.',
    },
    {
      type: 'info',
      icon: LucideInfo,
      title: 'Information: Weekly Compliance Report Generated',
      description: 'A new comprehensive compliance report is available on your dashboard for review.',
    },
  ];

  // Data for AI-Powered Defect Detection
  const defectCategories = [
    { name: 'Mislabeling', percentage: '25%', color: 'bg-red-600', width: 'w-3/4' },
    { name: 'Packaging Damage', percentage: '20%', color: 'bg-orange-600', width: 'w-2/3' },
    { name: 'Physical Defects', percentage: '15%', color: 'bg-purple-600', width: 'w-1/2' },
    { name: 'Incorrect Quantity', percentage: '10%', color: 'bg-teal-600', width: 'w-1/3' },
  ];

  // Data for Reporting & Dashboard
  const issuesLog = [
    {
      id: 'QA001',
      description: 'Misaligned label on Product X',
      detectedBy: 'Camera 3',
      status: 'In Progress',
      assignedTo: 'John Doe',
      dateOpened: '2025-06-29',
      dateResolved: '-',
    },
    {
      id: 'QA002',
      description: 'Damaged packaging - Item Y',
      detectedBy: 'Sensor 1',
      status: 'Closed',
      assignedTo: 'Jane Smith',
      dateOpened: '2025-06-28',
      dateResolved: '2025-06-29',
    },
    {
      id: 'QA003',
      description: 'Missing barcode - Batch Z',
      detectedBy: 'Scanner 2',
      status: 'Open',
      assignedTo: 'Alice Lee',
      dateOpened: '2025-06-30',
      dateResolved: '-',
    },
  ];

  const handleDownload = (format) => {
    alert(`Downloading ${format} report...`); // Placeholder for actual download logic
  };

  return (
    <>
      {/* Header Section */}
      <header className="bg-white shadow-md py-10 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight tracking-tight rounded-lg">
            Automated Quality Assurance
          </h1>
          <p className="mt-5 text-xl text-gray-700 font-medium">
            Ensuring excellence from raw materials to customer delivery.
          </p>
        </div>
      </header>

      {/* Main Content Sections */}
      <main className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Section: End-to-End Product Control */}
        <section className="bg-white rounded-xl shadow-lg p-10 mb-12">
          <div className="md:flex md:items-center md:space-x-10 mb-10">
            <div className="flex-shrink-0 mb-8 md:mb-0 md:w-1/4 flex justify-center items-center">
              <div className="bg-green-100 p-5 rounded-full inline-flex items-center justify-center shadow-inner">
                <LucidePackageCheck className="w-14 h-14 text-green-700" />
              </div>
            </div>
            <div className="md:flex-grow md:w-3/4">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">End-to-End Product Control</h2>
              <p className="text-lg text-gray-700 leading-relaxed">Comprehensive quality assurance spanning the entire product lifecycle, from raw material sourcing to final delivery, ensuring integrity at every touchpoint.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-8">
            <div className="bg-gray-50 p-8 rounded-lg shadow-inner border border-gray-200">
              <h3 className="text-2xl font-semibold text-gray-800 mb-5 border-b pb-4">Sourcing & Initial Checks</h3>
              <div className="mb-8">
                <p className="text-lg font-medium text-gray-700 mb-4">Raw Material Verification Flow:</p>
                <div className="flex flex-col items-center md:flex-row md:justify-around md:space-x-6">
                  <div className="flow-step">
                    <LucideTruck className="w-9 h-9 text-blue-600 mb-3" />
                    <span className="text-base font-medium text-gray-700">Material Arrival</span>
                  </div>
                  <i data-lucide="arrow-right" className="flow-arrow hidden md:block w-8 h-8" />
                  <i data-lucide="arrow-down" className="flow-arrow md:hidden w-8 h-8" />
                  <div className="flow-step">
                    <LucideMicroscope className="w-9 h-9 text-indigo-600 mb-3" />
                    <span className="text-base font-medium text-gray-700">Lab Analysis</span>
                  </div>
                  <i data-lucide="arrow-right" className="flow-arrow hidden md:block w-8 h-8" />
                  <i data-lucide="arrow-down" className="flow-arrow md:hidden w-8 h-8" />
                  <div className="flow-step">
                    <LucideCheckCircle className="w-9 h-9 text-green-600 mb-3" />
                    <span className="text-base font-medium text-gray-700">Quality Approval</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-lg font-medium text-gray-700 mb-4">Recent Supplier Audit Scores:</p>
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Supplier</th>
                        <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Last Audit Date</th>
                        <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Score</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {supplierAudits.map((audit, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900">{audit.supplier}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-base text-gray-700">{audit.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-base text-green-600 font-bold">{audit.score}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg shadow-inner border border-gray-200">
              <h3 className="text-2xl font-semibold text-gray-800 mb-5 border-b pb-4">Product Lifecycle Tracking</h3>
              <p className="text-lg font-medium text-gray-700 mb-4">Timestamped Checkpoints in Product Journey:</p>
              <div className="relative pl-8 border-l-2 border-gray-300 space-y-8">
                {productJourney.map((step, index) => (
                  <React.Fragment key={index}>
                    <div className="absolute w-4 h-4 bg-blue-600 rounded-full -left-2 top-0 border-2 border-white shadow-sm" style={{ top: `${index * 20}vh` }} />
                    <div className="ml-4">
                      <p className="text-base font-semibold text-gray-800">{step.date}</p>
                      <p className="text-base text-gray-700">{step.event}</p>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section: Compliance Checking */}
        <section className="bg-white rounded-xl shadow-lg p-10 mb-12">
          <div className="md:flex md:items-center md:space-x-10 mb-10">
            <div className="flex-shrink-0 mb-8 md:mb-0 md:w-1/4 flex justify-center items-center">
              <div className="bg-purple-100 p-5 rounded-full inline-flex items-center justify-center shadow-inner">
                <LucideClipboardCheck className="w-14 h-14 text-purple-700" />
              </div>
            </div>
            <div className="md:flex-grow md:w-3/4">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Compliance Checking</h2>
              <p className="text-lg text-gray-700 leading-relaxed">Ensuring all products adhere to stringent industry standards and regulatory requirements globally, minimizing risks and ensuring market readiness.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-8">
            <div className="bg-gray-50 p-8 rounded-lg shadow-inner border border-gray-200">
              <h3 className="text-2xl font-semibold text-gray-800 mb-5 border-b pb-4">Regulatory Adherence</h3>
              <div className="mb-8">
                <p className="text-lg font-medium text-gray-700 mb-4">Key Compliance Standards:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li><span className="font-semibold text-gray-800">ISO 9001</span> (Quality Management System Certification)</li>
                  <li><span className="font-semibold text-gray-800">FDA Regulations</span> (Food & Drug Administration Guidelines)</li>
                  <li><span className="font-semibold text-gray-800">CE Marking</span> (European Conformity Standards)</li>
                  <li><span className="font-semibold text-gray-800">Local Labeling Laws</span> & International Safety Standards</li>
                </ul>
              </div>
              <div>
                <p className="text-lg font-medium text-gray-700 mb-4">Automated Verification Process:</p>
                <div className="flex flex-col items-center md:flex-row md:justify-around md:space-x-6">
                  <div className="flow-step">
                    <LucideFileText className="w-9 h-9 text-blue-600 mb-3" />
                    <span className="text-base font-medium text-gray-700">Data Ingestion</span>
                  </div>
                  <i data-lucide="arrow-right" className="flow-arrow hidden md:block w-8 h-8" />
                  <i data-lucide="arrow-down" className="flow-arrow md:hidden w-8 h-8" />
                  <div className="flow-step">
                    <LucideDatabase className="w-9 h-9 text-indigo-600 mb-3" />
                    <span className="text-base font-medium text-gray-700">Rule Engine Check</span>
                  </div>
                  <i data-lucide="arrow-right" className="flow-arrow hidden md:block w-8 h-8" />
                  <i data-lucide="arrow-down" className="flow-arrow md:hidden w-8 h-8" />
                  <div className="flow-step">
                    <LucideCheckSquare className="w-9 h-9 text-green-600 mb-3" />
                    <span className="text-base font-medium text-gray-700">Compliance Report</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg shadow-inner border border-gray-200">
              <h3 className="text-2xl font-semibold text-gray-800 mb-5 border-b pb-4">Real-time Compliance Alerts</h3>
              <p className="text-lg font-medium text-gray-700 mb-4">Immediate Notifications for Non-Compliance:</p>
              <div className="space-y-5">
                {alerts.map((alert, index) => (
                  <div
                    key={index}
                    className={`bg-${alert.type}-100 border-l-4 border-${alert.type}-600 text-${alert.type}-900 p-5 rounded-md shadow-sm`}
                    role="alert"
                  >
                    <div className="flex items-start">
                      <alert.icon className="w-7 h-7 mr-4 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-lg">{alert.title}</p>
                        <p className="text-base">{alert.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section: AI-Powered Defect Detection */}
        <section className="bg-white rounded-xl shadow-lg p-10 mb-12">
          <div className="md:flex md:items-center md:space-x-10 mb-10">
            <div className="flex-shrink-0 mb-8 md:mb-0 md:w-1/4 flex justify-center items-center">
              <div className="bg-red-100 p-5 rounded-full inline-flex items-center justify-center shadow-inner">
                <LucideBrain className="w-14 h-14 text-red-700" />
              </div>
            </div>
            <div className="md:flex-grow md:w-3/4">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">AI-Powered Defect Detection</h2>
              <p className="text-lg text-gray-700 leading-relaxed">Leveraging advanced machine learning to proactively identify defects, predict maintenance needs, and significantly elevate customer satisfaction by ensuring flawless product delivery.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-8">
            <div className="bg-gray-50 p-8 rounded-lg shadow-inner border border-gray-200">
              <h3 className="text-2xl font-semibold text-gray-800 mb-5 border-b pb-4">Intelligent Defect Identification</h3>
              <p className="text-lg font-medium text-gray-700 mb-4">How AI Detects Faults:</p>
              <div className="flex flex-col items-center md:flex-row md:justify-around md:space-x-6">
                <div className="flow-step">
                  <LucideCamera className="w-9 h-9 text-blue-600 mb-3" />
                  <span className="text-base font-medium text-gray-700">Image Capture</span>
                </div>
                <i data-lucide="arrow-right" className="flow-arrow hidden md:block w-8 h-8" />
                <i data-lucide="arrow-down" className="flow-arrow md:hidden w-8 h-8" />
                <div className="flow-step">
                  <LucideCpu className="w-9 h-9 text-indigo-600 mb-3" />
                  <span className="text-base font-medium text-gray-700">ML Analysis</span>
                </div>
                <i data-lucide="arrow-right" className="flow-arrow hidden md:block w-8 h-8" />
                <i data-lucide="arrow-down" className="flow-arrow md:hidden w-8 h-8" />
                <div className="flow-step">
                  <LucideXCircle className="w-9 h-9 text-red-600 mb-3" />
                  <span className="text-base font-medium text-gray-700">Defect Flagging</span>
                </div>
              </div>
              <div className="mt-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                <p className="text-base text-gray-700 font-medium mb-3">Example: Surface Defect Detection</p>
                <div className="flex justify-center items-center h-32 bg-gray-200 rounded-md overflow-hidden relative border border-gray-300">
                  <img src="https://placehold.co/150x120/e0e0e0/888888?text=Product+Surface" alt="Placeholder Product" className="w-1/2 h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 border-3 border-red-600 rounded-full flex items-center justify-center animate-pulse">
                      <LucideX className="w-8 h-8 text-red-600 stroke-2" />
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 text-center mt-3">AI precisely identifies anomalies and imperfections on product surfaces, ensuring high quality output.</p>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg shadow-inner border border-gray-200">
              <h3 className="text-2xl font-semibold text-gray-800 mb-5 border-b pb-4">Proactive Operations & Customer Focus</h3>
              <div className="mb-8">
                <p className="text-lg font-medium text-gray-700 mb-4">Predictive Maintenance for Machinery:</p>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xl font-medium text-gray-700">Machine Health Score:</span>
                  <div className="relative w-28 h-28">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle className="text-gray-300" strokeWidth="12" stroke="currentColor" fill="transparent" r="45" cx="50" cy="50" />
                      <circle className="text-green-600 gauge-ring" strokeWidth="12" strokeDasharray="283" strokeDashoffset="calc(283 - (283 * 0.85))" strokeLinecap="round" stroke="currentColor" fill="transparent" r="45" cx="50" cy="50" />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-green-700">85%</span>
                  </div>
                </div>
                <p className="text-base text-gray-600 text-center">AI algorithms analyze operational data to predict potential equipment failures, enabling proactive maintenance and minimizing costly downtime.</p>
              </div>

              <div>
                <p className="text-lg font-medium text-gray-700 mb-4">Enhancing Customer Satisfaction:</p>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center mb-4">
                    <LucideStar className="w-7 h-7 text-yellow-500 fill-yellow-500 mr-3" />
                    <p className="text-xl font-bold text-gray-800">Average Product Rating: 4.8/5</p>
                  </div>
                  <p className="text-base text-gray-700 mb-3 leading-relaxed">"Since implementing AI-driven quality checks, we've observed a significant reduction in customer complaints regarding product defects, leading to higher satisfaction scores."</p>
                  <p className="text-sm text-gray-600 font-medium">- Operations Manager, Leading Retail Chain</p>
                </div>
                <p className="text-base text-gray-600 text-center mt-3">By drastically reducing defective deliveries, our solutions directly contribute to superior customer experiences and brand loyalty.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Reporting & Dashboard */}
        <section className="bg-white rounded-xl shadow-lg p-10 mb-12">
          <div className="md:flex md:items-center md:space-x-10 mb-10">
            <div className="flex-shrink-0 mb-8 md:mb-0 md:w-1/4 flex justify-center items-center">
              <div className="bg-yellow-100 p-5 rounded-full inline-flex items-center justify-center shadow-inner">
                <LucideLayoutDashboard className="w-14 h-14 text-yellow-700" />
              </div>
            </div>
            <div className="md:flex-grow md:w-3/4">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Reporting & Dashboard</h2>
              <p className="text-lg text-gray-700 leading-relaxed">Access real-time insights and comprehensive reporting for all quality assurance and compliance activities, facilitating informed decision-making and continuous improvement.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-8">
            <div className="bg-gray-50 p-8 rounded-lg shadow-inner border border-gray-200">
              <h3 className="text-2xl font-semibold text-gray-800 mb-5 border-b pb-4">Real-time Performance Metrics</h3>
              <div className="flex items-center justify-between mb-8">
                <span className="text-xl font-medium text-gray-700">Overall Pass Rate:</span>
                <div className="relative w-28 h-28">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle className="text-gray-300" strokeWidth="12" stroke="currentColor" fill="transparent" r="45" cx="50" cy="50" />
                    <circle className="text-green-600 gauge-ring" strokeWidth="12" strokeDasharray="283" strokeDashoffset="calc(283 - (283 * 0.982))" strokeLinecap="round" stroke="currentColor" fill="transparent" r="45" cx="50" cy="50" />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-green-700">98.2%</span>
                </div>
              </div>
              <div className="mb-8">
                <p className="text-lg font-medium text-gray-700 mb-4">Daily Pass Rate Trend</p>
                <div className="h-32 bg-gray-100 rounded-lg flex items-end overflow-hidden p-3 shadow-sm border border-gray-300">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                    <div key={i} className={`h-${Math.floor(Math.random() * 5 + 1)}/6 chart-line-segment mx-0.5`} />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-lg font-medium text-gray-700 mb-4">Top Defect Categories</p>
                {defectCategories.map((category, index) => (
                  <div key={index} className="flex items-center mb-4">
                    <span className="w-36 text-base text-gray-700 font-medium">{category.name}:</span>
                    <div className={`chart-bar-formal ${category.width} ${category.color}`} />
                    <span className="ml-4 text-base text-gray-800 font-semibold">{category.percentage}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg shadow-inner border border-gray-200">
              <h3 className="text-2xl font-semibold text-gray-800 mb-5 border-b pb-4">Reporting & Issue Management</h3>
              <div className="mb-8">
                <p className="text-lg font-medium text-gray-700 mb-4">Generate Comprehensive Reports:</p>
                <div className="flex flex-wrap gap-5">
                  <button
                    onClick={() => handleDownload('PDF Summary')}
                    className="flex items-center px-6 py-3 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800 transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 text-base font-semibold"
                  >
                    <LucideFileText className="w-5 h-5 mr-2" />
                    PDF Summary
                  </button>
                  <button
                    onClick={() => handleDownload('Excel Audit')}
                    className="flex items-center px-6 py-3 bg-green-700 text-white rounded-lg shadow-md hover:bg-green-800 transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 text-base font-semibold"
                  >
                    <LucideFileSpreadsheet className="w-5 h-5 mr-2" />
                    Excel Audit
                  </button>
                  <button
                    onClick={() => handleDownload('CSV Export')}
                    className="flex items-center px-6 py-3 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-900 transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-50 text-base font-semibold"
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    CSV Export
                  </button>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-lg font-medium text-gray-700 mb-4">Recent Report Downloads:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-6">
                  <li><span className="font-semibold text-gray-800">2025-06-30_Daily_QA.pdf</span> (Completed)</li>
                  <li><span className="font-semibold text-gray-800">2025-06-28_Compliance_Audit_Q2.xlsx</span> (Completed)</li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-3">Issue Resolution Overview</h4>
                <div className="flex justify-around items-center mb-6 bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                  <div className="text-center">
                    <p className="text-5xl font-extrabold text-red-700">20</p>
                    <p className="text-base text-gray-700">Open Issues</p>
                  </div>
                  <div className="text-center">
                    <p className="text-5xl font-extrabold text-yellow-700">5</p>
                    <p className="text-base text-gray-700">In Progress</p>
                  </div>
                  <div className="text-center">
                    <p className="text-5xl font-extrabold text-green-700">150</p>
                    <p className="text-base text-gray-700">Closed Issues</p>
                  </div>
                </div>
                <p className="text-lg text-gray-700 mb-5">Average Resolution Time: <span className="font-bold text-indigo-700">1.5 days</span></p>

                <h4 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-3">Detailed Issues Log</h4>
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                  <table className="min-w-full divide-y divide-gray-200 table-auto">
                    <thead className="bg-gray-100">
                      <tr>
                        <th scope="col" className="px-5 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Issue ID</th>
                        <th scope="col" className="px-5 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Description</th>
                        <th scope="col" className="px-5 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Detected By</th>
                        <th scope="col" className="px-5 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-5 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Assigned To</th>
                        <th scope="col" className="px-5 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Date Opened</th>
                        <th scope="col" className="px-5 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Date Resolved</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {issuesLog.map((issue, index) => (
                        <tr key={index}>
                          <td className="px-5 py-4 whitespace-nowrap text-base font-medium text-gray-900">{issue.id}</td>
                          <td className="px-5 py-4 whitespace-nowrap text-base text-gray-700">{issue.description}</td>
                          <td className="px-5 py-4 whitespace-nowrap text-base text-gray-700">{issue.detectedBy}</td>
                          <td className={`px-5 py-4 whitespace-nowrap text-base ${issue.status === 'In Progress' ? 'text-yellow-600' : issue.status === 'Closed' ? 'text-green-600' : 'text-red-600'}`}>{issue.status}</td>
                          <td className="px-5 py-4 whitespace-nowrap text-base text-gray-700">{issue.assignedTo}</td>
                          <td className="px-5 py-4 whitespace-nowrap text-base text-gray-700">{issue.dateOpened}</td>
                          <td className="px-5 py-4 whitespace-nowrap text-base text-gray-700">{issue.dateResolved}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-10 px-4 sm:px-6 lg:px-8 text-center rounded-t-xl">
        <div className="max-w-7xl mx-auto">
          <p className="text-base">© 2025 Quality Assurance Solutions. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default QualityAssurance;