import React, { useEffect, useRef } from "react";

const EmbeddedReactProject = () => {
  const containerRef = useRef(null); // Référence au conteneur principal
  const shadowRootRef = useRef(null); // Référence au ShadowRoot

  useEffect(() => {
    console.log("useEffect triggered");
  
    if (!containerRef.current) {
      console.error("Conteneur principal introuvable !");
      return;
    }
  
    if (!shadowRootRef.current) {
      console.log("Creating ShadowRoot...");
      shadowRootRef.current = containerRef.current.attachShadow({ mode: "open" });
  
      const rootDiv = document.createElement("div");
      rootDiv.id = "root-agency";
      rootDiv.innerHTML = "<h2>Contenu statique ajouté dans root-agency</h2>";
      shadowRootRef.current.appendChild(rootDiv);
      console.log("Contenu initial du Shadow DOM :", shadowRootRef.current.innerHTML);
  
      const script = document.createElement("script");
      script.src = "/Users/drice/Desktop/PORTFOLIO/portfolio/public/projects/Agency/test-script.js"; // Remplace par le chemin correct
      script.async = true;
  
      script.onload = () => {
        console.log("Script chargé. Tentative d'appel de initializeApp après délai...");
  
        setTimeout(() => {
          console.log("Contenu actuel du Shadow DOM après délai :", shadowRootRef.current.innerHTML);
  
          const rootElement = shadowRootRef.current.querySelector("#root-agency");
          console.log("Élément root-agency trouvé après délai :", rootElement);
  
          if (rootElement && window.initializeApp) {
            console.log("Appel de initializeApp avec root-agency...");
            window.initializeApp(rootElement);
          } else {
            console.error("initializeApp ou root-agency toujours introuvable après délai !");
          }
        }, 500);
      };
  
      script.onerror = () => {
        console.error("Le script n'a pas pu être chargé.");
      };
  
      shadowRootRef.current.appendChild(script);
    }
  
    // Désactivation du nettoyage automatique pour éviter la perte du ShadowRoot
    return () => {
      console.log("Nettoyage désactivé pour éviter la perte du ShadowRoot.");
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        overflow: "auto",
        backgroundColor: "lightgray",
        boxSizing: "border-box",
      }}
    />
  );
};

export default EmbeddedReactProject;