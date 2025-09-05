"use client"
import React, { useEffect, useState } from "react";
import { useLoading } from "../contexts/LoadingContext";

const TopLoadingBar: React.FC = () => {
  const { loading } = useLoading();
  const [progress, setProgress] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (loading) {
      setVisible(true);
      setProgress(0);
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev < 90) return prev + Math.random() * 10;
          return prev;
        });
      }, 100);
    } else {
      setProgress(100);
      timer = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 400);
    }
    return () => clearInterval(timer);
  }, [loading]);

  return visible ? (
    <div className="fixed top-0 left-0 w-full z-[9999] pointer-events-none">
      <div
        className="h-1 bg-[#f2f862] shadow-lg transition-all duration-200"
        style={{ width: `${progress}%`, transition: "width 0.2s linear" }}
      />
    </div>
  ) : null;
};

export default TopLoadingBar;
