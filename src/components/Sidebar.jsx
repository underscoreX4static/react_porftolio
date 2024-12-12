import React from "react";

const Sidebar = ({ skills, achievements }) => {
  return (
    <div
      className="fixed top-0 bg-gray-800 p-4 flex flex-col items-center z-50"
      style={{ width: "15%", minHeight: "100vh" }}
    >
      {/* Avatar */}
      <div className="w-20 h-20 bg-gray-700 rounded-full mb-4 flex items-center justify-center">
        <span className="text-sm text-gray-300">Avatar</span>
      </div>

      {/* Liste des compétences débloquées */}
      <h2 className="text-lg font-bold mb-2">Compétences</h2>
      <ul className="space-y-2 text-center">
        {skills
          .filter((skill) => skill.unlocked) // Afficher uniquement les compétences débloquées
          .map((skill, index) => (
            <li
              key={index}
              className="p-2 rounded bg-green-600 text-white relative group"
            >
              {skill.name}
              {/* Tooltip visible au survol */}
              <div
                className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 p-2 bg-black text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50"
                style={{ width: "200px", whiteSpace: "normal" }}
              >
                {skill.description}
              </div>
            </li>
          ))}
      </ul>

      {/* Liste des trophées débloqués */}
      <h2 className="text-lg font-bold mt-6 mb-2">Trophées</h2>
      <ul className="space-y-2 text-center">
        {achievements
          .filter((achievement) => achievement.unlocked) // Afficher uniquement les trophées débloqués
          .map((achievement, index) => (
            <li
              key={index}
              className="p-2 rounded bg-yellow-500 text-black relative group"
            >
              {achievement.name}
              {/* Tooltip visible au survol */}
              <div
                className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 p-2 bg-black text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50"
                style={{ width: "200px", whiteSpace: "normal" }}
              >
                {achievement.description}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Sidebar;