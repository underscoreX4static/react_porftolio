import React, { useEffect, useRef } from "react";

const ShadowComponent = () => {
  const containerRef = useRef(null);
  const shadowRootRef = useRef(null);

  useEffect(() => {
    // Créer le Shadow Root
    if (!shadowRootRef.current) {
      shadowRootRef.current = containerRef.current.attachShadow({ mode: "open" });

      // Charger les styles dynamiquement
      const styleLink = document.createElement("link");
      styleLink.rel = "stylesheet";
      styleLink.href = "/Users/drice/Desktop/PORTFOLIO/portfolio/src/styles.css/shadow-component.css";
      shadowRootRef.current.appendChild(styleLink);

      // Ajouter du contenu dans le Shadow DOM
      const content = document.createElement("div");
      content.innerHTML = `
        <div class="div1">
          <h1>Shadow DOM Content</h1>
          <p>Ceci est isolé du reste de l'application.</p>
        </div>
        <div class="div2">
          <h1>Shadow DOM Content</h1>
          <p>Ceci est isolé du reste de l'application.</p>
        </div>
      `;
      shadowRootRef.current.appendChild(content);
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

export default ShadowComponent;