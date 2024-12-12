import React from "react";

const ProgressBar = ({ skills, achievements }) => {
  const totalItems = skills.length + achievements.length;
  const unlockedItems = [...skills, ...achievements].filter((item) => item.unlocked).length;
  const progressPercentage = (unlockedItems / totalItems) * 100;

  return (
    <div className="flex items-center justify-between w-full">
      <h1 className="text-white font-bold text-lg">Progression</h1>
      <div className="w-3/4 bg-gray-300 h-4 rounded-full overflow-hidden">
        <div
          className="bg-blue-700 h-full"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <span className="text-white text-sm">
        {Math.round(progressPercentage)}%
      </span>
    </div>
  );
};

export default ProgressBar;