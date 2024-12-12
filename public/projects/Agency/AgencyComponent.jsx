import React, { useEffect, useRef } from "react";

const AgencyComponent = () => {
  const containerRef = useRef(null); // Référence au conteneur principal
  const shadowRootRef = useRef(null); // Référence au ShadowRoot

  useEffect(() => {
    console.log("useEffect triggered for AgencyComponent");

    if (!containerRef.current) {
      console.error("Conteneur principal introuvable !");
      return;
    }

    // Création du ShadowRoot si nécessaire
    if (!shadowRootRef.current) {
      console.log("Creating ShadowRoot for AgencyComponent...");
      shadowRootRef.current = containerRef.current.attachShadow({ mode: "open" });

      // Ajout de root-agency dans le Shadow DOM
      const rootDiv = document.createElement("div");
      rootDiv.id = "root-agency";
      shadowRootRef.current.appendChild(rootDiv);
      console.log("Div root-agency ajoutée au Shadow DOM pour AgencyComponent :", shadowRootRef.current.innerHTML);

      // Chargement du script de ton projet `Agency`
      const script = document.createElement("script");
      script.src = "/Users/drice/Desktop/PORTFOLIO/portfolio/public/projects/Agency/build/static/js/main.a5b3b26a.js"; // Remplace par le chemin correct vers le fichier JS du projet Agency
      script.async = true;

      script.onload = () => {
        console.log("Script Agency chargé. Tentative d'appel de initializeApp...");
      
        setTimeout(() => {
          const rootElement = shadowRootRef.current.querySelector("#root-agency");
          console.log("Élément root-agency pour AgencyComponent :", rootElement);
      
          if (rootElement && window.initializeApp) {
            // Passer directement le `shadowRoot` au contexte React via une propriété du conteneur
            rootElement.ownerDocument = shadowRootRef.current;
            console.log("Appel de initializeApp pour AgencyComponent avec ShadowRoot...");
            window.initializeApp(rootElement);
          } else {
            console.error("initializeApp ou root-agency toujours introuvable pour AgencyComponent après délai !");
          }
        }, 3000); // Délai de 500 ms
      };
      script.onerror = () => {
        console.error("Le script Agency n'a pas pu être chargé.");
      };

      shadowRootRef.current.appendChild(script);
    }

    // Nettoyage lors du démontage
    return () => {
      console.log("Nettoyage du ShadowRoot pour AgencyComponent...");
      if (shadowRootRef.current) {
        shadowRootRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        overflow: "auto",
        backgroundColor: "white", // Tu peux personnaliser le style ici
        boxSizing: "border-box",
      }}
    />
  );
};

export default AgencyComponent;