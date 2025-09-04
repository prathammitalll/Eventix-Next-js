"use client"
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const cursorInnerRef = useRef<HTMLDivElement | null>(null);
  const isHoveringRef = useRef<boolean>(false);
  const isVisibleRef = useRef<boolean>(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorInner = cursorInnerRef.current;
    
    if (!cursor || !cursorInner) return;

    // GSAP timeline for smooth animations
    const tl = gsap.timeline({ paused: true });
    
    // Initial setup
    gsap.set(cursor, {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      opacity: 0,
      scale: 0.8
    });

    // Show animation
    tl.to(cursor, {
      opacity: 1,
      scale: 1,
      duration: 0.15,
      ease: "power2.out"
    });

    // Mouse move handler with GSAP
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Check if cursor is within viewport
      const inViewport = clientX >= 0 && clientX <= window.innerWidth && 
                        clientY >= 0 && clientY <= window.innerHeight;
      
      if (inViewport && !isVisibleRef.current) {
        isVisibleRef.current = true;
        tl.play();
      } else if (!inViewport && isVisibleRef.current) {
        isVisibleRef.current = false;
        tl.reverse();
      }
      
      // Smooth cursor movement with GSAP
      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        duration: 0.05,
        ease: "power1.out",
        overwrite: "auto"
      });
    };

    // Hover effects
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, input, textarea, select, [role="button"], [tabindex], .cursor-pointer, [data-interactive]')) {
        if (!isHoveringRef.current) {
          isHoveringRef.current = true;
          gsap.to(cursor, {
            scale: 1.3,
            duration: 0.1,
            ease: "power2.out"
          });
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, input, textarea, select, [role="button"], [tabindex], .cursor-pointer, [data-interactive]')) {
        if (isHoveringRef.current) {
          isHoveringRef.current = false;
          gsap.to(cursor, {
            scale: 1,
            duration: 0.1,
            ease: "power2.out"
          });
        }
      }
    };

    // Window events
    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      tl.reverse();
    };

    const handleMouseEnter = () => {
      if (isVisibleRef.current) {
        tl.play();
      }
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Show cursor after a short delay
    const showTimer = setTimeout(() => {
      if (isVisibleRef.current) {
        tl.play();
      }
    }, 100);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      clearTimeout(showTimer);
      
      // Kill GSAP animations
      tl.kill();
      gsap.killTweensOf(cursor);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
    >
      <div ref={cursorInnerRef} className="cursor-inner" />
    </div>
  );
};

export default CustomCursor;
