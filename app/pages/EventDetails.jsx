import React from "react";
"use client"
import { useRouter, useParams } from "next/navigation";
import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";
import eventsData from "../data/eventsData";

export default function EventDetails() {
  const { id } = useParams();
  const router = useRouter();
  const event = eventsData.find((e) => String(e.id) === String(id));

  if (!event) {
    return (
      <div className="min-h-screen bg-black flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Event Not Found</h2>
            <button
              className="mt-4 px-6 py-2 bg-[#f2f862] text-black rounded-full font-semibold"
                              onClick={() => router.push("/events")}
            >
              Back to Events
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navbar />
      {/* Elongated event image at the top */}
      <div className="w-full max-w-7xl mx-auto px-0 pt-8">
        <div className="w-full h-56 md:h-72 lg:h-80 xl:h-[340px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex items-center justify-center bg-black">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover object-center"
            style={{ maxHeight: "100%", maxWidth: "100%" }}
          />
        </div>
      </div>
      {/* Details and Register section below */}
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-10 flex-1">
        {/* Left: Event Details */}
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 mt-2">
            {event.title}
          </h1>
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="bg-[#f2f862] text-black px-3 py-1 rounded-full font-semibold text-sm">
              {event.category}
            </span>
            <span className="bg-white/10 px-3 py-1 rounded-full text-white text-sm">
              {event.date} {event.time}
            </span>
            <span className="bg-white/10 px-3 py-1 rounded-full text-white text-sm">
              {event.location}
            </span>
            <span className="bg-white/10 px-3 py-1 rounded-full text-white text-sm">
              {event.organizer}
            </span>
            <span className="bg-white/10 px-3 py-1 rounded-full text-white text-sm">
              {event.price}
            </span>
          </div>
          <p className="text-gray-300 text-lg mb-6">{event.description}</p>
          <div className="flex items-center gap-6 text-gray-400 text-sm mb-2">
            <span>
              <b className="text-white">{event.attendees}</b> Registered
            </span>
            <span>
              <b className="text-white">{event.maxAttendees}</b> Max Spots
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {event.tags.map((tag) => (
              <span
                key={tag}
                className="bg-white/10 text-[#f2f862] px-3 py-1 rounded-full text-xs font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
        {/* Right: Register Banner */}
        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="sticky top-28 bg-gradient-to-br from-[#f2f862]/80 to-[#eaff7b]/90 border border-[#f2f862]/30 rounded-2xl shadow-2xl p-8 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-black mb-4 text-center">
              Ready to Join?
            </h2>
            <p className="text-black text-center mb-6">
              Secure your spot for <b>{event.title}</b> now!
            </p>
            <button
              className="w-full bg-black text-[#f2f862] font-bold px-8 py-3 rounded-full shadow hover:bg-[#f2f862] hover:text-black transition text-lg"
              onClick={() =>
                router.push("/register-event")
              }
            >
              Register for Event
            </button>
            <div className="mt-8 text-center text-black/70 text-xs">
              <span>
                {event.attendees} registered • {event.maxAttendees} spots
              </span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
