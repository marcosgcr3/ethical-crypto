"use client";

import React from "react";

interface ScrollButtonProps {
  targetId: string;
  children: React.ReactNode;
  className?: string;
}

const ScrollButton: React.FC<ScrollButtonProps> = ({ targetId, children, className }) => {
  const handleScroll = () => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      
      // Update hash in URL WITHOUT jumping (optional but good for UX)
      window.history.pushState(null, "", `#${targetId}`);
    }
  };

  return (
    <button onClick={handleScroll} className={className}>
      {children}
    </button>
  );
};

export default ScrollButton;
