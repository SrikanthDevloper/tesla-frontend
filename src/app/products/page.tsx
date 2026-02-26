"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchVehicles, setSearch, setCategory, setPage } from '../../store/slices/vehiclesSlice';
import { useDebounce } from '../../hooks/useDebounce';
import type { Vehicle } from '../../store/slices/vehiclesSlice';

/* ------------------ Main Component ------------------ */
export default function ProductsPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const {
    vehicles,
    loading,
    search,
    category,
    currentPage: page,
    totalPages,
  } = useAppSelector((state) => state.vehicles);

  const limit = 2;
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    dispatch(fetchVehicles({
      search: debouncedSearch,
      category: category === "All" ? undefined : category,
      page,
      limit,
    }));
  }, [debouncedSearch, category, page, dispatch]);

  return (
    <div className="bg-black min-h-screen text-white py-16">
      <div className="max-w-7xl mx-auto px-10">

        <h1 className="text-5xl font-bold mb-12 tracking-wide">
          Tesla Vehicles
        </h1>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <input
            type="text"
            placeholder="Search model..."
            value={search}
            onChange={(e) => {
              dispatch(setSearch(e.target.value));
              dispatch(setPage(1));
            }}
            className="bg-gray-900 border border-gray-700 rounded-md px-4 py-3 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <select
            value={category}
            onChange={(e) => {
              dispatch(setCategory(e.target.value));
              dispatch(setPage(1));
            }}
            className="bg-gray-900 border border-gray-700 rounded-md px-4 py-3 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="All">All Types</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="EV">EV</option>
          </select>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Loading State */}
          {loading ? (
            Array.from({ length: limit }).map((_, i) => (
              <SkeletonCard key={i} />
            ))
          ) : vehicles.length === 0 ? (

            /* No Results State */
            <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
              <div className="text-5xl mb-6">🚘</div>
              <h2 className="text-2xl font-semibold mb-3">
                No Cars Found
              </h2>
              <p className="text-gray-400 max-w-md">
                We couldn't find any vehicles matching your search.
                Try adjusting your filters or search term.
              </p>
            </div>

          ) : (

            /* Results */
            vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:scale-[1.02] transition duration-300"
              >
                <img
                  src={vehicle.modelImg}
                  alt={vehicle.model}
                  className="h-72 w-full object-cover"
                />

                <div className="p-8">
                  <h2 className="text-3xl font-semibold mb-2">
                    {vehicle.model}
                  </h2>

                  <p className="text-gray-400 mb-4">
                    {vehicle.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-gray-400 mb-6">
                    <p>Range: {vehicle.range} km</p>
                    <p>Top Speed: {vehicle.topSpeed} km/h</p>
                    <p className="col-span-2">
                      {vehicle.acceleration}
                    </p>
                  </div>

                  <div className="text-red-500 text-2xl font-bold mb-6">
                    ₹ {vehicle.basePrice.toLocaleString()}
                  </div>

                  <button
                    onClick={() => router.push(`/products/${vehicle.id}`)}
                    className="bg-white text-black px-6 py-2 rounded-lg"
                  >
                    Explore Model
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {!loading && vehicles.length > 0 && (
          <div className="flex justify-center mt-16 gap-4">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => dispatch(setPage(i + 1))}
                className={`px-5 py-2 rounded-md border transition ${
                  page === i + 1
                    ? "bg-red-600 border-red-600"
                    : "border-gray-600 hover:bg-gray-800"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------ Skeleton Loader ------------------ */
function SkeletonCard() {
  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden animate-pulse">
      <div className="h-72 bg-gray-800" />
      <div className="p-8 space-y-4">
        <div className="h-6 bg-gray-800 rounded w-1/2" />
        <div className="h-4 bg-gray-800 rounded w-full" />
        <div className="h-4 bg-gray-800 rounded w-3/4" />
        <div className="h-6 bg-gray-800 rounded w-1/3 mt-4" />
      </div>
    </div>
  );
}