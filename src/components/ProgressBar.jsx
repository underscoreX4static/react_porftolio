import React from "react";

const ProgressBar = ({ skills, achievements }) => {
  const totalItems = skills.length + achievements.length;
  const unlockedItems = [...skills, ...achievements].filter((item) => item.unlocked).length;
  const progressPercentage = (unlockedItems / totalItems) * 100;

  return (
    <div
      className="sticky top-0 left-[15%] w-full bg-gray-800 p-4 z-50 flex flex-col items-center space-y-2"
    >
      <h1 className="text-white font-bold text-lg">Progression</h1>
      <div className="w-full bg-gray-600 h-4 rounded-full overflow-hidden">
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