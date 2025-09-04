"use client"
import React from "react";
// import Loaders from "../components/Home/Loader";
import Navbar from "../components/Home/Navbar";
import Hero from "../components/Home/Hero";
import Clubs from "../components/Home/Clubs";
import About from "../components/Home/About";
import PastEvents from "../components/Home/PastEvents";
import CTA from "../components/Home/CTA";
import Footer from "../components/Home/Footer";
import AOS from "aos";
import "aos/dist/aos.css";

const HomePage = () => {
  return (
    <>
        {/* Content */}
        <div className="relative z-10">
          <Navbar />
          <Hero />
          <About />
          <Clubs />
          <PastEvents />
          <CTA />
          <Footer />
        </div>
    </>
  );
};

export default HomePage;
