"use client"
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "../components/Home/Navbar";
import EventCard from "../components/Events/EventCard";
import EventFilters from "../components/Events/EventFilters";
import Footer from "../components/Home/Footer";
import eventsData from "../data/eventsData";

const categories = [
  "All",
  "Technology",
  "Cultural",
  "Sports",
  "Business",
  "Academic",
];

const statusOptions = ["All", "Upcoming", "Past"];
const locationOptions = [
  "All",
  ...Array.from(new Set(eventsData.map((e) => e.location))),
];
const clubOptions = [
  "All",
  ...Array.from(new Set(eventsData.map((e) => e.organizer))),
];

export default function EventsPage() {
  const [filteredEvents, setFilteredEvents] = useState(eventsData);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("date");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedClub, setSelectedClub] = useState("All");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const router = useRouter();

  // Only apply filters when user clicks "Apply Filter"
  const applyFilters = (filters) => {
    setLoading(true);
    setTimeout(() => {
      setSelectedCategory(filters.category);
      setSortBy(filters.sortBy);
      setSelectedStatus(filters.status);
      setSelectedLocation(filters.location);
      setSelectedClub(filters.club);
      setSearchTerm(""); // Clear search term when filters are applied
      setSearchActive(false);
      setLoading(false);
    }, 700); // fake loader duration
  };

  useEffect(() => {

  useEffect(() => {
    let filtered = eventsData;
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (event) => event.category === selectedCategory
      );
    }
    if (selectedStatus !== "All") {
      filtered = filtered.filter(
        (event) =>
          (selectedStatus === "Upcoming" && event.status === "upcoming") ||
          (selectedStatus === "Past" && event.status === "past")
      );
    }
    if (selectedLocation !== "All") {
      filtered = filtered.filter(
        (event) => event.location === selectedLocation
      );
    }
    if (selectedClub !== "All") {
      filtered = filtered.filter((event) => event.organizer === selectedClub);
    }
    // Only filter by searchTerm if searchActive is true
    if (searchActive && searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Sort: Upcoming first (latest date first), then past (latest date first)
    filtered = [
      ...filtered
        .filter((e) => e.status !== "past")
        .sort((a, b) => new Date(b.date) - new Date(a.date)),
      ...filtered
        .filter((e) => e.status === "past")
        .sort((a, b) => new Date(b.date) - new Date(a.date)),
    ];

    setFilteredEvents(filtered);
  }, [
    selectedCategory,
    sortBy,
    selectedStatus,
    selectedLocation,
    selectedClub,
    searchTerm,
    searchActive,
  ]);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-0 w-full">
        <EventFilters
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          totalEvents={filteredEvents.length}
          statusOptions={statusOptions}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          locationOptions={locationOptions}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          clubOptions={clubOptions}
          selectedClub={selectedClub}
          setSelectedClub={setSelectedClub}
          onApply={applyFilters}
          loading={loading}
        />
      </div>
      <div className="max-w-7xl mx-auto px-6 pb-10 w-full flex-1">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
          // ↑ Changed mt-0 to mt-6 for more space between filter and cards
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <EventCard
                event={event}
                onViewDetails={() => {
                  // Implement view details navigation here
                  // Example: navigate(`/events/${event.id}`);
                  alert("View Details coming soon!");
                }}
                onRegister={() => {
                  router.push("/register-event");
                }}
              />
            </motion.div>
          ))}
        </motion.div>
        {filteredEvents.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">
              No Events Found
            </h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Try adjusting your filters to find the events you're looking for.
            </p>
          </motion.div>
        )}
      </div>
      <Footer />
    </div>
  );
}