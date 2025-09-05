"use client"
import React, { useState, MouseEvent } from "react";
import { motion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

const socialIconVariants: Variants = {
  hover: {
    scale: 1.2,
    rotate: 360,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10,
    },
  },
};

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const router = useRouter();

  // Function to handle navigation to homepage
  const goToHomepage = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    router.push("/");
  };

  // Function to handle smooth scroll to top
  const scrollToTop = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubscribed(true);
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail("");
    }, 3000);
  };

  return (
    <motion.footer
      className="text-white relative overflow-hidden pt-20 pb-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{ backgroundColor: "#000000" }}
    >
      {/* Clean black background */}
      <div className="absolute inset-0 bg-black" />

      {/* Subtle geometric patterns */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 border border-white/20 rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 border border-white/15 rounded-full"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.2, 0.1, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          {/* Logo and Company Info */}
          <motion.div
            className="md:col-span-5 space-y-6"
            variants={itemVariants}
          >
            <motion.div
              className="flex items-center mb-8 cursor-pointer"
              onClick={goToHomepage}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.h3
                className="text-4xl font-black text-white tracking-tight"
                style={{
                  fontFamily:
                    "'General Sans', 'Inter', 'Helvetica Neue', sans-serif",
                  letterSpacing: "-0.02em",
                }}
              >
                EVENTIX{" "}
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
                  360
                </span>
              </motion.h3>
            </motion.div>
            <p
              className="text-gray-400 text-xl leading-relaxed mb-8 max-w-lg"
              style={{
                fontFamily: "'Inter', 'Helvetica Neue', 'Arial', sans-serif",
              }}
            >
              The ultimate platform connecting university students with campus
              events and communities.
            </p>
            <div className="flex space-x-6 pt-2">
              {/* X (Twitter) */}
              <motion.a
                href="#"
                className="bg-white/10 hover:bg-[#f2f862]/20 p-4 rounded-full border border-white/20 hover:border-[#f2f862]/40 text-white hover:text-white transition-all duration-500"
                variants={socialIconVariants}
                whileHover="hover"
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </motion.a>

              {/* Instagram */}
              <motion.a
                href="#"
                className="bg-white/10 hover:bg-[#f2f862]/20 p-4 rounded-full border border-white/20 hover:border-[#f2f862]/40 text-white hover:text-white transition-all duration-500"
                variants={socialIconVariants}
                whileHover="hover"
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </motion.a>

              {/* LinkedIn */}
              <motion.a
                href="#"
                className="bg-white/10 hover:bg-[#f2f862]/20 p-4 rounded-full border border-white/20 hover:border-[#f2f862]/40 text-white hover:text-white transition-all duration-500"
                variants={socialIconVariants}
                whileHover="hover"
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </motion.a>

              {/* GitHub */}
              <motion.a
                href="#"
                className="bg-white/10 hover:bg-[#f2f862]/20 p-4 rounded-full border border-white/20 hover:border-[#f2f862]/40 text-white hover:text-white transition-all duration-500"
                variants={socialIconVariants}
                whileHover="hover"
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </motion.a>
            </div>
          </motion.div>

          {/* Subscribe Section */}
          <motion.div className="md:col-span-7" variants={itemVariants}>
            <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-8">
              <h4 className="text-2xl font-semibold text-white mb-4 font-[family-name:General_Sans]">
                Stay Connected
              </h4>
              <p
                className="text-gray-300 mb-6 text-lg"
                style={{
                  fontFamily: "'Inter', 'Helvetica Neue', 'Arial', sans-serif",
                }}
              >
                Get the latest updates about campus events and opportunities
                directly in your inbox.
              </p>

              <form onSubmit={handleSubscribe} className="space-y-5">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-grow px-6 py-4 bg-white/5 border-2 border-[#f2f862]/50 rounded-full text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#f2f862]/70 focus:border-[#f2f862] transition-all backdrop-blur-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <motion.button
                    whileHover={!isSubscribed ? { scale: 1.05 } : {}}
                    whileTap={!isSubscribed ? { scale: 0.95 } : {}}
                    type="submit"
                    disabled={isSubscribed}
                    className={`px-8 py-4 rounded-full font-semibold transition-all duration-500 whitespace-nowrap ${
                      isSubscribed
                        ? "bg-[#f2f862] text-black cursor-default"
                        : "bg-white text-black hover:bg-white/90"
                    }`}
                    animate={
                      isSubscribed
                        ? {
                            scale: [1, 1.05, 1],
                            boxShadow: [
                              "0 0 0 0 rgba(242, 248, 98, 0)",
                              "0 0 0 10px rgba(242, 248, 98, 0.2)",
                              "0 0 0 0 rgba(242, 248, 98, 0)",
                            ],
                          }
                        : {}
                    }
                    transition={{ duration: 0.6 }}
                  >
                    {isSubscribed ? (
                      <motion.span
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Subscribed
                      </motion.span>
                    ) : (
                      "Subscribe Now"
                    )}
                  </motion.button>
                </div>

                <p
                  className="text-xs text-gray-400"
                  style={{
                    fontFamily:
                      "'Inter', 'Helvetica Neue', 'Arial', sans-serif",
                  }}
                >
                  By subscribing, you agree to our privacy policy. You can
                  unsubscribe at any time.
                </p>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-white/20 pt-8"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.div
              className="text-gray-400 text-sm"
              style={{
                fontFamily: "'Inter', 'Helvetica Neue', 'Arial', sans-serif",
              }}
              whileHover={{ scale: 1.02 }}
            >
              © 2024 Eventix 360. All rights reserved.
            </motion.div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <motion.a
                href="/privacy-policy"
                className="text-gray-400 hover:text-white transition text-sm"
                style={{
                  fontFamily: "'Inter', 'Helvetica Neue', 'Arial', sans-serif",
                }}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                Privacy Policy
              </motion.a>
              <motion.a
                href="/terms-of-service"
                className="text-gray-400 hover:text-white transition text-sm"
                style={{
                  fontFamily: "'Inter', 'Helvetica Neue', 'Arial', sans-serif",
                }}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                Terms of Service
              </motion.a>
              <motion.a
                href="/cookie-policy"
                className="text-gray-400 hover:text-white transition text-sm"
                style={{
                  fontFamily: "'Inter', 'Helvetica Neue', 'Arial', sans-serif",
                }}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                Cookie Policy
              </motion.a>
              <motion.a
                href="/contact"
                className="text-gray-400 hover:text-white transition text-sm"
                style={{
                  fontFamily: "'Inter', 'Helvetica Neue', 'Arial', sans-serif",
                }}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                Contact
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Back to top button */}
        <motion.a
          href="#"
          onClick={scrollToTop}
          className="absolute right-6 bottom-8 bg-white text-black p-3 rounded-full shadow-lg"
          whileHover={{
            y: -3,
            boxShadow: "0 10px 25px rgba(255, 255, 255, 0.3)",
          }}
          whileTap={{ y: 0 }}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 15l7-7 7 7"
            ></path>
          </svg>
        </motion.a>
      </div>
    </motion.footer>
  );
};

export default Footer;
