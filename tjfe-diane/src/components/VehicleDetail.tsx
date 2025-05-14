import { Vehicle } from "../types";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';

import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});


export default function VehicleDetail({ vehicle, onClose }: {
  vehicle: Vehicle;
  onClose: () => void;
}) {
  const { latitude, longitude } = vehicle.attributes;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-xl relative shadow-lg">
        <h2 className="text-xl font-bold text-primary mb-4">{vehicle.attributes.label}</h2>
        <ul className="text-sm text-neutral-medium space-y-1 mb-4">
          <li>Status: <span className="font-semibold">{vehicle.attributes.current_status}</span></li>
          <li>Lat: {latitude} | Lng: {longitude}</li>
          <li>Route: {vehicle.relationships.route.data.id}</li>
          <li>Trip: {vehicle.relationships.trip.data.id}</li>
          <li>Updated: {new Date(vehicle.attributes.updated_at).toLocaleString()}</li>
        </ul>

        <div className="h-60 rounded overflow-hidden mb-4">
          <MapContainer center={[latitude, longitude]} zoom={14} className="h-full w-full z-10">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[latitude, longitude]}>
              <Popup>{vehicle.attributes.label}</Popup>
            </Marker>
          </MapContainer>
        </div>

        <button
          onClick={onClose}
          className="bg-accent text-white px-4 py-2 rounded hover:bg-accent-light"
        >
          Close
        </button>
      </div>
    </div>
  );
}
