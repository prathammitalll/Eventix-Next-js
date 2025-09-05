"use client"
import React, { useState, useEffect } from "react";
import Loaders from "../components/Home/Loader";
import Navbar from "../components/Home/Navbar";
import Hero from "../components/Home/Hero";
import Clubs from "../components/Home/Clubs";
import About from "../components/Home/About";
import PastEvents from "../components/Home/PastEvents";
import CTA from "../components/Home/CTA";
import Footer from "../components/Home/Footer";
import "aos/dist/aos.css";

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loaders />
      ) : (
        /* Content */
        <div className="relative z-10">
          <Navbar />
          <Hero />
          <About />
          <Clubs />
          <PastEvents />
          <CTA />
          <Footer />
        </div>
      )}
    </>
  );
};

export default HomePage;
