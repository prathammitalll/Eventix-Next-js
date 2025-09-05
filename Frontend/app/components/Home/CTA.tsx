"use client"
import React from "react";
import { motion } from "framer-motion";
import LightRays from "./LightRays";

import { useRouter } from "next/navigation";

const CTA: React.FC = () => {
  const router = useRouter();

  return (
    <section className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Simple Light Rays Background */}
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <LightRays
          raysOrigin="top-center"
          raysColor="#f2f862"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="opacity-70"
        />
      </div>

      {/* Minimal Content - Positioned Lower with more space from lighting */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center flex flex-col justify-end h-full pb-16 pt-32">
        {/* Main Heading - Positioned Lower */}
        <motion.div
          className="mb-6"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-4"
            style={{
              fontFamily:
                "'General Sans', 'Inter', 'Helvetica Neue', sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            READY FOR{" "}
            <span
              className="relative inline-block"
              style={{
                background:
                  "linear-gradient(135deg, #f2f862 0%, #f2f862 50%, #f2f862 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              EVENTIX 360
            </span>
            ?
          </h2>

          {/* One-liner subtitle */}
          <motion.p
            className="text-lg sm:text-xl text-gray-300 font-light"
            style={{
              fontFamily: "'Inter', 'Helvetica Neue', 'Arial', sans-serif",
            }}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Discover events, connect with communities, create memories.
          </motion.p>
        </motion.div>

        {/* Call to Action Button */}
        <motion.div
          className="flex justify-center"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <button
            className="bg-white text-black px-10 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            onClick={() => router.push("/events")}
          >
            Get Started Today
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
