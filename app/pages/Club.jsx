import React from "react";
import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";

// Club data with matching names and more clubs
const clubs = [
  {
    name: "Tech Club",
    description:
      "A community for tech enthusiasts to collaborate, learn, and build innovative projects together.",
    icon: "💻",
    badge: "Technology",
  },
  {
    name: "Cultural Society",
    description:
      "Celebrating diversity through music, dance, drama, and cultural events all year round.",
    icon: "🎭",
    badge: "Culture",
  },
  {
    name: "Sports Club",
    description:
      "Promoting fitness and teamwork through various sports and athletic competitions.",
    icon: "🏆",
    badge: "Sports",
  },
  {
    name: "Entrepreneurship Club",
    description:
      "Empowering future business leaders with workshops, competitions, and networking opportunities.",
    icon: "🚀",
    badge: "Business",
  },
  {
    name: "Music Society",
    description:
      "Uniting music lovers and performers for concerts, jam sessions, and music appreciation.",
    icon: "🎵",
    badge: "Music",
  },
  {
    name: "Art & Drama Club",
    description:
      "A creative space for artists and performers to express themselves through art and theatre.",
    icon: "🎨",
    badge: "Arts",
  },
  {
    name: "Academic Forum",
    description:
      "Fostering academic excellence with seminars, quizzes, and knowledge-sharing sessions.",
    icon: "📚",
    badge: "Academic",
  },
  {
    name: "Photography Club",
    description:
      "Capture moments and learn the art of photography with workshops and photo walks.",
    icon: "📷",
    badge: "Photography",
  },
  {
    name: "Social Service Club",
    description:
      "Making a difference through volunteering, outreach, and community service.",
    icon: "🤝",
    badge: "Social",
  },
  {
    name: "Literary Club",
    description:
      "For lovers of literature, creative writing, debates, and poetry slams.",
    icon: "📝",
    badge: "Literature",
  },
];

export default function Club() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative flex flex-col">
      <Navbar />
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-[#f2f862]/10 blur-2xl"></div>
        <div className="absolute bottom-32 right-20 w-56 h-56 rounded-full bg-[#f2f862]/10 blur-2xl"></div>
        <div className="absolute top-1/2 right-10 w-24 h-24 rounded-full bg-[#f2f862]/10 blur-2xl"></div>
      </div>
      <main className="relative z-10 flex-1 flex flex-col justify-center">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h1
            className="text-5xl md:text-6xl font-black text-white text-center mb-12 tracking-tight"
            style={{
              fontFamily:
                "'General Sans', 'Inter', 'Helvetica Neue', sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
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
              Our Clubs
            </span>
          </h1>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {clubs.map((club) => (
              <div
                key={club.name}
                className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl hover:bg-white/10 hover:border-white/20 transition group overflow-hidden flex flex-col"
              >
                {/* Subtle gradient accent bar */}
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#f2f862] to-transparent opacity-70 group-hover:opacity-100 transition"></div>
                {/* Club Icon */}
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-3">{club.icon}</span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-[#f2f862] to-[#eaff7b] text-black shadow-sm border border-[#f2f862]/40">
                    {club.badge}
                  </span>
                </div>
                <h2
                  className="text-2xl font-bold mb-2 text-white"
                  style={{ fontFamily: "'General Sans', sans-serif" }}
                >
                  {club.name}
                </h2>
                <p className="text-gray-300 mb-2">{club.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
