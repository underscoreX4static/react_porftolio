import React from "react";

const QuestionBar = ({
  currentQuestion,
  inputValue,
  setInputValue,
  onValidate,
}) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onValidate();
    }
  };

  return (
    <div className="flex items-center justify-between w-full">
      <div className="text-white text-lg font-bold">{currentQuestion}</div>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="p-2 rounded border text-black border-gray-300 focus:ring-2 focus:ring-blue-500"
          placeholder="Votre réponse"
        />
        <button
          onClick={onValidate}
          className="bg-blue-700 hover:bg-blue-800 text-gray font-bold px-4 py-2 rounded"
        >
          Valider
        </button>
      </div>
    </div>
  );
};

export default QuestionBar;