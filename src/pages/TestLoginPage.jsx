import React, { useState } from 'react';

const TermsAndConditions = ({ onAccept, onDecline }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
      <div className="bg-white p-8 w-3/4 h-3/4 rounded-lg overflow-y-auto transform scale-0 opacity-0 transition-transform transition-opacity duration-500">
        <h2 className="text-2xl mb-4">Terms and Conditions</h2>
        <div className="text-gray-700">
          {/* Your terms and conditions content goes here */}
          {/* Example content */}
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit....</p>
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded mr-4"
            onClick={onAccept}
          >
            Accept
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={onDecline}
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

const AuthComponent = () => {
  const [showTerms, setShowTerms] = useState(false);

  const toggleTerms = () => {
    setShowTerms(!showTerms);
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <div className={`w-1/2 transition-all duration-500 ${
        showTerms ? 'scale-0' : 'scale-100'
      }`}>
        {/* Your login/signup component */}
        {/* Example content */}
        <div className="bg-gray-200 p-8 h-full">
          <h2 className="text-2xl mb-4">Login/Signup Component</h2>
          {/* Login and signup forms go here */}
        </div>
      </div>
      <div className={`absolute inset-0 w-full transition-all duration-500 ${
        showTerms ? 'scale-100' : 'scale-0'
      }`}>
        {showTerms && (
          <TermsAndConditions
            onAccept={toggleTerms}
            onDecline={toggleTerms}
          />
        )}
      </div>
      {!showTerms && (
        <button
          className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={toggleTerms}
        >
          Terms & Conditions
        </button>
      )}
    </div>
  );
};

export default AuthComponent;
