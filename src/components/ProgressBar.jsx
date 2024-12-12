import React from "react";

const ProgressBar = ({ skills, achievements }) => {
  const totalItems = skills.length + achievements.length;
  const unlockedItems = [...skills, ...achievements].filter((item) => item.unlocked).length;
  const progressPercentage = (unlockedItems / totalItems) * 100;

  return (

<div
      className="fixed top-10 left-1/4 p-6 rounded-xl shadow-lg flex flex-col items-center space-y-4"
      style={{
        zIndex: 1000,
        border: "3px solid white",
        width: "50%",
        animation: "fadeIn 0.5s ease-out",
        backgroundColor: "#307ED8", // Couleur bleue identique à la TopBar
      }}
    >
      <h1 className="text-white font-bold text-lg">Progression</h1>
      <div className="w-full bg-gray-700 h-4 rounded-full overflow-hidden">
        <div
          className="bg-blue-500 h-full"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <p className="text-white text-sm">
        {unlockedItems} / {totalItems} débloqués ({Math.round(progressPercentage)}%)
      </p>
    </div>

  );
};

export default ProgressBar;