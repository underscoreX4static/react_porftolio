import React from "react";
import Question from "./Question";
import AnswerInput from "./AnswerInput";

const TopBar = ({ currentQuestion, inputValue, setInputValue, onValidate }) => {
    return (
      <div
        className="fixed top-0 left-[15%] p-4 rounded-xl shadow-lg flex flex-col items-center space-y-4"
        style={{
          zIndex: 1000,
          border: "3px solid white",
          width: "85%", // Adapte à la largeur restante après la sidebar
          backgroundColor: "#307ED8", // Couleur bleue
        }}
      >
        {/* Question */}
        <div className="w-full text-center text-white font-bold text-lg">
          <Question currentQuestion={currentQuestion} />
        </div>
  
        {/* Input et bouton */}
        <div className="w-full flex items-center justify-between space-x-4">
          <AnswerInput
            inputValue={inputValue}
            setInputValue={setInputValue}
            onValidate={onValidate}
          />
        </div>
      </div>
    );
  };

export default TopBar;