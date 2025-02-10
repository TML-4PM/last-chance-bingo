// src/components/GuidedTour.tsx
import React from 'react';

interface GuidedTourProps {
  onClose: () => void;
}

const GuidedTour = ({ onClose }: GuidedTourProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg max-w-lg w-full relative">
        <h2 className="text-2xl font-bold mb-4 text-center">Welcome to the Guided Tour!</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>Use the dark mode toggle in the header to switch themes.</li>
          <li>Select products and adjust quantities.</li>
          <li>Add service add‑ons and complete job details.</li>
          <li>Generate a detailed quote with a full breakdown.</li>
          <li>Print or email your quote.</li>
          <li>Schedule your job with the date picker and available time slots.</li>
          <li>Use the Chatbot for assistance.</li>
          <li>Check the admin dashboard for stored quotes.</li>
        </ol>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded block mx-auto"
          aria-label="Close Guided Tour"
        >
          Got it!
        </button>
      </div>
    </div>
  );
};

export default GuidedTour;
