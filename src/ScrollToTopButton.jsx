import { useEffect, useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    visible && (
      <button
        onClick={scrollToTop}
        className="
          fixed bottom-6 right-6 z-50
          bg-gradient-to-br from-green-600 to-lime-500
          text-white p-3 rounded-full shadow-lg
          hover:scale-110 transition-all duration-300
        "
        aria-label="Scroll to top"
      >
        <ArrowUpwardIcon />
      </button>
    )
  );
};

export default ScrollToTopButton;
