import Select from "react-select";
import { useEffect, useState } from "react";
import axios from "axios";
import { Vehicle } from "../types";

interface Route {
  id: string;
  attributes: { long_name: string };
}

interface Trip {
  id: string;
  attributes: { name: string };
}

interface Props {
  vehicles: Vehicle[];
  onFilter: (routes: string[], trips: string[]) => void;
}

export default function Filters({ vehicles, onFilter }: Props) {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [selectedRoutes, setSelectedRoutes] = useState<string[]>([]);
  const [selectedTrips, setSelectedTrips] = useState<string[]>([]);
  const [loadingRoutes, setLoadingRoutes] = useState(false);
  const [loadingTrips, setLoadingTrips] = useState(false);

  const routeIdsFromVehicles = Array.from(
    new Set(
      vehicles.map((v) => v.relationships.route?.data?.id).filter(Boolean)
    )
  );

  useEffect(() => {
    const fetchRoutes = async () => {
      setLoadingRoutes(true);
      try {
        const res = await axios.get(
          "https://api-v3.mbta.com/routes?page[limit]=100"
        );
        const allRoutes: Route[] = res.data.data;

        // Tambahkan rute dari kendaraan yang tidak ada di /routes
        const missingRoutes: Route[] = routeIdsFromVehicles
          .filter((id) => !allRoutes.find((r) => r.id === id))
          .map((id) => ({
            id,
            attributes: { long_name: `(Tidak Terdaftar) ${id}` },
          }));

        setRoutes([...allRoutes, ...missingRoutes]);
      } catch (err) {
        console.error("Gagal memuat data rute");
      } finally {
        setLoadingRoutes(false);
      }
    };

    fetchRoutes();
  }, [routeIdsFromVehicles]);

  useEffect(() => {
    const fetchTrips = async () => {
      if (selectedRoutes.length === 0) {
        setTrips([]);
        return;
      }

      setLoadingTrips(true);
      try {
        const validRouteIds = selectedRoutes.filter(
          (id) => !id.toLowerCase().includes("shuttle")
        ); 
        if (validRouteIds.length === 0) {
          setTrips([]);
          return;
        }

        const results = await Promise.all(
          validRouteIds.map((id) =>
            axios.get(
              `https://api-v3.mbta.com/trips?filter[route]=${id}&page[limit]=50`
            )
          )
        );

        const allTrips = results.flatMap((res) => res.data.data);
        setTrips(allTrips);
      } catch {
        console.error("Gagal memuat data trip");
      } finally {
        setLoadingTrips(false);
      }
    };

    fetchTrips();
  }, [selectedRoutes]);

  useEffect(() => {
    onFilter(selectedRoutes, selectedTrips);
  }, [selectedRoutes, selectedTrips, onFilter]);

  const routeOptions = routes.map((r) => ({
    label: r.attributes.long_name || r.id,
    value: r.id,
  }));

  const tripOptions = trips.map((t) => ({
    label: t.id,
    value: t.id,
  }));

  return (
    <div className="flex flex-wrap gap-6 mb-6">
      <div className="w-full md:w-72">
        <label className="block mb-1 text-sm text-neutral-medium font-medium">
          Filter by Route
        </label>
        <Select
          isMulti
          options={routeOptions}
          isLoading={loadingRoutes}
          onChange={(values) => setSelectedRoutes(values.map((v) => v.value))}
          placeholder="Pilih Rute..."
          className="text-sm"
        />
      </div>

      <div className="w-full md:w-72">
        <label className="block mb-1 text-sm text-neutral-medium font-medium">
          Filter by Trip
        </label>
        <Select
          isMulti
          options={tripOptions}
          isLoading={loadingTrips}
          onChange={(values) => setSelectedTrips(values.map((v) => v.value))}
          placeholder="Pilih Trip..."
          className="text-sm"
        />
        {!loadingTrips && tripOptions.length === 0 && (
          <p className="text-xs text-neutral-medium mt-1 italic">
            Tidak ada trip tersedia untuk rute yang dipilih.
          </p>
        )}
      </div>
    </div>
  );
}
