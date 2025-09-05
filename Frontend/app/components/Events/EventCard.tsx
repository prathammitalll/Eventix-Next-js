import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface Event {
  id: string;
  image: string;
  title: string;
  category: string;
  price: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  maxAttendees: number;
}

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const router = useRouter();

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (timeString: string): string => {
    return timeString;
  };

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case "Technology":
        return "bg-blue-500/20 text-blue-400";
      case "Cultural":
        return "bg-purple-500/20 text-purple-400";
      case "Sports":
        return "bg-orange-500/20 text-orange-400";
      case "Business":
        return "bg-green-500/20 text-green-400";
      case "Academic":
        return "bg-indigo-500/20 text-indigo-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <motion.div
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden group cursor-pointer"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      {/* Event Image */}
      <div className="relative h-40 overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Category Badge */}
        <div
          className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
            event.category
          )}`}
        >
          {event.category}
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs font-semibold">
          {event.price}
        </div>
      </div>

      {/* Event Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="text-lg font-bold text-white group-hover:text-[#f2f862] transition-colors duration-200 line-clamp-2">
          {event.title}
        </h3>

        {/* Date and Location */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <svg
              className="w-4 h-4 text-[#f2f862] flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="truncate">
              {formatDate(event.date)} • {formatTime(event.time)}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-300">
            <svg
              className="w-4 h-4 text-[#f2f862] flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        {/* Attendance */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Spots</span>
          <span className="text-white font-medium">
            {event.attendees}/{event.maxAttendees}
          </span>
        </div>

        {/* Action Button */}
        <div className="mt-6 flex">
          <button
            className="bg-black border border-[#f2f862] text-[#f2f862] font-semibold px-5 py-2 rounded-full hover:bg-[#f2f862] hover:text-black transition w-full"
            style={{ minWidth: 0 }}
            onClick={() => router.push(`/events/${event.id}`)}
          >
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
