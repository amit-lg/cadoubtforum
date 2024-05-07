import React, { useState } from 'react';
// import './Popup.css'; // Import CSS file for styling

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={togglePopup}>Toggle Popup</button>
      {isOpen && (
        <div className="overlay">
          <div className="popup">
            <div className="popup-content">
              <h2>Popup Content</h2>
              <p>This is the content of the popup.</p>
              <button onClick={togglePopup}>Close Popup</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
