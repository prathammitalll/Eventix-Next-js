"use client"
import React, { useRef } from "react";
import Image from "next/image";

interface Event {
  id: number;
  title: string;
  date: string;
  day: string;
  month: string;
  image: string;
  category: 'Technology' | 'Cultural' | 'Business' | 'Arts' | 'Sports' | 'Academic';
  attendees: string;
}

type CategoryColors = {
  [key in Event['category']]: string;
};

const PastEvents: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);

  // Sample event data - you can replace with real data
  const events: Event[] = [
    {
      id: 1,
      title: "Tech Innovation Summit",
      date: "2024-03-15",
      day: "Friday",
      month: "March",
      image: "/images/sc1.png",
      category: "Technology",
      attendees: "500+",
    },
    {
      id: 2,
      title: "Spring Cultural Festival",
      date: "2024-02-28",
      day: "Wednesday",
      month: "February",
      image: "/images/sc2.png",
      category: "Cultural",
      attendees: "800+",
    },
    {
      id: 3,
      title: "Startup Pitch Competition",
      date: "2024-01-20",
      day: "Saturday",
      month: "January",
      image: "/images/sc3.png",
      category: "Business",
      attendees: "300+",
    },
    {
      id: 4,
      title: "Music & Arts Showcase",
      date: "2023-12-10",
      day: "Sunday",
      month: "December",
      image: "/images/sc4.png",
      category: "Arts",
      attendees: "650+",
    },
    {
      id: 5,
      title: "Winter Sports Gala",
      date: "2023-11-25",
      day: "Saturday",
      month: "November",
      image: "/images/sc5.png",
      category: "Sports",
      attendees: "400+",
    },
    {
      id: 6,
      title: "Academic Excellence Awards",
      date: "2023-10-15",
      day: "Sunday",
      month: "October",
      image: "/images/sc6.jpg",
      category: "Academic",
      attendees: "200+",
    },
  ];

  const categoryColors: CategoryColors = {
    Technology: "from-[#f2f862] to-[#f2f862]",
    Cultural: "from-[#f2f862] to-[#f2f862]",
    Business: "from-[#f2f862] to-[#f2f862]",
    Arts: "from-[#f2f862] to-[#f2f862]",
    Sports: "from-[#f2f862] to-[#f2f862]",
    Academic: "from-[#f2f862] to-[#f2f862]",
  };

  const getCategoryColor = (category: Event['category']): string => {
    return categoryColors[category] || "from-[#f2f862] to-[#f2f862]";
  };

  return (
    <section
      id="past-events-section"
      ref={sectionRef}
      className="relative py-20 overflow-hidden bg-black"
    >
      {/* Background Elements - Subtle White Tones */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-element absolute top-20 left-10 w-20 h-20 rounded-full bg-white/5 blur-xl"></div>
        <div className="floating-element absolute bottom-40 right-20 w-32 h-32 rounded-full bg-white/3 blur-xl"></div>
        <div className="floating-element absolute top-1/2 right-10 w-16 h-16 rounded-full bg-white/4 blur-xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-5xl md:text-6xl font-black text-white mb-6"
            style={{
              fontFamily:
                "'General Sans', 'Inter', 'Helvetica Neue', sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            Past{" "}
            <span
              className="inline-block"
              style={{
                background:
                  "linear-gradient(135deg, #f2f862 0%, #f2f862 50%, #f2f862 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Events
            </span>
          </h2>
          <p
            className="text-gray-400 text-lg max-w-2xl mx-auto"
            style={{
              fontFamily: "'Inter', 'Helvetica Neue', 'Arial', sans-serif",
            }}
          >
            Relive the moments that made our community stronger. From tech
            summits to cultural celebrations, every event tells a story of
            connection and growth.
          </p>
        </div>

        {/* Events Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-[#f2f862] opacity-30 h-full rounded-full"></div>

          {/* Events Grid */}
          <div className="space-y-24">
            {events.map((event, index) => (
              <div
                key={event.id}
                className={`event-card flex items-center ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Content Side */}
                <div
                  className={`w-5/12 ${
                    index % 2 === 0 ? "pr-16 text-right" : "pl-16 text-left"
                  }`}
                >
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/8 hover:border-white/20 transition">
                    {/* Date Circle */}
                    <div
                      className={`inline-flex items-center justify-center mb-4 ${
                        index % 2 === 0 ? "ml-auto" : "mr-auto"
                      }`}
                    >
                      <div
                        className={`bg-gradient-to-r ${getCategoryColor(
                          event.category
                        )} p-3 rounded-full`}
                      >
                        <div className="bg-black p-3 rounded-full">
                          <div className="text-center">
                            <div className="text-white font-bold text-lg">
                              {event.date.split("-")[2]}
                            </div>
                            <div className="text-gray-300 text-xs uppercase tracking-wide">
                              {event.month}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <h3
                      className="text-white text-xl font-bold mb-2"
                      style={{ fontFamily: "'General Sans', sans-serif" }}
                    >
                      {event.title}
                    </h3>

                    <div className="flex items-center gap-4 mb-3 justify-end">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getCategoryColor(
                          event.category
                        )} text-white`}
                      >
                        {event.category}
                      </span>
                      <span className="text-gray-400 text-sm">{event.day}</span>
                    </div>

                    <div className="flex items-center justify-end text-gray-300 text-sm">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                      </svg>
                      {event.attendees} attendees
                    </div>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="w-2/12 flex justify-center">
                  <div
                    className={`w-6 h-6 rounded-full bg-gradient-to-r ${getCategoryColor(
                      event.category
                    )} z-10 relative`}
                  >
                    <div className="absolute inset-1 bg-black rounded-full"></div>
                    <div
                      className={`absolute inset-2 bg-gradient-to-r ${getCategoryColor(
                        event.category
                      )} rounded-full`}
                    ></div>
                  </div>
                </div>

                {/* Image Side */}
                <div
                  className={`w-5/12 ${index % 2 === 0 ? "pl-16" : "pr-16"}`}
                >
                  <div className="relative group cursor-pointer">
                    <div className="relative overflow-hidden rounded-xl">
                      <div className="relative w-full h-64">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300"></div>

                      {/* Overlay Content - Clean White Design */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-5 shadow-2xl border border-white/20">
                          <svg
                            className="w-6 h-6 text-black"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Clean White Decorative Border */}
                    <div className="absolute -inset-1 bg-white/20 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-sm"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-32">
          <button
            className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
            style={{ fontFamily: "'General Sans', sans-serif" }}
          >
            View All Past Events
          </button>
        </div>
      </div>
    </section>
  );
};

export default PastEvents;
