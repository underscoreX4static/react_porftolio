import React, { useEffect, useRef } from "react";

const ShadowSecond = () => {
  const containerRef = useRef(null);
  const shadowRootRef = useRef(null);

  useEffect(() => {
    if (!shadowRootRef.current) {
      shadowRootRef.current = containerRef.current.attachShadow({ mode: "open" });
  
      // Charger le style dynamiquement
      const styleLink = document.createElement("link");
      styleLink.rel = "stylesheet";
      styleLink.href = "/projects/Calculator/test.css"; // Chemin vers le fichier CSS
      shadowRootRef.current.appendChild(styleLink);
  
      // Ajouter du contenu HTML dans le Shadow DOM
      const content = document.createElement("div");
      content.innerHTML = `
        <div class="div1">
          <h1>Test JS: Compteur</h1>
          <p id="counter">Count: 0</p>
          <button id="increment-btn">Increment</button>
        </div>
      `;
      shadowRootRef.current.appendChild(content);
  
      // Charger dynamiquement le script JS
      const script = document.createElement("script");
      script.src = "/projects/Calculator/test.js"; // Chemin vers le fichier JS
      script.async = true;
  
      // Passer le Shadow Root comme contexte au script
      //Permet d'eviter l'erreur :  Shadow root cannot be created on a host which already hosts a shadow tree.
      script.onload = () => {
        if (window.initializeCounter) {
          window.initializeCounter(shadowRootRef.current);
        }
      };
  
      shadowRootRef.current.appendChild(script);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        overflow: "auto", // Permet de scroller dans le Shadow DOM
        boxSizing: "border-box",
      }}
    />
  );
};

export default ShadowSecond;