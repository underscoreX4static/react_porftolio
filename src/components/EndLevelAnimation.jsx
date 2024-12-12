import React, { useState, useEffect } from "react";

const EndLevelAnimation = ({ unlocks, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(-1); // Index courant de l'élément à afficher
  const [items, setItems] = useState([]); // Liste des items à afficher

  useEffect(() => {
    // Préparer les items
    const preparedItems = [
      ...unlocks.skills.flatMap((skill) => [
        { type: "skill-title", name: skill.name },
        { type: "skill-description", description: skill.description },
      ]),
      ...unlocks.achievements.flatMap((achievement) => [
        { type: "achievement-title", name: achievement.name },
        { type: "achievement-description", description: achievement.description },
      ]),
    ];

    console.log("Prepared Items:", preparedItems); // Debugging

    setItems(preparedItems);
    setCurrentIndex(0); // Commencer l'animation
  }, [unlocks]);

  useEffect(() => {
    if (currentIndex === -1) return; // Attendre que les items soient prêts

    if (currentIndex < items.length) {
      const timer = setTimeout(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 1500); // Temps entre les révélations
      return () => clearTimeout(timer);
    } else {
      // Fin de l'animation
      const endTimer = setTimeout(() => {
        onComplete(); // Appel de la fonction de fin
      }, 2000);
      return () => clearTimeout(endTimer);
    }
  }, [currentIndex, items, onComplete]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black bg-opacity-95 z-50 text-white p-8">
      {currentIndex === -1 ? (
        <h1 className="text-4xl font-extrabold mb-8 text-center text-yellow-400 animate-bounce">
          Félicitations !
        </h1>
      ) : (
        items
          .slice(0, currentIndex + 1)
          .map((item, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg shadow-lg mb-4 transition-transform duration-500 ${
                item.type.includes("skill") ? "bg-blue-600" : "bg-yellow-500"
              }`}
            >
              {item.type.includes("title") ? (
                <h2 className="text-2xl font-semibold text-center">
                  {item.name}
                </h2>
              ) : (
                <p className="text-md text-center">{item.description}</p>
              )}
            </div>
          ))
      )}
    </div>
  );
};

export default EndLevelAnimation;