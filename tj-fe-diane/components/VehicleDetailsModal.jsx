import React from "react";

const VehicleDetailsModal = ({ vehicle, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{vehicle.label} Details</h3>
        <p>Status: {vehicle.status}</p>
        <p>Lat: {vehicle.latitude}, Lon: {vehicle.longitude}</p>
        <p>Last Update: {vehicle.lastUpdate}</p>
        <p>Route: {vehicle.route}</p>
        <p>Trip: {vehicle.trip}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default VehicleDetailsModal;
