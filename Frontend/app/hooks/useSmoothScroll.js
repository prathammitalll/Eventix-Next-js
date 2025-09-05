import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const useSmoothScroll = () => {
  const lenisRef = useRef();

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
      direction: 'vertical', // vertical, horizontal
      gestureDirection: 'vertical', // vertical, horizontal, both
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Get scroll value
    lenis.on('scroll', () => {
      // Update ScrollTrigger
      ScrollTrigger.update();
    });

    // Use requestAnimationFrame to continuously update Lenis
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Integrate with GSAP ScrollTrigger
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      scrollLeft() {
        console.warn('Horizontal scrolling is not supported');
        return 0;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    // Refresh ScrollTrigger when Lenis updates
    ScrollTrigger.addEventListener('refresh', () => lenis.resize());
    ScrollTrigger.refresh();

    // Cleanup function
    return () => {
      lenis.destroy();
      ScrollTrigger.removeEventListener('refresh', () => lenis.resize());
    };
  }, []);

  // Return methods to control scrolling
  return {
    scrollTo: (target, options = {}) => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, options);
      }
    },
    stop: () => {
      if (lenisRef.current) {
        lenisRef.current.stop();
      }
    },
    start: () => {
      if (lenisRef.current) {
        lenisRef.current.start();
      }
    },
  };
};
