const AnswerInput = ({ inputValue, setInputValue, onValidate }) => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        onValidate(); // Appelle la fonction de validation
      }
    };
  
    return (
      <>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown} // Ajout de l'événement onKeyDown
          className="flex-1 p-2 rounded border border-gray-300 text-black"
          placeholder="Entrez votre réponse ici"
          style={{
            minWidth: "70%",
          }}
        />
        <button
          onClick={onValidate}
          className="bg-blue-700 text-white px-4 py-2 rounded"
        >
          Valider
        </button>
      </>
    );
  };
  
  export default AnswerInput;