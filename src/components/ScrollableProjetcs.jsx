import React from "react";
import StartButton from "./StartButton";

const ScrollableProjects = ({
  levels,
  projectRefs,
  isFocused,
  currentLevel,
  handleStartProject,
}) => {
  return (
    <div
      className="flex-1 p-8 space-y-8 overflow-y-auto"
      style={{
        maxHeight: "calc(100vh - 6rem)", // Garde la place pour la TopBar
      }}
    >
      {levels.map((level, index) => (
        <div
          key={level.id}
          ref={(el) => (projectRefs.current[index] = el)}
          className={`relative w-full rounded-lg shadow-lg overflow-y-hidden ${
            !level.unlocked ? "opacity-30" : ""
          }`}
          style={{
            display: isFocused && currentLevel !== level.id ? "none" : "block",
          }}
        >
          <div className="p-2 bg-gray-800 text-white text-center rounded-t-md z-10">
            <h2 className="text-xl font-semibold">{level.name}</h2>
          </div>

          <div
            className={`relative w-full h-[75vh] transition-opacity duration-300 ${
              level.unlocked && !level.started ? "opacity-30" : "opacity-100"
            }`}
          >
            <level.component />
          </div>

          {level.unlocked && !level.started && (
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <StartButton onClick={() => handleStartProject(level.id)} />
            </div>
          )}

          {!level.unlocked && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black bg-opacity-80">
              <p className="text-white text-lg">Projet Verrouillé</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ScrollableProjects;