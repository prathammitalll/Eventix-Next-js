"use client"
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

// Images 11-15 (Academic & Social) - use from public folder
const bgImages: string[] = [
  "/images/11.jpg",
  "/images/12.jpg",
  "/images/13.jpg",
  "/images/14.jpg",
  "/images/15.jpg",
];

const Hero: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [bgIndex, setBgIndex] = useState<number>(0);
  const router = useRouter();

  // Responsive check
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="hero-section"
      className="relative w-full h-screen bg-black overflow-hidden flex flex-col"
    >
      {/* Background slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence>
          <motion.img
            key={bgIndex}
            src={bgImages[bgIndex]}
            alt=""
            className="w-full h-full object-cover absolute inset-0"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{
              filter:
                // Increased brightness, reduced blur, slightly less grayscale
                "brightness(0.75) grayscale(0.08) blur(0.5px) saturate(1.1)",
              transition: "filter 0.5s",
            }}
            draggable={false}
          />
        </AnimatePresence>
        {/* Overlay for better text contrast */}
        <div
          className="absolute inset-0"
          style={{
            // Reduced overlay opacity for more visible background
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.7) 100%)",
          }}
        />
      </div>

      {/* Content Section */}
      <div
        className="relative z-10 flex-1 flex flex-col items-center justify-center px-6"
        style={{
          // Shift content down
          marginTop: isMobile ? "80px" : "120px",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <motion.div
            className="mb-8"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            <h1
              className={`font-black tracking-tight text-white leading-none ${
                isMobile
                  ? "text-5xl sm:text-6xl"
                  : "text-7xl lg:text-8xl xl:text-9xl"
              }`}
              style={{
                fontFamily:
                  '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                fontWeight: "900",
                letterSpacing: "-0.02em",
              }}
            >
              EVENTIX{" "}
              <span
                className="relative inline-block"
                style={{
                  background:
                    "linear-gradient(135deg, #f2f862 0%, #f2f862 50%, #f2f862 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 3px rgba(242, 248, 98, 0.3))",
                }}
              >
                360
                {/* Subtle animated underline with bright yellow-green gradient */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 rounded-full"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(242, 248, 98, 0.6), rgba(242, 248, 98, 0.8), rgba(242, 248, 98, 0.6))",
                  }}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: 2,
                    delay: 1,
                    ease: "easeInOut",
                  }}
                />
                {/* Very subtle glow effect with new color */}
                <motion.div
                  className="absolute inset-0 rounded-md pointer-events-none"
                  style={{
                    background: "rgba(242, 248, 98, 0.05)",
                    filter: "blur(4px)",
                  }}
                  animate={{
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className={`text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed ${
              isMobile ? "text-lg" : "text-xl lg:text-2xl"
            }`}
            style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: "400",
              lineHeight: "1.6",
            }}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Your all-in-one platform for{" "}
            <span className="text-white font-medium">tech events</span>,{" "}
            <span className="text-white font-medium">sports competitions</span>,{" "}
            <span className="text-white font-medium">cultural festivals</span>,
            and <span className="text-white font-medium">much more</span>.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            className="flex justify-center items-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            <motion.button
              onClick={() => {
                router.push("/events");
              }}
              className={`group relative overflow-hidden bg-white text-black font-bold rounded-full transition-all duration-300 hover:bg-gray-100 border-2 border-white cursor-pointer ${
                isMobile ? "px-12 py-4 text-base" : "px-16 py-5 text-lg"
              }`}
              style={{
                fontFamily: '"Inter", sans-serif',
                fontWeight: "700",
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 60px rgba(255, 255, 255, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Your Journey
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </motion.svg>
              </span>
              {/* Simple shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200/40 to-transparent skew-x-12 opacity-0 group-hover:opacity-100 rounded-full"
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                }}
              />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
