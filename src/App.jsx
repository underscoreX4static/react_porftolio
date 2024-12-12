import React, { useState, useRef } from "react";
import "./App.css";
import CalculatorComponent from "./components/CalculatorComponent";
import IframeAgency from "./components/IframeAgency";
import Sidebar from "./components/Sidebar";
import EndLevelAnimation from "./components/EndLevelAnimation";
import ScrollableProjects from "./components/ScrollableProjetcs";
import TopBar from "./components/TopBar";

import QuestionBar from "./components/QuestionBar";
const App = () => {
  const [skills, setSkills] = useState([
    { name: "Math", description: "Compétence essentielle pour résoudre des problèmes logiques et calculer efficacement.", unlocked: false },
    { name: "Logic", description: "Capacité à analyser et structurer des solutions.", unlocked: false },
    { name: "HTML", description: "Langage de balisage pour structurer le contenu d'une page web.", unlocked: false },
    { name: "CSS", description: "Langage pour styliser les pages web et gérer leur mise en forme.", unlocked: false },
  ]);

  const [achievements, setAchievements] = useState([
    { name: "Codeur amateur", description: "Bienvenue dans la famille des codeurs !", unlocked: false },
    { name: "Pro Freelance", description: "Première mission freelance réussie.", unlocked: false },
    { name: "Éthicien douteux", description: "Création d'un site pour une agence OnlyFans.", unlocked: false },
  ]);

  const [levels, setLevels] = useState([
    { id: 1, name: "Calculatrice", component: CalculatorComponent, unlocked: true, started: false, showTopBar: false, question: "18 * 5 ?", answer: "90" },
    { id: 2, name: "Agency", component: IframeAgency, unlocked: false, started: false, showTopBar: false, question: "Quel est le nom de l'agence ?", answer: "Moony" },
  ]);

  const [showEndLevelAnimation, setShowEndLevelAnimation] = useState(false);
  const [currentUnlocks, setCurrentUnlocks] = useState({ skills: [], achievements: [] });
  const [currentLevel, setCurrentLevel] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const projectRefs = useRef([]);

  const unlockSkill = (skillName) => {
    setSkills((prev) =>
      prev.map((skill) =>
        skill.name === skillName ? { ...skill, unlocked: true } : skill
      )
    );
  };

  const unlockAchievement = (name) => {
    setAchievements((prev) =>
      prev.map((ach) => (ach.name === name ? { ...ach, unlocked: true } : ach))
    );
  };

  const handleValidation = () => {
    const current = levels.find((level) => level.id === currentLevel);

    if (current.answer.toLowerCase() === inputValue.trim().toLowerCase()) {
      const updatedLevels = levels.map((level) =>
        level.id === currentLevel + 1
          ? { ...level, unlocked: true }
          : level.id === currentLevel
          ? { ...level, showTopBar: false }
          : level
      );
      setLevels(updatedLevels);

      const unlockedSkillsForLevel = skills.filter((skill) =>
        (currentLevel === 1 && ["Math", "Logic"].includes(skill.name)) ||
        (currentLevel === 2 && ["HTML", "CSS"].includes(skill.name))
      );

      unlockedSkillsForLevel.forEach((skill) => unlockSkill(skill.name));

      const unlockedAchievementsForLevel = achievements.filter((achievement) =>
        (currentLevel === 1 && achievement.name === "Codeur amateur") ||
        (currentLevel === 2 && achievement.name === "Pro Freelance")
      );

      unlockedAchievementsForLevel.forEach((achievement) =>
        unlockAchievement(achievement.name)
      );

      setCurrentUnlocks({
        skills: unlockedSkillsForLevel,
        achievements: unlockedAchievementsForLevel,
      });

      setShowEndLevelAnimation(true);
      setIsFocused(false);
      setInputValue("");
    } else {
      alert("Mauvaise réponse, essaye encore !");
    }
  };

  const handleStartProject = (id) => {
    const updatedLevels = levels.map((level) =>
      level.id === id ? { ...level, started: true, showTopBar: true } : level
    );
    setLevels(updatedLevels);
    setIsFocused(true);
  };


  return (
    <div className="relative min-h-screen flex bg-gray-900 text-white">
      {/* Animation de fin de niveau */}
      {showEndLevelAnimation && (
        <EndLevelAnimation
          unlocks={currentUnlocks}
          onComplete={() => {
            setShowEndLevelAnimation(false);
            setCurrentLevel((prev) => prev + 1);
          }}
        />
      )}
  
      {/* Sidebar fixe */}
      <Sidebar skills={skills} achievements={achievements} />
  
      {/* Conteneur principal */}
      <div className="flex-1 flex flex-col" style={{ marginLeft: "15%" }}>
        {/* Utilisation du composant TopBar */}
        <TopBar
          isFocused={isFocused}
          currentQuestion={levels[currentLevel - 1]?.question}
          inputValue={inputValue}
          setInputValue={setInputValue}
          onValidate={handleValidation}
          skills={skills}
          achievements={achievements}
        />
  
        {/* Conteneur scrollable des projets */}
        <div
          className="scrollable-projects-container"
          style={{
            marginTop: "6rem", // Laisse de la place pour la TopBar
            overflowY: "auto",
            height: "calc(100vh - 6rem)", // Hauteur restante sous la TopBar
          }}
        >
          <ScrollableProjects
            levels={levels}
            projectRefs={projectRefs}
            isFocused={isFocused}
            currentLevel={currentLevel}
            handleStartProject={handleStartProject}
          />
        </div>
      </div>
    </div>
  );
};

export default App;