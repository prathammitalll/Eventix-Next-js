"use client"
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "../components/Home/Navbar";
import EventCard from "../components/Events/EventCard";
import EventFilters from "../components/Events/EventFilters";
import Footer from "../components/Home/Footer";
import eventsData from "../data/eventsData";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  category: string;
  location: string;
  organizer: string;
  price: string;
  description: string;
  attendees: number;
  maxAttendees: number;
  image: string;
  tags: string[];
  status: 'upcoming' | 'past';
}

interface FilterOptions {
  category: string;
  sortBy: string;
  status: string;
  location: string;
  club: string;
}

// Define Filters type (same as FilterOptions)
type Filters = {
  category: string;
  sortBy: string;
  status?: string;
  location: string;
  club: string;
};

const categories: string[] = [
  "All",
  "Technology",
  "Cultural",
  "Sports",
  "Business",
  "Academic",
];

const statusOptions: string[] = ["All", "Upcoming", "Past"];
const locationOptions: string[] = [
  "All",
  ...Array.from(new Set(eventsData.map((e) => e.location))),
];
const clubOptions: string[] = [
  "All",
  ...Array.from(new Set(eventsData.map((e) => e.organizer))),
];

const EventsPage: React.FC = () => {
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(eventsData.map(e => ({
    ...e,
    id: String(e.id), // Convert number to string to match Event interface
    status: e.status as 'upcoming' | 'past'
  })));
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("date");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [selectedLocation, setSelectedLocation] = useState<string>("All");
  const [selectedClub, setSelectedClub] = useState<string>("All");
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const router = useRouter();

  // Only apply filters when user clicks "Apply Filter"
  const applyFilters = (filters: Filters): void => {
    setLoading(true);
    setTimeout(() => {
      setSelectedCategory(filters.category);
      setSortBy(filters.sortBy);
      setSelectedStatus(filters.status ?? "All");
      setSelectedLocation(filters.location);
      setSelectedClub(filters.club);
      setSearchTerm(""); // Clear search term when filters are applied
      setSearchActive(false);
      setLoading(false);
    }, 700); // fake loader duration
  };

  useEffect(() => {
    let filtered = eventsData.map(e => ({
      ...e,
      id: String(e.id),
      status: e.status as 'upcoming' | 'past'
    }));

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
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
      ...filtered
        .filter((e) => e.status === "past")
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
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
              <EventCard event={event} />
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

export default EventsPage;
