"use client"; // This is necessary because we're using React hooks and browser APIs

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa"; // You can use any icon library like react-icons

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show the button when the user scrolls down 300px
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to the top of the page with smooth animation
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 lg:bottom-8 lg:right-8">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="p-3 bg-purple-600 bg-opacity-50 hover:text-white border hover:border-white border-black text-black rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 ease-in-out"
        >
          <FaArrowUp size={20} />
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;