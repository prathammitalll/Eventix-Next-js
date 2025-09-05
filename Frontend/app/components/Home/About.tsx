"use client"
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const paragraphRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const paragraph = paragraphRef.current;

    if (!section || !heading || !paragraph) return;

    const bulletPoints = section.querySelectorAll<HTMLParagraphElement>(".bullet-text");

    // Function to split text into characters with proper spacing
    const splitTextIntoChars = (element: HTMLElement): HTMLSpanElement[] => {
      const text = element.textContent || "";
      const characters = text.split("");

      element.innerHTML = "";
      return characters.map((char) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.className = char === " " ? "inline-block w-[0.25em]" : "inline-block"; // Proper space width
        span.style.opacity = "0.3";
        span.style.color = "#6b7280";
        element.appendChild(span);
        return span;
      });
    };

    // Split all text elements into characters
    const paragraphChars = splitTextIntoChars(paragraph);
    const bulletChars = Array.from(bulletPoints).map((bullet) =>
      splitTextIntoChars(bullet)
    );
    const allChars = [...paragraphChars, ...bulletChars.flat()];

    // Initial state - heading at full opacity, text faded
    gsap.set(heading, {
      opacity: 1,
    });

    // Create scroll trigger for progressive highlighting
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=400%", // Extended even more for smoother animation
      pin: true,
      pinSpacing: true,
      scrub: 0.5, // Much smoother scrub value
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const progress = self.progress;

        // Only start highlighting after a small delay (5% of scroll)
        if (progress > 0.05) {
          // Adjust progress to start from 0 after the delay
          const adjustedProgress = (progress - 0.05) / 0.95;

          // Highlight characters progressively with smoother calculation
          const totalChars = allChars.length;
          const rawProgress = adjustedProgress * totalChars;
          const charsToHighlight = Math.floor(rawProgress);
          const partialProgress = rawProgress - charsToHighlight;

          allChars.forEach((span, index) => {
            if (index < charsToHighlight) {
              // Fully highlighted characters
              span.style.opacity = "1";
              span.style.color = "#ffffff";
              span.style.transform = "translateY(0px)";
              span.style.transition = "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
            } else if (index === charsToHighlight) {
              // Currently highlighting character with partial progress
              const currentOpacity = 0.3 + 0.7 * partialProgress;
              const grayValue = Math.floor(107 + 148 * partialProgress); // Smooth color transition
              span.style.opacity = currentOpacity.toString();
              span.style.color = `rgb(${grayValue}, ${grayValue}, ${grayValue})`;
              span.style.transform = `translateY(${
                (1 - partialProgress) * 2
              }px)`;
              span.style.transition = "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
            } else {
              // Faded characters
              span.style.opacity = "0.3";
              span.style.color = "#6b7280";
              span.style.transform = "translateY(2px)";
              span.style.transition = "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
            }
          });
        }
      },
    });

    // Cleanup function
    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section
      id="about-section"
      ref={sectionRef}
      className="w-full h-screen bg-black flex items-center justify-start relative overflow-hidden"
      style={{ backgroundColor: "#000000" }}
    >
      <div
        ref={containerRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="max-w-7xl">
          {/* Main Heading - Fixed on left, smaller size */}
          <h2
            ref={headingRef}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-8 leading-tight tracking-tight text-left"
            style={{
              fontFamily:
                "'General Sans', 'Inter', 'Helvetica Neue', sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            <span className="text-white">WHAT IS EVENTIX </span>
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
            <span className="text-white">?</span>
          </h2>

          {/* Paragraph - Progressive highlighting */}
          <div
            ref={paragraphRef}
            className="w-full max-w-none text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed font-light text-left text-gray-400 mb-8"
            style={{
              fontFamily: "'Inter', 'Helvetica Neue', 'Arial', sans-serif",
            }}
          >
            The ultimate platform connecting university students with campus
            events and communities. Eventix 360 revolutionizes student
            engagement through seamless event discovery.
          </div>

          {/* Bullet Points */}
          <div
            className="space-y-4 text-gray-400 w-full max-w-none"
            style={{
              fontFamily: "'Inter', 'Helvetica Neue', 'Arial', sans-serif",
            }}
          >
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-[#f2f862] rounded-full mt-3 flex-shrink-0"></div>
              <p className="bullet-text text-lg sm:text-xl leading-relaxed">
                Discover hackathons, cultural festivals, and networking events
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-[#f2f862] rounded-full mt-3 flex-shrink-0"></div>
              <p className="bullet-text text-lg sm:text-xl leading-relaxed">
                Connect with study groups and campus communities
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-[#f2f862] rounded-full mt-3 flex-shrink-0"></div>
              <p className="bullet-text text-lg sm:text-xl leading-relaxed">
                Never miss opportunities tailored to your interests
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
