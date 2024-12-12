import React, { useEffect, useRef } from "react";

const Calculator = () => {
    const containerRef = useRef(null);
    const shadowRootRef = useRef(null);

    useEffect(() => {
        // Vérifie si le Shadow Root existe déjà
        if (!shadowRootRef.current) {
            shadowRootRef.current = containerRef.current.attachShadow({ mode: "open" });

            // Charger les styles dynamiquement
            const style = document.createElement("link");
            style.rel = "stylesheet";
            style.href = "/projects/Calculator/style.css";
            script.src = "/projects/Calculator/app.js";     
            shadowRootRef.current.appendChild(style);

            // Crée un conteneur pour la calculatrice
            const calculatorContainer = document.createElement("div");
            calculatorContainer.id = "calculator-root";
            shadowRootRef.current.appendChild(calculatorContainer);

            // Charger le script JavaScript dynamiquement
            const script = document.createElement("script");
            script.src = "/Users/drice/Desktop/PORTFOLIO/portfolio/public/projects/Calculator/app.js"; // Chemin relatif au dossier public
            script.async = true;
            shadowRootRef.current.appendChild(script);
        }

        // Nettoyage lorsque le composant est démonté
        return () => {
            if (shadowRootRef.current) {
                shadowRootRef.current.innerHTML = ""; // Supprime tout contenu ajouté
                shadowRootRef.current = null;
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="calculator-container"
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        />
    );
};

export default Calculator;