import React from "react";

const VehicleCard = ({ vehicle, onClick }) => {
  return (
    <div className="vehicle-card bg-white shadow-md p-4 m-2 rounded-lg" onClick={onClick}>
      <h3>{vehicle.label}</h3>
      <p>Status: {vehicle.status}</p>
      <p>Lat: {vehicle.latitude}, Lon: {vehicle.longitude}</p>
      <p>Last Update: {vehicle.lastUpdate}</p>
    </div>
  );
};

export default VehicleCard;
