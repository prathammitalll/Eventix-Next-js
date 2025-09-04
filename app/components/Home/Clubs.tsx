"use client"
import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRouter } from "next/navigation";

interface Club {
  name: string;
  description: string;
  members: number;
  logo: string;
  category: string;
  established: string;
}

interface ClubCardProps {
  club: Club;
  index: number;
}

const clubsData: Club[] = [
  {
    name: "CodeTech Club",
    description:
      "Programming and software development club for tech enthusiasts. Join us for coding challenges, hackathons, and collaborative projects.",
    members: 120,
    logo: "/images/sc1.png",
    category: "Technology",
    established: "2020",
  },
  {
    name: "AI Research Society",
    description:
      "Exploring cutting-edge AI and machine learning applications. Research, develop, and implement innovative AI solutions.",
    members: 85,
    logo: "/images/sc2.png",
    category: "Research",
    established: "2021",
  },
  {
    name: "Design Hub",
    description:
      "Creative design and UI/UX exploration for digital products. From concept to creation, we design the future.",
    members: 95,
    logo: "/images/sc3.png",
    category: "Design",
    established: "2019",
  },
  {
    name: "CyberSec Team",
    description:
      "Cybersecurity research and ethical hacking practice group. Protect, analyze, and secure digital infrastructures.",
    members: 60,
    logo: "/images/sc4.png",
    category: "Security",
    established: "2022",
  },
  {
    name: "Robotics Engineers",
    description:
      "Building and programming autonomous robots and systems. From concept to competition, we engineer the future.",
    members: 75,
    logo: "/images/sc5.png",
    category: "Engineering",
    established: "2020",
  },
  {
    name: "Game Dev Studio",
    description:
      "Creating innovative games and interactive experiences. Turn your imagination into playable realities.",
    members: 110,
    logo: "/images/sc6.jpg",
    category: "Gaming",
    established: "2021",
  },
];

const ClubCard: React.FC<ClubCardProps> = ({ club, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const router = useRouter();

  const y: MotionValue<number> = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const scale: MotionValue<number> = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.95, 1, 1, 0.98]
  );
  const rotate: MotionValue<number> = useTransform(scrollYProgress, [0, 0.5, 1], [-1, 0, 1]);
  const blur: MotionValue<number> = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 0, 2, 5]);

  // Calculate dynamic top position for proper stacking
  const stickyTop = 180 + index * 40; // Reduced spacing

  return (
    <motion.div
      ref={cardRef}
      style={{
        y,
        scale,
        rotate,
        filter: blur.get() ? `blur(${blur.get()}px)` : undefined,
        top: `${stickyTop}px`,
        zIndex: 30 + index, // Higher z-index for newer cards to stack on top
      }}
      className="sticky mb-16"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="bg-black border-2 border-white/20 shadow-2xl rounded-[32px] p-6 md:p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.08 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
            <div className="flex items-center space-x-4 mb-3 md:mb-0">
              <div className="w-16 h-16 rounded-xl bg-gray-800 border-2 border-gray-600 flex items-center justify-center overflow-hidden shadow-lg">
                <img
                  src={club.logo}
                  alt={club.name}
                  className="w-12 h-12 object-cover rounded-lg"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  {club.name}
                </h3>
                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-300">
                  <span className="font-medium bg-gray-800 px-2 py-1 rounded-full text-white">
                    {club.category}
                  </span>
                  <span>•</span>
                  <span>Est. {club.established}</span>
                  <span>•</span>
                  <span className="font-semibold text-white">
                    {club.members} members
                  </span>
                </div>
              </div>
            </div>

            {/* Index number with bright yellow-green accent */}
            <div className="text-right">
              <span
                className="text-4xl font-black"
                style={{
                  background:
                    "linear-gradient(135deg, #f2f862 0%, #f2f862 50%, #f2f862 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-5">
            <p className="text-gray-300 text-lg leading-relaxed">
              {club.description}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <motion.button
              onClick={() => router.push("/clubs")}
              className="flex-1 bg-[#f2f862] text-black py-3 px-6 rounded-xl font-bold transition-all duration-300 hover:bg-[#f2f862]/90 shadow-lg"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              Join Club
            </motion.button>
            <motion.button
              onClick={() => router.push("/clubs")}
              className="flex-1 bg-transparent border-2 border-white/30 text-white py-3 px-6 rounded-xl font-bold transition-all duration-300 hover:bg-white/10 shadow-lg"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Clubs: React.FC = () => {
  return (
    <section id="clubs-section" className="w-full bg-black relative pt-16">
      {/* Header Section - Smaller and higher */}
      <div className="sticky top-16 left-0 right-0 z-10 bg-black/98 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
              Chitkara University{" "}
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
                Clubs
              </span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-base">
              Discover communities that shape your passion into purpose
            </p>
          </motion.div>
        </div>
      </div>

      {/* Cards Container */}
      <div className="px-6 py-16 space-y-24">
        {clubsData.map((club, index) => (
          <ClubCard key={club.name} club={club} index={index} />
        ))}
      </div>

      {/* Bottom CTA - with extra height to ensure clean transition */}
      <div className="relative bg-black py-32 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 text-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-5xl font-bold text-white mb-8">
              Ready to Join?
            </h3>
            <p className="text-gray-400 mb-16 max-w-lg mx-auto text-xl leading-relaxed">
              Become part of Chitkara's vibrant community and start your journey
              today.
            </p>
            <motion.button
              className="bg-white text-black px-16 py-6 rounded-full text-xl font-bold border-2 border-white transition-all duration-300"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(255, 255, 255, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Explore All Clubs
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Clubs;
