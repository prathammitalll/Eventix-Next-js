import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface EventFiltersProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  totalEvents: number;
  statusOptions?: string[];
  selectedStatus?: string;
  setSelectedStatus?: (status: string) => void;
  locationOptions?: string[];
  selectedLocation?: string;
  setSelectedLocation?: (location: string) => void;
  clubOptions?: string[];
  selectedClub?: string;
  setSelectedClub?: (club: string) => void;
  onApply?: (filters: FilterOptions) => void;
  loading: boolean;
}

interface FilterOptions {
  category: string;
  sortBy: string;
  status?: string;
  location?: string;
  club?: string;
}

const EventFilters: React.FC<EventFiltersProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  totalEvents,
  statusOptions,
  selectedStatus,
  setSelectedStatus,
  locationOptions,
  selectedLocation,
  setSelectedLocation,
  clubOptions,
  selectedClub,
  setSelectedClub,
  onApply,
  loading,
}) => {
  // Local state for filter selections
  const [localCategory, setLocalCategory] = useState<string>(selectedCategory);
  const [localSortBy, setLocalSortBy] = useState<string>(sortBy);
  const [localStatus, setLocalStatus] = useState<string | undefined>(selectedStatus);
  const [localLocation, setLocalLocation] = useState<string | undefined>(selectedLocation);
  const [localClub, setLocalClub] = useState<string | undefined>(selectedClub);

  // Sync local state with parent when filters change externally
  useEffect(() => {
    setLocalCategory(selectedCategory);
    setLocalSortBy(sortBy);
    setLocalStatus(selectedStatus);
    setLocalLocation(selectedLocation);
    setLocalClub(selectedClub);
  }, [
    selectedCategory,
    sortBy,
    selectedStatus,
    selectedLocation,
    selectedClub,
  ]);

  const handleApply = () => {
    // Update parent state
    setSelectedCategory(localCategory);
    setSortBy(localSortBy);
    if (setSelectedStatus && localStatus) setSelectedStatus(localStatus);
    if (setSelectedLocation && localLocation) setSelectedLocation(localLocation);
    if (setSelectedClub && localClub) setSelectedClub(localClub);

    // Call onApply if provided
    if (onApply) {
      onApply({
        category: localCategory,
        sortBy: localSortBy,
        status: localStatus,
        location: localLocation,
        club: localClub,
      });
    }
  };

  return (
    <div className="sticky top-20 z-30 bg-black/70 backdrop-blur-lg rounded-xl shadow-lg px-6 py-6 mb-8 border border-white/10 mt-6">
      {/* Top Loader */}
      {loading && (
        <div className="absolute left-0 top-0 w-full h-1 z-50">
          <motion.div
            className="h-full bg-[#f2f862] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          />
        </div>
      )}
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 justify-between">
        {/* Sort Dropdown */}
        <div className="flex items-center gap-3">
          <span className="text-gray-400 text-sm whitespace-nowrap">
            Sort by:
          </span>
          <select
            value={localSortBy}
            onChange={(e) => setLocalSortBy(e.target.value)}
            className="bg-gradient-to-r from-[#232323] to-[#181818] border border-[#f2f862]/30 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#f2f862]/60 focus:border-[#f2f862]/80 cursor-pointer shadow-sm appearance-none"
            style={{ WebkitAppearance: "none", MozAppearance: "none" }}
          >
            <option value="date" className="bg-black text-white">
              Date
            </option>
            <option value="popularity" className="bg-black text-white">
              Popularity
            </option>
            <option value="alphabetical" className="bg-black text-white">
              A-Z
            </option>
          </select>
        </div>
        {/* Status Dropdown */}
        {statusOptions && setSelectedStatus && (
          <div className="flex items-center gap-3">
            <span className="text-gray-400 text-sm whitespace-nowrap">
              Status:
            </span>
            <select
              value={localStatus}
              onChange={(e) => setLocalStatus(e.target.value)}
              className="bg-gradient-to-r from-[#232323] to-[#181818] border border-[#f2f862]/30 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#f2f862]/60 focus:border-[#f2f862]/80 cursor-pointer shadow-sm appearance-none"
              style={{ WebkitAppearance: "none", MozAppearance: "none" }}
            >
              {statusOptions.map((status) => (
                <option
                  key={status}
                  value={status}
                  className="bg-black text-white"
                >
                  {status}
                </option>
              ))}
            </select>
          </div>
        )}
        {/* Location Dropdown */}
        {locationOptions && setSelectedLocation && (
          <div className="flex items-center gap-3">
            <span className="text-gray-400 text-sm whitespace-nowrap">
              Location:
            </span>
            <select
              value={localLocation}
              onChange={(e) => setLocalLocation(e.target.value)}
              className="bg-gradient-to-r from-[#232323] to-[#181818] border border-[#f2f862]/30 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#f2f862]/60 focus:border-[#f2f862]/80 cursor-pointer shadow-sm appearance-none"
              style={{ WebkitAppearance: "none", MozAppearance: "none" }}
            >
              {locationOptions.map((loc) => (
                <option key={loc} value={loc} className="bg-black text-white">
                  {loc}
                </option>
              ))}
            </select>
          </div>
        )}
        {/* Club/Organizer Dropdown */}
        {clubOptions && setSelectedClub && (
          <div className="flex items-center gap-3">
            <span className="text-gray-400 text-sm whitespace-nowrap">
              Club:
            </span>
            <select
              value={localClub}
              onChange={(e) => setLocalClub(e.target.value)}
              className="bg-gradient-to-r from-[#232323] to-[#181818] border border-[#f2f862]/30 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#f2f862]/60 focus:border-[#f2f862]/80 cursor-pointer shadow-sm appearance-none"
              style={{ WebkitAppearance: "none", MozAppearance: "none" }}
            >
              {clubOptions.map((club) => (
                <option key={club} value={club} className="bg-black text-white">
                  {club}
                </option>
              ))}
            </select>
          </div>
        )}
        <span className="text-sm text-gray-400 ml-auto">
          {totalEvents} event{totalEvents !== 1 ? "s" : ""} found
        </span>
      </div>
      <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-white">Categories</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setLocalCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                  localCategory === category
                    ? "bg-[#f2f862] text-black"
                    : "bg-white/10 text-gray-300 hover:text-[#f2f862] border border-white/20"
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
        <div className="flex justify-end md:justify-start mt-4 md:mt-0">
          <button
            onClick={handleApply}
            disabled={loading}
            className="bg-[#f2f862] text-black font-bold px-8 py-2 rounded-full shadow hover:bg-[#e8e356] transition disabled:opacity-60"
          >
            {loading ? "Applying..." : "Apply Filter"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventFilters;
