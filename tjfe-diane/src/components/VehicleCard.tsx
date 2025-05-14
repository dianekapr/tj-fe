import { Vehicle } from "../types";

const getStatusColor = (status: string) => {
  switch (status) {
    case "STOPPED_AT": return "text-status-success";
    case "INCOMING_AT": return "text-status-warning";
    case "IN_TRANSIT_TO": return "text-status-alert";
    default: return "text-neutral-medium";
  }
};

export default function VehicleCard({ vehicle, onClick }: {
  vehicle: Vehicle;
  onClick: () => void;
}) {
  return (
    <div onClick={onClick} className="bg-white p-5 rounded-lg border border-neutral-light shadow hover:shadow-md transition cursor-pointer">
      <h3 className="text-lg font-bold mb-1 text-neutral-dark">{vehicle.attributes.label}</h3>
      <p className={`font-semibold mb-1 ${getStatusColor(vehicle.attributes.current_status)}`}>
        Status: {vehicle.attributes.current_status}
      </p>
      <p className="text-sm text-neutral-medium">Lat: {vehicle.attributes.latitude}, Lng: {vehicle.attributes.longitude}</p>
      <p className="text-xs text-neutral-medium mt-2">Updated: {new Date(vehicle.attributes.updated_at).toLocaleString()}</p>
    </div>
  );
}
