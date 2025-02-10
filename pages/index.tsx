// pages/index.tsx
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic';
import { ProductCategory } from '../src/models/product';
import GuidedTour from '../src/components/GuidedTour';

// Dynamically import Chatbot (client-side only)
const Chatbot = dynamic(() => import('../src/components/Chatbot'), { ssr: false });

export default function Home() {
  // Basic Fields
  const [email, setEmail] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [products, setProducts] = useState<ProductCategory[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<{ [sku: string]: number }>({});
  const [quantities, setQuantities] = useState<{ [sku: string]: number }>({});
  const [quoteSummary, setQuoteSummary] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [scheduleDate, setScheduleDate] = useState('');
  const [tourActive, setTourActive] = useState(false);

  // Service Add‑Ons
  const [serviceAddons, setServiceAddons] = useState({
    networking: false,
    imaging: false,
    onsiteInstallation: false,
  });

  // Job Details
  const [jobComplexity, setJobComplexity] = useState('Basic');
  const [serviceType, setServiceType] = useState('Remote');
  const [environment, setEnvironment] = useState('Office');
  const [technicianTravel, setTechnicianTravel] = useState(false);
  const [technicianHours, setTechnicianHours] = useState(0);
  const [travelTime, setTravelTime] = useState(0);
  const [buildingAccessibility, setBuildingAccessibility] = useState('Easy');
  const [emergency, setEmergency] = useState(false);
  const [timeSlot, setTimeSlot] = useState('');
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);

  // CSV Data state
  const [csvData, setCsvData] = useState('');

  // Load products from API
  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data: ProductCategory[]) => {
        setProducts(data);
        const initialQuantities: { [sku: string]: number } = {};
        data.forEach((cat) =>
          cat.items.forEach((prod) => {
            initialQuantities[prod.sku] = 1;
          })
        );
        setQuantities(initialQuantities);
      })
      .catch(() => toast.error('Failed to load products.'));
  }, []);

  // Load available time slots
  useEffect(() => {
    fetch('/sample-calendar.json')
      .then((res) => res.json())
      .then((data) => setAvailableSlots(data.availableSlots))
      .catch(() => toast.error('Failed to load available time slots.'));
  }, []);

  // Clear Form Handler
  const clearForm = () => {
    setEmail('');
    setReferralCode('');
    setSelectedProducts({});
    setQuantities({});
    setQuoteSummary('');
    setTotalPrice(0);
    setScheduleDate('');
    setServiceAddons({ networking: false, imaging: false, onsiteInstallation: false });
    setJobComplexity('Basic');
    setServiceType('Remote');
    setEnvironment('Office');
    setTechnicianTravel(false);
    setTechnicianHours(0);
    setTravelTime(0);
    setBuildingAccessibility('Easy');
    setEmergency(false);
    setTimeSlot('');
    // Reload products to reset quantities
    fetch('/api/products')
      .then((res) => res.json())
      .then((data: ProductCategory[]) => {
        setProducts(data);
        const initialQuantities: { [sku: string]: number } = {};
        data.forEach((cat) =>
          cat.items.forEach((prod) => {
            initialQuantities[prod.sku] = 1;
          })
        );
        setQuantities(initialQuantities);
      })
      .catch(() => toast.error('Failed to load products.'));
    toast.info('Form cleared');
  };

  const handleProductChange = (sku: string, checked: boolean) => {
    setSelectedProducts((prev) => {
      const newSelection = { ...prev };
      if (checked) newSelection[sku] = quantities[sku] || 1;
      else delete newSelection[sku];
      return newSelection;
    });
  };

  const handleQuantityChange = (sku: string, value: number) => {
    setQuantities((prev) => ({ ...prev, [sku]: value }));
    setSelectedProducts((prev) => {
      if (prev[sku] !== undefined) return { ...prev, [sku]: value };
      return prev;
    });
  };

  const toggleAddon = (addon: keyof typeof serviceAddons) => {
    setServiceAddons((prev) => ({ ...prev, [addon]: !prev[addon] }));
  };

  const generateQuote = async () => {
    const jobDetails = {
      jobComplexity,
      serviceType,
      environment,
      technicianTravel,
      technicianHours,
      travelTime,
      buildingAccessibility,
      emergency,
      timeSlot,
      referralCode,
    };
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, selectedProducts, serviceAddons, jobDetails }),
      });
      const data = await res.json();
      setQuoteSummary(data.summary);
      setTotalPrice(data.totalPrice);
      toast.success('Quote generated successfully!');
    } catch (error: any) {
      toast.error('Failed to generate quote: ' + error.message);
    }
  };

  const printQuote = () => window.print();

  const sendEmail = async () => {
    const jobDetails = {
      jobComplexity,
      serviceType,
      environment,
      technicianTravel,
      technicianHours,
      travelTime,
      buildingAccessibility,
      emergency,
      timeSlot,
      referralCode,
    };
    try {
      const res = await fetch('/api/emailQuote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, selectedProducts, serviceAddons, jobDetails }),
      });
      const data = await res.json();
      toast.success(data.message);
    } catch (error: any) {
      toast.error('Failed to send email: ' + error.message);
    }
  };

  const scheduleJob = async () => {
    if (!scheduleDate) {
      toast.warn('Please select a schedule date.');
      return;
    }
    try {
      const res = await fetch('/api/scheduleJob', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, scheduleDate }),
      });
      const data = await res.json();
      toast.success(data.message);
    } catch (error: any) {
      toast.error('Failed to schedule job: ' + error.message);
    }
  };

  const fetchCsvData = async () => {
    try {
      const res = await fetch('/api/quotes-csv');
      if (!res.ok) throw new Error('Failed to fetch CSV data');
      const data = await res.text();
      setCsvData(data);
    } catch (error: any) {
      toast.error('Error fetching CSV: ' + error.message);
    }
  };

  return (
    <>
      <Head>
        <title>Job Pricing Calculator</title>
        <meta name="description" content="Calculate your IT job pricing with ease." />
      </Head>
      <main className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Email and Referral Section */}
        <div className="space-y-2">
          <label htmlFor="email" className="block font-medium text-lg">
            paste your email here for a quote
          </label>
          <input
            type="email"
            id="email"
            placeholder="paste your email here for a quote"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full md:w-3/4 p-6 border rounded text-xl"
            aria-label="Email Input"
          />
          <label htmlFor="referralCode" className="block font-medium text-lg">
            Referral Code (optional):
          </label>
          <input
            type="text"
            id="referralCode"
            placeholder="Enter referral code"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
            className="w-full md:w-3/4 p-4 border rounded text-lg"
            aria-label="Referral Code"
          />
          <div className="flex flex-wrap gap-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 rounded text-lg" aria-label="Load Quote">
              Load Quote
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-white px-6 py-3 rounded text-lg" onClick={clearForm}>
              Clear Form
            </button>
          </div>
        </div>
        {/* Product Selection */}
        <section>
          <h2 className="text-xl font-semibold">Select Products</h2>
          <div id="product-list" className="space-y-4">
            {products.map((category) => (
              <div key={category.category}>
                <h3 className="text-lg font-bold">{category.category}</h3>
                {category.items.map((product) => (
                  <div key={product.sku} className="flex items-center border p-2 rounded my-1">
                    <input
                      type="checkbox"
                      id={product.sku}
                      className="mr-2"
                      checked={selectedProducts[product.sku] !== undefined}
                      onChange={(e) => handleProductChange(product.sku, e.target.checked)}
                      aria-label={`Select ${product.name}`}
                    />
                    <label htmlFor={product.sku} className="flex-1">
                      {product.name} - ${product.price}
                    </label>
                    <input
                      type="number"
                      id={`qty-${product.sku}`}
                      min="0"
                      step="1"
                      value={quantities[product.sku] || 1}
                      className="w-16 p-1 border rounded ml-2"
                      aria-label={`Quantity for ${product.name}`}
                      onChange={(e) => handleQuantityChange(product.sku, Number(e.target.value))}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
        {/* Service Add‑Ons */}
        <section>
          <h2 className="text-xl font-semibold">Service Add‑Ons</h2>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="networking"
                className="mr-2"
                checked={serviceAddons.networking}
                onChange={() => toggleAddon('networking')}
                aria-label="Extra Networking Setup"
              />
              <label htmlFor="networking">Extra Networking Setup (+$150 flat fee)</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="imaging"
                className="mr-2"
                checked={serviceAddons.imaging}
                onChange={() => toggleAddon('imaging')}
                aria-label="Software Imaging"
              />
              <label htmlFor="imaging">Software Imaging for Laptops (+$100 per laptop)</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="onsiteInstallation"
                className="mr-2"
                checked={serviceAddons.onsiteInstallation}
                onChange={() => toggleAddon('onsiteInstallation')}
                aria-label="On‑site Installation"
              />
              <label htmlFor="onsiteInstallation">On‑site Installation (applies 1.2× multiplier)</label>
            </div>
          </div>
        </section>
        {/* Job Details */}
        <section>
          <h2 className="text-xl font-semibold">Job Details</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="jobComplexity" className="block font-medium">Job Complexity:</label>
              <select
                id="jobComplexity"
                value={jobComplexity}
                onChange={(e) => setJobComplexity(e.target.value)}
                className="p-2 border rounded"
                aria-label="Job Complexity"
              >
                <option value="Basic">Basic (1.0×)</option>
                <option value="Standard">Standard (1.2×)</option>
                <option value="Advanced">Advanced (1.5×)</option>
                <option value="Extreme">Extreme (2.0×)</option>
              </select>
            </div>
            <div>
              <span className="block font-medium">Service Type:</span>
              <div className="flex items-center space-x-4">
                <label>
                  <input
                    type="radio"
                    name="serviceType"
                    value="Remote"
                    checked={serviceType === 'Remote'}
                    onChange={() => setServiceType('Remote')}
                    aria-label="Remote Service"
                  /> Remote (0.8×)
                </label>
                <label>
                  <input
                    type="radio"
                    name="serviceType"
                    value="Onsite Standard"
                    checked={serviceType === 'Onsite Standard'}
                    onChange={() => setServiceType('Onsite Standard')}
                    aria-label="Onsite Standard Service"
                  /> Onsite Standard (1.0×)
                </label>
                <label>
                  <input
                    type="radio"
                    name="serviceType"
                    value="Onsite Urgent"
                    checked={serviceType === 'Onsite Urgent'}
                    onChange={() => setServiceType('Onsite Urgent')}
                    aria-label="Onsite Urgent Service"
                  /> Onsite Urgent (1.5×)
                </label>
              </div>
            </div>
            <div>
              <label htmlFor="environment" className="block font-medium">Environment:</label>
              <select
                id="environment"
                value={environment}
                onChange={(e) => setEnvironment(e.target.value)}
                className="p-2 border rounded"
                aria-label="Environment"
              >
                <option value="Office">Office (1.0×)</option>
                <option value="Warehouse">Warehouse (1.1×)</option>
                <option value="Retail">Retail (1.15×)</option>
                <option value="Home">Home (0.95×)</option>
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="technicianTravel"
                className="mr-2"
                checked={technicianTravel}
                onChange={() => setTechnicianTravel(!technicianTravel)}
                aria-label="Technician Travel Required (+$50)"
              />
              <label htmlFor="technicianTravel">Technician Travel Required (+$50 fixed fee)</label>
            </div>
            <div>
              <label htmlFor="technicianHours" className="block font-medium">
                Technician Hours (estimated, optional):
              </label>
              <input
                type="number"
                id="technicianHours"
                value={technicianHours}
                onChange={(e) => setTechnicianHours(Number(e.target.value))}
                className="p-2 border rounded w-full"
                aria-label="Technician Hours"
              />
            </div>
            <div>
              <label htmlFor="travelTime" className="block font-medium">Travel Time (minutes):</label>
              <input
                type="number"
                id="travelTime"
                value={travelTime}
                onChange={(e) => setTravelTime(Number(e.target.value))}
                className="p-2 border rounded w-full"
                aria-label="Travel Time"
              />
            </div>
            <div>
              <label htmlFor="buildingAccessibility" className="block font-medium">Building Accessibility:</label>
              <select
                id="buildingAccessibility"
                value={buildingAccessibility}
                onChange={(e) => setBuildingAccessibility(e.target.value)}
                className="p-2 border rounded"
                aria-label="Building Accessibility"
              >
                <option value="Easy">Easy</option>
                <option value="Moderate">Moderate</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="emergency"
                className="mr-2"
                checked={emergency}
                onChange={() => setEmergency(!emergency)}
                aria-label="Emergency Job (adds surcharge)"
              />
              <label htmlFor="emergency">Emergency Job (adds 50% surcharge)</label>
            </div>
            <div>
              <label htmlFor="timeSlot" className="block font-medium">Available Time Slot:</label>
              <select
                id="timeSlot"
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="p-2 border rounded"
                aria-label="Available Time Slot"
              >
                <option value="">Select a time slot</option>
                {availableSlots.map((slot) => (
                  <option key={slot} value={slot}>{new Date(slot).toLocaleString()}</option>
                ))}
              </select>
            </div>
          </div>
        </section>
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <button className="bg-green-500 hover:bg-green-700 text-white px-6 py-3 rounded text-lg" onClick={generateQuote}>
            Generate Quote
          </button>
          <button className="bg-gray-500 hover:bg-gray-700 text-white px-6 py-3 rounded text-lg" onClick={printQuote}>
            Print as PDF
          </button>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <label htmlFor="scheduleDate" className="font-medium">Schedule Job Date:</label>
          <input
            type="date"
            id="scheduleDate"
            value={scheduleDate}
            onChange={(e) => setScheduleDate(e.target.value)}
            className="p-2 border rounded"
            aria-label="Schedule Job Date"
          />
          <button className="bg-purple-500 hover:bg-purple-700 text-white px-6 py-3 rounded text-lg" onClick={scheduleJob}>
            Schedule Job
          </button>
        </div>
        {/* Quote Summary */}
        <section>
          <h2 className="text-xl font-semibold">Quote Summary</h2>
          <pre id="quote-summary" className="bg-gray-100 p-4 rounded whitespace-pre-wrap">
            {quoteSummary}
          </pre>
          <p id="total-price" className="text-2xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
          <button className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-3 rounded text-lg" onClick={sendEmail}>
            Email Quote
          </button>
        </section>
        {/* CSV Data Section */}
        <section>
          <button className="bg-yellow-500 hover:bg-yellow-700 text-white px-6 py-3 rounded text-lg" onClick={fetchCsvData}>
            View CSV Data
          </button>
          {csvData && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold">CSV Data</h2>
              <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">{csvData}</pre>
            </div>
          )}
        </section>
        <div className="flex justify-end">
          <button
            onClick={() => setTourActive(true)}
            className="bg-indigo-500 hover:bg-indigo-700 text-white px-6 py-3 rounded text-lg"
            aria-label="Start Guided Tour"
          >
            Start Guided Tour
          </button>
        </div>
      </main>
      <Chatbot botName="e-Troy" />
      {tourActive && <GuidedTour onClose={() => setTourActive(false)} />}
    </>
  );
}
