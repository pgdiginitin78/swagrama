import React, { useRef } from "react";

function CancelButtonModal({ onClick }) {
  const touchedRef = useRef(false);

  const handleTouchEnd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    touchedRef.current = true;
    if (onClick) onClick();
  };

  const handleClick = () => {
    if (touchedRef.current) {
      touchedRef.current = false;
      return;
    }
    if (onClick) onClick();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: "manipulation" }}
      className="absolute top-3 right-4 lg:top-3 lg:right-3 z-50
      w-[30px] h-[30px] rounded-full
      bg-gray-100 hover:bg-red-50
      border border-gray-200 hover:border-red-200
      flex items-center justify-center
      shadow-sm hover:shadow-md
      transition-all duration-200
      active:scale-90 hover:scale-110
      group"
      aria-label="Close modal"
    >
      <svg
        className="w-5 h-5 text-gray-600 group-hover:text-red-600 transition-all duration-200 group-hover:rotate-90"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );
}

export default CancelButtonModal;
