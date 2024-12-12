import React from "react";

const StartButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 px-8 py-4 text-lg rounded-lg font-bold text-white z-30 opacity-100 shadow-lg hover:bg-blue-600 transition-all duration-200"
    >
      Commencer
    </button>
  );
};

export default StartButton;