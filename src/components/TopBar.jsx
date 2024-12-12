import React from "react";
import Question from "./Question";
import AnswerInput from "./AnswerInput";

const TopBar = ({ currentQuestion, inputValue, setInputValue, onValidate }) => {
  return (
    <div
      className="sticky top-0 left-[15%] w-full bg-blue-600 p-4 z-50 flex justify-between items-center"
    >
      {/* Question */}
      <div className="text-white font-bold text-lg">
        <Question currentQuestion={currentQuestion} />
      </div>

      {/* Input et bouton */}
      <div className="flex space-x-4">
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