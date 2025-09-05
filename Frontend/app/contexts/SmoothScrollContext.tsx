"use client"
import React, { createContext, ReactNode } from "react";
import { useSmoothScroll } from "../hooks/useSmoothScroll";

interface ScrollOptions {
  offset?: number;
  duration?: number;
  easing?: (t: number) => number;
}

interface SmoothScrollContextType {
  scrollTo: (target: HTMLElement | string | number, options?: ScrollOptions) => void;
  stop: () => void;
  start: () => void;
}

interface SmoothScrollProviderProps {
  children: ReactNode;
}

const SmoothScrollContext = createContext<SmoothScrollContextType | undefined>(undefined);

export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({ children }) => {
  const smoothScroll = useSmoothScroll();

  return (
    <SmoothScrollContext.Provider value={smoothScroll}>
      {children}
    </SmoothScrollContext.Provider>
  );
};

// Export the context itself for use in hooks
export { SmoothScrollContext };
