import React, { useEffect, useRef } from "react";

const CalculatorComponent = () => {
  const containerRef = useRef(null);
  const shadowRootRef = useRef(null);

  useEffect(() => {
    if (!shadowRootRef.current) {
      shadowRootRef.current = containerRef.current.attachShadow({ mode: "open" });

      // Charger les styles dynamiquement
      const styleLink = document.createElement("link");
      styleLink.rel = "stylesheet";
      styleLink.href = "/projects/Calculator/style.css"; // Chemin vers votre CSS
      shadowRootRef.current.appendChild(styleLink);

      // Charger le contenu HTML dynamiquement
      const htmlContent = `


      
         <div class="bodyy">
      <div class="calculator">
          <div id="message-container"></div>
          <div class="display">
              <div class="previous-operand"></div>
              <div class="current-operand">0</div>
          </div>
          <div class="buttons">
              <button class="btn" data-type="clear" data-value="AC">AC</button>
              <button class="btn" data-type="delete" data-value="←">←</button>
              <button class="btn" id="percent" data-type="operator" data-value="%">%</button>
              <button class="btn" data-type="operator" data-value="÷">÷</button>
              <button class="btn" data-type="number" data-value="7">7</button>
              <button class="btn" data-type="number" data-value="8">8</button>
              <button class="btn" data-type="number" data-value="9">9</button>
              <button class="btn" data-type="operator" data-value="×">×</button>
              <button class="btn" data-type="number" data-value="4">4</button>
              <button class="btn" data-type="number" data-value="5">5</button>
              <button class="btn" data-type="number" data-value="6">6</button>
              <button class="btn" data-type="operator" data-value="−">−</button>
              <button class="btn" data-type="number" data-value="1">1</button>
              <button class="btn" data-type="number" data-value="2">2</button>
              <button class="btn" data-type="number" data-value="3">3</button>
              <button class="btn" data-type="operator" data-value="+">+</button>
              <button class="btn" data-type="special" data-value="🖩">🖩</button>
              <button class="btn" data-type="number" data-value="0">0</button>
              <button class="btn" data-type="number" data-value=".">.</button>
              <button class="btn" data-type="equals" data-value="=">=</button>
          </div>
      </div>
            </div>
  `;
  
  // Injecter le contenu dans le ShadowRoot
  const contentContainer = document.createElement("div");
  contentContainer.innerHTML = htmlContent;
  shadowRootRef.current.appendChild(contentContainer);

// Charger le script JS dynamiquement
const script = document.createElement("script");
script.src = "/projects/Calculator/app.js"; // Chemin vers votre JS
script.async = true;

script.onload = () => {
    if (window.initializeCalculator) {
        window.initializeCalculator(shadowRootRef.current);
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

export default CalculatorComponent;