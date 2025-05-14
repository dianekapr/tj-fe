import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import VehicleCard from "./components/VehicleCard";
import Filters from "./components/Filters";
import VehicleDetail from "./components/VehicleDetail";
import { Vehicle } from "./types";

export default function App() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const fetchVehicles = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("https://api-v3.mbta.com/vehicles?page[limit]=1000");
      const data = res.data?.data || [];
      setVehicles(data);
      setFilteredVehicles(data);
    } catch (err: any) {
      console.error("Error fetching vehicles:", err);
      setError("Gagal memuat data kendaraan. Silakan coba beberapa saat lagi.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const handleFilter = useCallback((routes: string[], trips: string[]) => {
    const filtered = vehicles.filter((v) => {
      const routeId = v.relationships.route?.data?.id || "";
      const tripId = v.relationships.trip?.data?.id || "";
      return (
        (routes.length === 0 || routes.includes(routeId)) &&
        (trips.length === 0 || trips.includes(tripId))
      );
    });

    setFilteredVehicles(filtered);
    setPage(1);
  }, [vehicles]);

  const totalPages = Math.ceil(filteredVehicles.length / limit);
  const paginatedData = filteredVehicles.slice((page - 1) * limit, page * limit);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxShown = 5;
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, start + maxShown - 1);
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className="min-h-screen bg-neutral-light text-neutral-dark p-6">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-primary">Sistem Manajemen Armada</h1>
        <p className="text-neutral-medium mt-2 text-sm">
          Lacak kendaraan aktif berdasarkan rute dan trip secara real-time.
        </p>
      </header>

      <Filters vehicles={vehicles} onFilter={handleFilter} />

      {loading && (
        <div className="flex items-center gap-2 mt-4">
          <div className="w-5 h-5 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
          <p className="text-secondary font-medium">Memuat data kendaraan...</p>
        </div>
      )}

      {error && (
        <p className="text-accent font-semibold mt-4">{error}</p>
      )}

      {!loading && !error && (
        <>
          {paginatedData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {paginatedData.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onClick={() => setSelectedVehicle(vehicle)}
                />
              ))}
            </div>
          ) : (
            <p className="text-neutral-medium text-sm mt-6">
              Tidak ada kendaraan ditemukan untuk filter ini.
            </p>
          )}

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-10 bg-white p-4 rounded shadow border border-neutral-light gap-4">
            <span className="text-sm text-neutral-medium">
              Menampilkan {(page - 1) * limit + 1} - {(page - 1) * limit + paginatedData.length} dari {filteredVehicles.length} data
            </span>

            <div className="flex flex-wrap gap-2 items-center justify-center">
              <label className="text-sm text-neutral-medium">Data per halaman:</label>
              <select
                value={limit}
                onChange={(e) => {
                  setLimit(Number(e.target.value));
                  setPage(1);
                }}
                className="border border-secondary text-neutral-dark px-2 py-1 rounded focus:ring-1 focus:ring-secondary-light"
              >
                {[5, 10, 20].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-wrap items-center gap-2 justify-center">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className={`px-3 py-1 rounded ${page === 1
                  ? 'bg-neutral-light text-neutral-medium'
                  : 'bg-primary text-white hover:bg-primary-light'}`}
              >
                Prev
              </button>

              {getPageNumbers().map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-3 py-1 rounded border ${p === page
                    ? 'bg-primary text-white'
                    : 'bg-white text-primary hover:bg-primary-light'}`}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className={`px-3 py-1 rounded ${page === totalPages
                  ? 'bg-neutral-light text-neutral-medium'
                  : 'bg-primary text-white hover:bg-primary-light'}`}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}

      {selectedVehicle && (
        <VehicleDetail
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
        />
      )}
    </div>
  );
}
