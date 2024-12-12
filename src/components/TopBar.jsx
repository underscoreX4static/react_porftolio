import React from "react";
import ProgressBar from "./ProgressBar";
import QuestionBar from "./QuestionBar";

const TopBar = ({
  isFocused,
  currentQuestion,
  inputValue,
  setInputValue,
  onValidate,
  skills,
  achievements,
}) => {
  return (
    <div
      className="top-bar-container"
      style={{
        position: "fixed",
        top: 0,
        left: "15%",
        width: "calc(100% - 15%)",
        height: "6rem",
        backgroundColor: "#1e3a8a",
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 1rem",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
      }}
    >
      {isFocused ? (
        <QuestionBar
          currentQuestion={currentQuestion}
          inputValue={inputValue}
          setInputValue={setInputValue}
          onValidate={onValidate}
        />
      ) : (
        <ProgressBar skills={skills} achievements={achievements} />
      )}
    </div>
  );
};

export default TopBar;